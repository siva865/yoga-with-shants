import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function YogaVacations() {
  return (
    <section
      id="yoga-vacations"
      className="bg-[#26382F] px-5 py-24 text-[#F4EFE7] sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#F4EFE7]/50">
              Yoga Vacations
            </p>

            <h2 className="max-w-3xl font-serif text-5xl font-light leading-[1.05] sm:text-6xl lg:text-8xl">
              Travel deeper.
              <br />
              <span className="italic">Breathe slower.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="max-w-lg text-base leading-8 text-[#F4EFE7]/65">
              Step away from everyday life and join an immersive yoga
              experience surrounded by beautiful places, mindful movement and
              good company.
            </p>

            <button className="mt-8 flex items-center gap-3 rounded-full border border-[#F4EFE7]/30 px-7 py-3.5 text-sm transition-all duration-300 hover:bg-[#F4EFE7] hover:text-[#26382F]">
              Explore Vacations
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 overflow-hidden rounded-[2rem]"
        >
          <img
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=2200&q=90"
            alt="Yoga vacation"
            className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[520px]"
          />
        </motion.div>
      </div>
    </section>
  );
}