import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import honeyImage from "../assets/Images/honey.jpeg";
import { useCart } from "./CartContext";

export default function Honey() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = {
    name: "All Natural Coorg Honey",
    price: 499,
    image: honeyImage,
    weight: "400 g",
    category: "Honey",
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <section
      id="honey"
      className="scroll-mt-28 bg-[#E7DED1] px-5 py-20 text-[#26382F] sm:px-8 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src={honeyImage}
            alt="All Natural Coorg Honey"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.25em]">
            Nature in a jar
          </p>

          <h2 className="text-4xl font-semibold sm:text-5xl">
            All Natural Coorg Honey
          </h2>

          <p className="mt-5 leading-7 text-[#26382F]/75">
            Bring the goodness of honey to your everyday table with our Coorg honey
          </p>

          <p className="mt-7 text-2xl font-semibold">₹499</p>

          <p className="mt-1 text-sm text-[#26382F]/60">400 g</p>

          <button
            onClick={handleAddToCart}
            className="mt-7 flex items-center justify-center gap-3 rounded-full bg-[#26382F] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#3b5145]"
          >
            {added ? (
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
      </div>
    </section>
  );
}

