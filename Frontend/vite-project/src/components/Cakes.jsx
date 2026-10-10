import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useCart } from "./CartContext";

const cakes = [
  {
    name: "Classic Date and Almond Cake",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Gooey Chocolate Brownie Cake",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
    glazing: true,
  },
  {
    name: "Orange Chocolate Cake",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    glazing: true,
  },
  {
    name: "Banana Chocolate Bread with Rum and Raisin",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1606101273944-845b8f4e4c1e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Refreshing Lime Cheesecake",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Cakes() {
  const { addToCart } = useCart();
  const [addedCake, setAddedCake] = useState("");

  const handleAddToCart = (cake) => {
    addToCart({
      ...cake,
      category: "Cakes & Bakes",
    });

    setAddedCake(cake.name);

    setTimeout(() => {
      setAddedCake("");
    }, 2000);
  };

  return (
    <section
      id="cakes"
      className="scroll-mt-28 bg-[#F4EFE7] px-5 py-20 text-[#26382F] sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm uppercase tracking-[0.25em]">
          Baked with love
        </p>

        <h2 className="mb-4 text-4xl font-semibold sm:text-5xl">
          Cakes & Bakes
        </h2>

        <p className="mb-12 max-w-xl text-[#26382F]/70">
          Something special for your celebrations, gatherings and little
          cravings
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cakes.map((cake) => (
            <article
              key={cake.name}
              className="overflow-hidden rounded-3xl bg-white/70 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#E7DED1]">
                <img
                  src={cake.image}
                  alt={cake.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-medium">{cake.name}</h3>

                <p className="mt-4 text-xl font-semibold">
                  ₹{cake.price.toLocaleString("en-IN")}
                </p>

                {cake.glazing && (
                  <p className="mt-2 text-sm text-[#26382F]/70">
                    Optional chocolate glazing: +₹500
                  </p>
                )}

                <button
                  onClick={() => handleAddToCart(cake)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#26382F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b5145]"
                >
                  {addedCake === cake.name ? (
                    <>
                      <FaCheckCircle />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <MdOutlineShoppingBag size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
