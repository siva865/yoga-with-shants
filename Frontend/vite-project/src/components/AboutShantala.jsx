import { motion } from "framer-motion";

export default function AboutShantala() {
  return (
    <section
      id="about"
      className="bg-[#F4EFE7] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#26382F]/60">
            About Shantala
          </p>

          <h2 className="max-w-xl font-serif text-5xl font-light leading-[1.05] tracking-tight text-[#26382F] sm:text-6xl lg:text-7xl">
            Yoga that brings you
            <span className="italic"> back to yourself.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-lg leading-8 text-[#26382F]/70">
            Yoga with Shants is a space to move, breathe and reconnect.
            Through mindful movement and meaningful experiences, Shantala
            creates a welcoming approach to yoga for every body and every
            stage of life.
          </p>

          <button className="mt-8 rounded-full border border-[#26382F]/30 px-7 py-3.5 text-sm font-medium text-[#26382F] transition-all duration-300 hover:bg-[#26382F] hover:text-white">
            Meet Shantala
          </button>
        </motion.div>
      </div>
    </section>
  );
}