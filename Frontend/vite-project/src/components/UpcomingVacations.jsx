import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const events = [
  {
    date: "12",
    month: "NOV",
    title: "Weekend Yoga Retreat",
    location: "Coming Soon",
  },
  {
    date: "24",
    month: "NOV",
    title: "Mindful Movement Session",
    location: "Coming Soon",
  },
  {
    date: "08",
    month: "DEC",
    title: "Yoga & Wellness Weekend",
    location: "Coming Soon",
  },
];

export default function Upcoming() {
  return (
    <section
      id="upcoming"
      className="bg-[#E7DED1] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14">
          <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#26382F]/60">
            Upcoming
          </p>

          <h2 className="font-serif text-5xl font-light text-[#26382F] sm:text-6xl lg:text-7xl">
            What&apos;s coming <span className="italic">next.</span>
          </h2>
        </div>

        <div className="border-t border-[#26382F]/15">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group grid gap-6 border-b border-[#26382F]/15 py-8 md:grid-cols-[100px_1fr_auto] md:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-4xl font-light text-[#26382F]">
                  {event.date}
                </span>
                <span className="text-xs tracking-[0.15em] text-[#26382F]/50">
                  {event.month}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-light text-[#26382F]">
                  {event.title}
                </h3>

                <p className="mt-1 text-sm text-[#26382F]/50">
                  {event.location}
                </p>
              </div>

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#26382F]/25 transition-all duration-300 group-hover:bg-[#26382F] group-hover:text-white"
              >
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}