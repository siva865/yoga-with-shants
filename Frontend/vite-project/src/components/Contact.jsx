
import { motion } from "framer-motion";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

const whatsappNumber = "YOUR_WHATSAPP_NUMBER";
const emailAddress = "YOUR_EMAIL_ADDRESS";

const enquiryMessage =
  "Hi Shants, I came across your website and would love to know more about your yoga classes and offerings. I have a few questions and would appreciate some information. Thank you!";

const emailSubject = "Enquiry - Yoga With Shants";

const emailMessage = `Hi Shants,

I came across your website and would love to know more about your yoga classes and offerings.

I have a few questions and would appreciate some information.

Thank you!`;

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiryMessage)}`;

const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailMessage)}`;

const contactOptions = [
  {
    name: "WhatsApp",
    description: "Quick questions and enquiries",
    icon:IoSend,
    href: whatsappLink,
    external: true,
  },
  {
    name: "Email",
    description: "For detailed enquiries",
    icon: IoMail,
    href: emailLink,
    external: false,
  },
  {
    name: "Instagram",
    description: "Connect and follow along",
    icon: FaInstagramSquare,
    href: "https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/",
    external: true,
  },
  {
    name: "Facebook",
    description: "Follow updates and events",
    icon: FaFacebookSquare,
    href: "https://www.facebook.com/YOUR_FACEBOOK_PAGE",
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#F4EFE7] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-[#26382F]/60">
              Get in touch
            </p>

            <h2 className="max-w-2xl font-serif text-5xl font-light leading-[1.05] tracking-tight text-[#26382F] sm:text-6xl lg:text-8xl">
              Have a question?
              <br />
              <span className="italic">Let's talk.</span>
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#26382F]/65 sm:text-lg">
              Curious about yoga classes, private sessions or upcoming
              retreats? Reach out through your preferred channel.
              Shants would love to hear from you.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#26382F] px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#354B40]"
            >
              <LuMessageCircle size={18} />
              Ask a Question
              <FaArrowUpRightFromSquare size={17} />
            </a>
          </motion.div>

          {/* Contact Options */}
          <div className="self-center border-t border-[#26382F]/15">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;

              return (
                <motion.a
                  key={option.name}
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noreferrer" : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group flex items-center justify-between gap-4 border-b border-[#26382F]/15 py-6 transition-colors duration-300 hover:bg-[#E7DED1]/60 sm:py-7"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#26382F]/15 text-[#26382F] transition-all duration-300 group-hover:bg-[#26382F] group-hover:text-white">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-light text-[#26382F] sm:text-3xl">
                        {option.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#26382F]/55">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <FaArrowUpRightFromSquare
                    size={20}
                    className="shrink-0 text-[#26382F]/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 overflow-hidden rounded-[2rem] bg-[#E7DED1] px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#26382F]/55">
                Your practice starts here
              </p>

              <h3 className="font-serif text-3xl font-light text-[#26382F] sm:text-5xl">
                Take a moment for yourself.
              </h3>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-[#26382F] px-7 py-4 text-sm text-white transition-all duration-300 hover:bg-[#354B40]"
            >
              Let's Connect
              <IoSend size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}