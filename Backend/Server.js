
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import Razorpay from "razorpay";
import crypto from "node:crypto";

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing");
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay API keys missing in .env");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// Razorpay webhook needs the raw request body.
// Keep this route before express.json().
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-razorpay-signature"];
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

      if (!webhookSecret || !signature) {
        return res.status(400).json({ message: "Webhook configuration missing" });
      }

      const expected = crypto
        .createHmac("sha256", webhookSecret)
        .update(req.body)
        .digest("hex");

      const receivedBuffer = Buffer.from(signature);
      const expectedBuffer = Buffer.from(expected);

      if (
        receivedBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
      ) {
        return res.status(400).json({ message: "Invalid webhook signature" });
      }

      const event = JSON.parse(req.body.toString("utf8"));

      if (event.event === "payment.captured") {
        const payment = event.payload?.payment?.entity;
        const razorpayOrderId = payment?.order_id;
        const paymentId = payment?.id;

        if (razorpayOrderId && paymentId) {
          const order = await Order.findOne({ razorpayOrderId });

          if (
            order &&
            payment.amount === Math.round(order.total * 100) &&
            payment.currency === "INR"
          ) {
            order.paymentStatus = "paid";
            order.razorpayPaymentId = paymentId;
            await order.save();
          }
        }
      }

      if (event.event === "payment.failed") {
        const payment = event.payload?.payment?.entity;
        if (payment?.order_id) {
          await Order.updateOne(
            { razorpayOrderId: payment.order_id, paymentStatus: "pending" },
            { $set: { paymentStatus: "failed" } }
          );
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error.message);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  }
);

app.use(express.json({ limit: "1mb" }));

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, default: "" },
    },
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, default: "" },
    }],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["razorpay", "cod"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "payment_pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "payment_pending",
    },
    razorpayOrderId: { type: String, default: null, index: true },
    razorpayPaymentId: { type: String, default: null },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: "" },
  isAvailable: { type: Boolean, default: true },
});

const Order = mongoose.model("Order", orderSchema);
const Product = mongoose.model("Product", productSchema);

function createOrderId() {
  return "BA-" + Date.now().toString(36).toUpperCase() +
    "-" + crypto.randomBytes(3).toString("hex").toUpperCase();
}

function clean(value, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "BingeAsana API running" });
});

