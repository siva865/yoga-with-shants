import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Ananya R",
    location: "Bangalore",
    review:
      "The date and almond cake was absolutely delicious, fresh and perfectly balanced",
  },
  {
    name: "Priya S",
    location: "Chennai",
    review:
      "Loved the natural ingredients and amazing taste. The honey is a must try",
  },
  {
    name: "Rahul M",
    location: "Coorg",
    review:
      "Beautiful flavours and wonderful quality. You can really taste the difference",
  },
  {
    name: "Meera K",
    location: "Bangalore",
    review:
      "The chocolate cake was rich, soft and perfect for our family celebration",
  },
  {
    name: "Arjun V",
    location: "Chennai",
    review:
      "Amazing homemade treats with a premium feel. Definitely ordering again",
  },
];

function ReviewCard({ review }) {
  return (
    <article className="w-[290px] shrink-0 rounded-[1.75rem] border border-[#26382F]/10 bg-white/80 p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:w-[340px]">
      <FaQuoteLeft className="mb-5 text-2xl text-[#B58A50]" />

      <div className="mb-5 flex gap-1 text-[#C4954A]">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} size={14} />
        ))}
      </div>

      <p className="min-h-[100px] text-base leading-7 text-[#26382F]/80">
        “{review.review}”
      </p>

      <div className="mt-6 border-t border-[#26382F]/10 pt-5">
        <h3 className="font-semibold">{review.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#26382F]/50">
          {review.location}
        </p>
      </div>
    </article>
  );
}

export default function Reviews() {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section
      id="binge-reviews"
      className="scroll-mt-28 overflow-hidden bg-[#F4EFE7] py-20 text-[#26382F] sm:py-24"
    >
      <div className="mx-auto mb-14 max-w-5xl px-5 text-center sm:px-8">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#8C7048]">
          From our customers
        </p>

        <h2 className="text-4xl font-semibold sm:text-5xl">
          BingeAsana Reviews
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#26382F]/65">
          Little moments, lovely flavours and memories worth sharing
        </p>

        <div className="mx-auto mt-6 h-px w-20 bg-[#B58A50]" />
      </div>

      <div className="space-y-7">
        {/* Scroll Left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 35,
                ease: "linear",
                repeat: Infinity,
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={`left-${index}`} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Scroll Right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              },
            }}
          >
            {[...duplicatedReviews].reverse().map((review, index) => (
              <ReviewCard key={`right-${index}`} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
