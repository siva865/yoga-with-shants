import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const classes = [
  {
    number: "01",
    title: "Group Yoga",
    text: "Move together in a welcoming and supportive space.",
  },
  {
    number: "02",
    title: "Private Sessions",
    text: "Personalised sessions designed around your individual needs.",
  },
  {
    number: "03",
    title: "Corporate Yoga",
    text: "Bring mindful movement and wellbeing into your workplace.",
  },
];

export default function YogaClasses() {
  return (
    <section
      id="yoga-classes"
      className="bg-[#F4EFE7] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#26382F]/60">
              Yoga Classes
            </p>

            <h2 className="font-serif text-5xl font-light text-[#26382F] sm:text-6xl lg:text-7xl">
              Find your
              <span className="italic"> practice.</span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-[#26382F]/60">
            Classes designed to help you build strength, flexibility,
            awareness and a deeper connection with yourself.
          </p>
        </div>

        <div className="border-t border-[#26382F]/15">
          {classes.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group grid gap-5 border-b border-[#26382F]/15 py-8 md:grid-cols-[80px_1fr_auto] md:items-center"
            >
              <span className="text-sm text-[#26382F]/40">
                {item.number}
              </span>

              <div>
                <h3 className="font-serif text-3xl font-light text-[#26382F] sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-[#26382F]/60">
                  {item.text}
                </p>
              </div>

              <button
                type="button"
                aria-label={`Learn more about ${item.title}`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#26382F]/25 text-[#26382F] transition-all duration-300 group-hover:bg-[#26382F] group-hover:text-white"
              >
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}