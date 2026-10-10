import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useCart } from "./CartContext";

export default function SundayLunches() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const sundayLunch = {
    name: "BingeAsana Sunday Lunch",
    price: 0,
    category: "Sunday Lunches",
  };

  const handleAddToCart = () => {
    addToCart(sundayLunch);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <section
      id="sunday-lunches"
      className="scroll-mt-28 bg-[#E7DED1] px-5 py-20 text-[#26382F] sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.25em]">
          Gather around the table
        </p>

        <h2 className="text-4xl font-semibold sm:text-5xl">
          Sunday Lunches
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#26382F]/75">
          Make Sundays special with BingeAsana. Our Sunday lunch menu and
          details will be shared here.
        </p>

        <button
          onClick={handleAddToCart}
          className="mx-auto mt-8 flex items-center justify-center gap-3 rounded-full bg-[#26382F] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#3b5145]"
        >
          {added ? (
            <>
              <FaCheckCircle />
              Added to Cart
            </>
          ) : (
            <>
              <MdOutlineShoppingBag size={20} />
              View Lunch Options
            </>
          )}
        </button>
      </div>
    </section>
  );
}
