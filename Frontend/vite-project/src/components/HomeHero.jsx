import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function HomeHero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#F4EFE7] px-5 pb-10 pt-32 sm:px-8 lg:px-12"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2200&q=90"
          alt="Yoga practice"
          className="size-full object-cover"
        />

        {/* Warm overlays for text readability */}
        <div className="absolute inset-0 bg-[#F4EFE7]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4EFE7]/90 via-[#F4EFE7]/40 to-transparent sm:bg-gradient-to-r sm:from-[#F4EFE7]/90 sm:via-[#F4EFE7]/50 sm:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-[#F4EFE7]/60 px-4 py-2 shadow-[0_6px_24px_rgba(38,56,47,0.08)] backdrop-blur-xl"
          >
            <span className="size-2 rounded-full bg-[#26382F]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#26382F] sm:text-[13px]">
              Yoga · Travel · Good Food
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[58px] font-light leading-[0.95] tracking-[-0.03em] text-[#26382F] sm:text-7xl md:text-8xl lg:text-[110px]"
          >
            Move<span className="italic">.</span> Breathe
            <span className="italic">.</span>
            <br />
            Strengthen<span className="italic">.</span>
            <br />
            <span className="relative inline-block italic">
              Reconnect
              <svg
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2 w-full text-[#26382F]/70 sm:h-3"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 8 C 60 2, 140 12, 298 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                />
              </svg>
            </span>
            <span className="italic">.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 max-w-lg text-base font-medium leading-7 text-[#26382F]/80 sm:text-lg"
          >
            A space to slow down, reconnect with yourself and find your
            balance through yoga, travel and good food.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* Book Now */}
            <button
              type="button"
              onClick={() => scrollTo("yoga-classes")}
              className="group flex items-center justify-between gap-4 rounded-full bg-[#26382F] py-2 pl-8 pr-2 text-base font-semibold tracking-tight text-white shadow-[0_10px_30px_rgba(38,56,47,0.3)] transition-all duration-300 active:scale-95 sm:justify-start [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:bg-[#354B40] [@media(hover:hover)]:hover:shadow-[0_14px_36px_rgba(38,56,47,0.35)]"
            >
              Book Now
              <span className="flex size-11 items-center justify-center rounded-full bg-[#F4EFE7] text-[#26382F] transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-1">
                <ArrowRight size={18} strokeWidth={2} />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Scroll button */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => scrollTo("about")}
          aria-label="Scroll to About section"
          className="mt-14 flex size-14 items-center justify-center rounded-full border border-white/70 bg-[#F4EFE7]/70 text-[#26382F] shadow-[0_8px_28px_rgba(38,56,47,0.12)] backdrop-blur-xl transition-colors duration-300 active:scale-90 [@media(hover:hover)]:hover:bg-[#26382F] [@media(hover:hover)]:hover:text-white"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={20} strokeWidth={1.8} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}