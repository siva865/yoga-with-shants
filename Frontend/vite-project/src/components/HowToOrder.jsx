import { motion } from "framer-motion";
import {
  FaShoppingBasket,
  FaClipboardList,
  FaWhatsapp,
  FaTruck,
} from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

const steps = [
  {
    number: "01",
    title: "Explore Our Menu",
    description:
      "Discover our homemade cakes, natural honey, nut butters and more",
    icon: FaShoppingBasket,
  },
  {
    number: "02",
    title: "Choose Your Favourites",
    description:
      "Pick your favourite treats and add them to your shopping cart",
    icon: FaClipboardList,
  },
  {
    number: "03",
    title: "Place Your Order",
    description:
      "Contact us on WhatsApp to confirm your items and delivery details",
    icon: FaWhatsapp,
  },
  {
    number: "04",
    title: "Enjoy Every Bite",
    description:
      "We'll coordinate your order and delivery details with you",
    icon: FaTruck,
  },
];

export default function HowToOrder() {
  const whatsappNumber = ""; // Add your WhatsApp number with country code

  const whatsappMessage = encodeURIComponent(
    "Hi BingeAsana, I would like to place an order"
  );

  return (
    <section
      id="how-to-order"
      className="scroll-mt-28 overflow-hidden bg-[#26382F] px-5 py-20 text-[#F4EFE7] sm:px-8 sm:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#D7B77A]">
            A few simple steps
          </p>

          <h2 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
            Good Food
            <span className="block font-normal italic text-[#D7B77A]">
              Made Simple
            </span>
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-[#F4EFE7]/70">
            Your favourite BingeAsana treats are just a few simple steps away
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#D7B77A]/50 hover:bg-white/[0.08]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm tracking-[0.2em] text-[#D7B77A]">
                    {step.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D7B77A]/10 text-xl text-[#D7B77A] transition group-hover:bg-[#D7B77A] group-hover:text-[#26382F]">
                    <Icon />
                  </div>
                </div>

                <h3 className="text-xl font-medium">{step.title}</h3>

                <p className="mt-4 text-sm leading-7 text-[#F4EFE7]/65">
                  {step.description}
                </p>

                <div className="mt-7 h-px w-full bg-white/10">
                  <div className="h-px w-0 bg-[#D7B77A] transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-[#D7B77A]/25 bg-[#D7B77A]/10 p-7 sm:flex-row sm:items-center sm:p-9"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#D7B77A]">
              Have something in mind?
            </p>

            <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Let's make your order special
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#F4EFE7]/65">
              Get in touch with us for ordering assistance
            </p>
          </div>

          <a
            href={
              whatsappNumber
                ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
                : "https://wa.me/"
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#D7B77A] px-7 py-4 font-medium text-[#26382F] transition hover:bg-[#F4EFE7]"
          >
            <FaWhatsapp size={20} />
            Order on WhatsApp
            <GoArrowUpRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