// Place order and create Razorpay payment order.
// Expected body:
// {
//   "customer": {
//     "name": "...", "email": "...", "phone": "...",
//     "address": "...", "city": "...", "postalCode": "..."
//   },
//   "items": [
//     { "productId": "MongoDB_PRODUCT_ID", "quantity": 2 }
//   ]
// }
app.post("/api/orders", async (req, res, next) => {
  try {
    const customer = req.body.customer || {};
    const name = clean(customer.name);
    const email = clean(customer.email, 200).toLowerCase();
    const phone = clean(customer.phone, 40);
    const address = clean(customer.address, 500);
    const city = clean(customer.city);
    const postalCode = clean(customer.postalCode, 30);
    const paymentMethod = req.body.paymentMethod || "razorpay";

    if (!name || !email || !phone || !address || !city) {
      return res.status(400).json({
        message: "Name, email, phone, address and city are required",
      });
    }

    if (!["razorpay", "cod"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const requestedItems = req.body.items;
    if (
      !Array.isArray(requestedItems) ||
      requestedItems.length === 0 ||
      requestedItems.length > 30
    ) {
      return res.status(400).json({ message: "Invalid cart items" });
    }

    const quantities = new Map();

    for (const item of requestedItems) {
      if (!mongoose.isValidObjectId(item.productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const id = String(item.productId);
      quantities.set(id, (quantities.get(id) || 0) + quantity);
    }

    const ids = [...quantities.keys()];
    const products = await Product.find({
      _id: { $in: ids },
      isAvailable: true,
    });

    if (products.length !== ids.length) {
      return res.status(400).json({
        message: "One or more products are unavailable",
      });
    }

    // Always calculate prices using database products.
    const items = products.map((product) => ({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: quantities.get(product._id.toString()),
      image: product.image,
    }));

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Set your actual delivery fee here.
    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    if (!Number.isSafeInteger(Math.round(total * 100)) || total <= 0) {
      return res.status(400).json({ message: "Invalid order total" });
    }

    const orderId = createOrderId();

    const order = await Order.create({
      orderId,
      customer: { name, email, phone, address, city, postalCode },
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      orderStatus: paymentMethod === "cod" ? "confirmed" : "payment_pending",
    });

    // Cash on delivery does not require Razorpay.
    if (paymentMethod === "cod") {
      return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order: {
          orderId: order.orderId,
          total: order.total,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
        },
      });
    }

    try {
      const rpOrder = await razorpay.orders.create({
        amount: Math.round(total * 100),
        currency: "INR",
        receipt: order.orderId,
        notes: { orderId: order.orderId },
      });

      order.razorpayOrderId = rpOrder.id;
      await order.save();

      return res.status(201).json({
        success: true,
        order: {
          orderId: order.orderId,
          total: order.total,
          currency: "INR",
          paymentMethod: "razorpay",
          razorpayOrderId: rpOrder.id,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
        },
        razorpay: {
          key: process.env.RAZORPAY_KEY_ID,
          order_id: rpOrder.id,
          amount: rpOrder.amount,
          currency: rpOrder.currency,
        },
      });
    } catch (error) {
      await Order.deleteOne({ _id: order._id });
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// Verify Razorpay signature after checkout success.
// Body: { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }
app.post("/api/payments/verify", async (req, res, next) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body || {};

    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ message: "Payment verification fields missing" });
    }

    const order = await Order.findOne({
      orderId,
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "paid") {
      return res.json({
        success: true,
        orderId: order.orderId,
        paymentStatus: order.paymentStatus,
      });
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const actualBuffer = Buffer.from(razorpay_signature);
    const expectedBuffer = Buffer.from(expected);

    if (
      actualBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      order.paymentStatus = "failed";
      await order.save();
      return res.status(400).json({ message: "Payment signature verification failed" });
    }

    // Confirm the payment with Razorpay's API, not just the browser response.
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.order_id !== razorpay_order_id ||
      payment.amount !== Math.round(order.total * 100) ||
      payment.currency !== "INR" ||
      !["authorized", "captured"].includes(payment.status)
    ) {
      return res.status(400).json({ message: "Payment details do not match order" });
    }

    // If payment is only authorized, capture it in Razorpay Dashboard/API
    // or enable automatic capture in your Razorpay account.
    if (payment.status !== "captured") {
      return res.status(409).json({
        message: "Payment is authorized but not captured yet",
        paymentStatus: payment.status,
      });
    }

    order.paymentStatus = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.orderStatus = "confirmed";
    await order.save();

    res.json({
      success: true,
      message: "Payment verified successfully",
      orderId: order.orderId,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    next(error);
  }
});

// Customer order tracking.
// GET /api/orders/track/BA-XXXX
// Require both order ID and phone number so IDs alone don't expose addresses.
app.post("/api/orders/track", async (req, res, next) => {
  try {
    const orderId = clean(req.body?.orderId, 100).toUpperCase();
    const phone = normalisePhone(req.body?.phone);

    if (!orderId || phone.length < 7) {
      return res.status(400).json({
        message: "Order ID and phone number are required",
      });
    }

    const order = await Order.findOne({ orderId });

    if (!order || normalisePhone(order.customer.phone) !== phone) {
      return res.status(404).json({
        message: "Order not found. Check your Order ID and phone number",
      });
    }

    res.json({
      success: true,
      order: {
        orderId: order.orderId,
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
        })),
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Protected operational endpoint: call only from a trusted admin tool/server.
// Do not expose this route directly to the public website.
const operationsKey = process.env.ORDERS_ADMIN_KEY;

app.patch("/api/orders/:orderId/status", async (req, res, next) => {
  try {
    if (!operationsKey || !req.headers["x-orders-admin-key"]) {
      return res.status(401).json({ message: "Operations access required" });
    }

    const supplied = Buffer.from(String(req.headers["x-orders-admin-key"]));
    const expected = Buffer.from(operationsKey);

    if (
      supplied.length !== expected.length ||
      !crypto.timingSafeEqual(supplied, expected)
    ) {
      return res.status(401).json({ message: "Invalid operations key" });
    }

    const allowedStatuses = [
      "confirmed",
      "preparing",
      "ready",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    const { status } = req.body || {};
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { orderStatus: status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({
      success: true,
      orderId: order.orderId,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    next(error);
  }
});

// Avoid leaking internal error details to customers.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);

  if (error.code === 11000) {
    return res.status(409).json({ message: "Duplicate record. Please retry" });
  }

  res.status(error.status || 500).json({
    message: error.status ? error.message : "Server error",
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });