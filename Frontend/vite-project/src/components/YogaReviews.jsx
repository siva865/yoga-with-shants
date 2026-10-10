import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  {
    text: "A beautiful experience that helped me slow down and reconnect with myself.",
    name: "Happy Student",
  },
  {
    text: "The sessions feel personal, calm and incredibly welcoming.",
    name: "Yoga Student",
  },
  {
    text: "More than just yoga. It is a beautiful space to pause, breathe and reset.",
    name: "Retreat Guest",
  },
];

export default function YogaReviews() {
  return (
    <section
      id="yoga-reviews"
      className="bg-[#E7DED1] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14">
          <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#26382F]/60">
            Reviews
          </p>

          <h2 className="font-serif text-5xl font-light text-[#26382F] sm:text-6xl lg:text-7xl">
            Words from the
            <span className="italic"> community.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-[1.75rem] bg-[#F4EFE7] p-7 sm:p-9"
            >
              <Quote
                size={30}
                strokeWidth={1}
                className="text-[#26382F]/40"
              />

              <p className="mt-8 font-serif text-2xl font-light leading-9 text-[#26382F]">
                “{review.text}”
              </p>

              <p className="mt-8 text-sm text-[#26382F]/55">
                — {review.name}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}