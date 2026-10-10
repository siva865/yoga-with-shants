import { motion } from "framer-motion";

const events = [
  {
    title: "Yoga Retreat",
    location: "Retreat Experience",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Mindful Weekend",
    location: "Yoga & Wellness",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Wellness Retreat",
    location: "Movement & Connection",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function PastEvents() {
  return (
    <section
      id="past-events"
      className="bg-[#F4EFE7] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#26382F]/60">
              Past Events
            </p>

            <h2 className="font-serif text-5xl font-light text-[#26382F] sm:text-6xl lg:text-7xl">
              Moments we&apos;ve
              <span className="italic"> shared.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-[1.75rem]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-5 font-serif text-2xl font-light text-[#26382F]">
                {event.title}
              </h3>

              <p className="mt-1 text-sm text-[#26382F]/55">
                {event.location}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}