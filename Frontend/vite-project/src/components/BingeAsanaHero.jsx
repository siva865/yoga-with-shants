import Hero from "../assets/Images/hero.jpg";
import PhoneHero from "../assets/Image/Mobile-hero.jpeg";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function BingeAsanaHero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="bingeasana"
      className="relative isolate flex min-h-[90svh] items-end overflow-hidden bg-[#26382F] px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:min-h-screen lg:px-12 lg:pb-20"
    >
      {/* Desktop, Laptop & Tablet Image */}
      <div className="absolute inset-0 -z-20 hidden sm:block">
        <img
          src={Hero}
          alt="BingeAsana homemade nut butters and artisan cakes"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Mobile Image */}
      <div className="absolute inset-0 -z-20 sm:hidden">
        <img
          src={PhoneHero}
          alt="BingeAsana homemade nut butters and artisan cakes"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Image Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1E2C23]/85 via-[#26382F]/45 to-[#26382F]/10" />

      <div className="mx-auto w-full max-w-[1400px]">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-[#F4EFE7]/80 sm:text-sm"
          >
            Homemade with love · BingeAsana
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl font-light leading-[0.98] tracking-[-0.035em] text-[#F4EFE7] sm:text-7xl md:text-8xl lg:text-[112px]"
          >
            Good food.
            <br />
            <span className="italic">Made with care.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8"
          >
            From creamy nut butters and natural Coorg honey to
            lovingly made cakes, discover homemade goodness created
            to be shared and savoured.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            {/* Order Now → Nut Butters */}
            <button
              type="button"
              onClick={() => scrollTo("nut-butters")}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#F4EFE7] px-7 py-4 text-sm font-medium text-[#26382F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Order Now
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Sunday Lunches */}
            <button
              type="button"
              onClick={() => scrollTo("sunday-lunches")}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/50 bg-white/10 px-7 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#26382F]"
            >
              Sunday Lunches
            </button>
          </motion.div>
        </div>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => scrollTo("nut-butters")}
          aria-label="Scroll to Nut Butters"
          className="mt-14 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 hover:bg-white hover:text-[#26382F]"
        >
          <ArrowDown size={19} strokeWidth={1.5} />
        </motion.button>
      </div>
    </section>
  );
}