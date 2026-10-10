import { useCart } from "./CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineShoppingBag } from "react-icons/md";

import creamy from "../assets/Images/creamy-peanut-butter.jpeg";
import crunchy from "../assets/Images/crunchy-peanut-butter.jpeg";
import creamyCocoa from "../assets/Images/creamy-dark-cocoa.jpeg";
import crunchyCocoa from "../assets/Images/crunchy-dark-cocoa.jpeg";
import unsweetenedCreamy from "../assets/Images/unsweeted-creamy.jpeg";
import unsweetenedCrunchy from "../assets/Images/unsweetened-crunchy.jpeg";
import unsweetenedCocoaCreamy from "../assets/Images/unsweetened-cocoa-creamy.jpeg";
import unsweetenedCocoaCrunchy from "../assets/Images/unsweetened-cocoa-crunchy.jpeg";


const products = [
  {
    name: "Creamy Peanut Butter",
    price: 549,
    image: creamy,
    category: "CLASSIC COLLECTION",
  },
  {
    name: "Crunchy Peanut Butter",
    price: 549,
    image: crunchy,
    category: "CLASSIC COLLECTION",
  },
  {
    name: "Creamy Dark Cocoa Peanut Butter",
    price: 749,
    image: creamyCocoa,
    category: "DARK COCOA COLLECTION",
  },
  {
    name: "Crunchy Dark Cocoa Peanut Butter",
    price: 749,
    image: crunchyCocoa,
    category: "DARK COCOA COLLECTION",
  },
  {
    name: "Unsweetened Creamy Peanut Butter",
    price: 549,
    image: unsweetenedCreamy,
    category: "UNSWEETENED COLLECTION",
  },
  {
    name: "Unsweetened Crunchy Peanut Butter",
    price: 549,
    image: unsweetenedCrunchy,
    category: "UNSWEETENED COLLECTION",
  },
  {
    name: "Unsweetened Dark Cocoa Creamy Peanut Butter",
    price: 749,
    image: unsweetenedCocoaCreamy,
    category: "UNSWEETENED COCOA",
  },
  {
    name: "Unsweetened Dark Cocoa Crunchy Peanut Butter",
    price: 749,
    image: unsweetenedCocoaCrunchy,
    category: "UNSWEETENED COCOA",
  },
];

export default function NutButters() {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProducts((prev) =>
      prev.includes(product.name) ? prev : [...prev, product.name]
    );

    setTimeout(() => {
      setAddedProducts((prev) =>
        prev.filter((name) => name !== product.name)
      );
    }, 1500);
  };

  return (
    <section
      id="nut-butters"
      className="scroll-mt-28 bg-[#F4EFE7] px-5 py-20 text-[#26382F] sm:px-8 sm:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#9A754A]" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#806344]">
                Made with care
              </p>
            </div>

            <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
              A little nutty
              <span className="italic text-[#9A754A]">
                , a lot lovely
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#26382F]/70 sm:text-base">
              Discover your favourite peanut butter, from smooth and creamy
              to rich dark cocoa. Simple ingredients, delicious moments.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#26382F]/60">
            <span className="h-2 w-2 rounded-full bg-[#9A754A]" />
            <span>{products.length} delicious varieties</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            const isAdded = addedProducts.includes(product.name);

            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 4) * 0.08,
                }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[1.4rem] bg-[#E7DED1]">
                  <div className="aspect-[4/4.6] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-[#F9F6F0]/90 px-3 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-[#26382F] backdrop-blur-md sm:text-[10px]">
                    {product.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                    className={`absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                      isAdded
                        ? "bg-[#26382F] text-white"
                        : "bg-[#F9F6F0] text-[#26382F] hover:bg-[#26382F] hover:text-white"
                    }`}
                  >
                    {isAdded ? (
                      <FaCheckCircle size={19} />
                    ) : (
                      <MdOutlineShoppingBag size={21} />
                    )}
                  </button>
                </div>

                <div className="px-1 pt-4">
                  <div className="flex min-h-[58px] items-start justify-between gap-3">
                    <h3 className="max-w-[240px] text-base font-medium leading-6 transition-colors duration-300 group-hover:text-[#9A754A] sm:text-[17px]">
                      {product.name}
                    </h3>

                    <GoArrowUpRight
                      size={17}
                      className="mt-1 shrink-0 text-[#26382F]/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#9A754A]"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#26382F]/10 pt-3">
                    <div>
                      <p className="text-lg font-semibold tracking-tight">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      <p className="mt-1 text-xs text-[#26382F]/55">
                        400 g
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-300 ${
                        isAdded
                          ? "bg-[#DCD7CA] text-[#26382F]"
                          : "bg-[#26382F] text-white hover:bg-[#9A754A]"
                      }`}
                    >
                      {isAdded ? "Added ✓" : "Add to cart"}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 border-t border-[#26382F]/15 pt-6">
          <p className="text-center text-xs leading-6 tracking-wide text-[#26382F]/60 sm:text-sm">
            Made for your everyday rituals — one delicious spoon at a time
          </p>
        </div>
      </div>
    </section>
  );
}

