import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";


const whatsappNumber = "YOUR_WHATSAPP_NUMBER";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About Shantala", href: "#about" },
  { name: "Yoga Classes", href: "#yoga-classes" },
  { name: "Yoga Vacations", href: "#yoga-vacations" },
  { name: "Upcoming", href: "#upcoming" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#26382F] px-5 pb-7 pt-16 text-[#F4EFE7] sm:px-8 sm:pt-20 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Main Footer */}
        <div className="grid gap-12 border-b border-[#F4EFE7]/15 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:gap-16">
          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="Yoga With Shants home"
              className="inline-block font-serif text-5xl font-light italic"
            >
              A
            </a>

            <h2 className="mt-5 max-w-md font-serif text-3xl font-light leading-snug sm:text-4xl">
              Move with intention.
              <br />
              <span className="italic">Live with balance.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#F4EFE7]/60">
              A space for mindful movement, meaningful travel and
              reconnecting with yourself through yoga.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-[#F4EFE7]/45">
              Explore
            </h3>

            <div className="flex flex-col items-start gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#F4EFE7]/80 transition-colors duration-300 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-[#F4EFE7]/45">
              Connect
            </h3>

            <p className="mb-6 max-w-xs text-sm leading-7 text-[#F4EFE7]/60">
              Have a question about classes or retreats? Get in touch.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi Shants, I would love to know more about your yoga classes and upcoming retreats. Could you please share some details? Thank you!"
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-[#F4EFE7]/25 px-5 py-3 text-sm transition-all duration-300 hover:bg-[#F4EFE7] hover:text-[#26382F]"
            >
              Message Shants
              <FaArrowUpRightFromSquare size={16} />
            </a>

            <div className="mt-7 flex gap-3">
              <a
                href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F4EFE7]/20 transition-all duration-300 hover:bg-[#F4EFE7] hover:text-[#26382F]"
              >
                <FaInstagramSquare size={18} />
              </a>

              <a
                href="https://www.facebook.com/YOUR_FACEBOOK_PAGE"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F4EFE7]/20 transition-all duration-300 hover:bg-[#F4EFE7] hover:text-[#26382F]"
              >
                <FaFacebookSquare size={18} />
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F4EFE7]/20 transition-all duration-300 hover:bg-[#F4EFE7] hover:text-[#26382F]"
              >
                < LuMessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#F4EFE7]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Yoga With Shants. All rights reserved.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            Back to top
            <FaArrowUpRightFromSquare size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}