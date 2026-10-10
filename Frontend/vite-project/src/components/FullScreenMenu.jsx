
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const yogaLinks = [
  { name: "Yoga Vacations", id: "yoga-vacations" },
  { name: "Upcoming", id: "upcoming" },
  { name: "Past Events", id: "past-events" },
  { name: "Reviews", id: "yoga-reviews" },
];

const bingeLinks = [
  { name: "Nut Butters", id: "nut-butters" },
  { name: "Honey", id: "honey" },
  { name: "Cakes", id: "cakes" },
  { name: "Sunday Lunches", id: "sunday-lunches" },
  { name: "How to Order", id: "how-to-order" },
  { name: "Reviews", id: "binge-reviews" },
];

const menuItems = [
  { type: "link", name: "Home", id: "home", key: "home" },
  { type: "link", name: "About", id: "about", key: "about" },
  {
    type: "dropdown",
    name: "Yoga Classes",
    id: "yoga-classes",
    key: "yoga",
    links: yogaLinks,
  },
  {
    type: "dropdown",
    name: "BingeAsana",
    id: "bingeasana",
    key: "binge",
    links: bingeLinks,
  },
  { type: "link", name: "Contact", id: "contact", key: "contact" },
];

function Underline({ active }) {
  return (
    <span
      className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-[#26382F] transition-transform duration-300 ease-out group-active:scale-x-100 [@media(hover:hover)]:group-hover:scale-x-100 ${
        active ? "scale-x-100" : "scale-x-0"
      }`}
    />
  );
}

export default function FullScreenMenu({
  open,
  closeMenu,
  active,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!open) {
      setOpenDropdown(null);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Yoga With Shants sections
  const handleYogaClick = (id) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/", {
        state: { scrollTo: id },
      });
      return;
    }

    scrollToSection(id);
  };

  // BingeAsana main item opens the top of the page
  const handleBingeOverview = () => {
    closeMenu();

    if (location.pathname !== "/bingeasana") {
      navigate("/bingeasana");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // BingeAsana dropdown items scroll within the same page
  const handleBingeSection = (link) => {
    closeMenu();

    if (location.pathname !== "/bingeasana") {
      navigate("/bingeasana", {
        state: { scrollTo: link.id },
      });
      return;
    }

    scrollToSection(link.id);
  };

  const handleMainLink = (item) => {
    if (item.key === "binge") {
      handleBingeOverview();
      return;
    }

    handleYogaClick(item.id);
  };

  const handleDropdownLink = (item, link) => {
    if (item.key === "binge") {
      handleBingeSection(link);
      return;
    }

    handleYogaClick(link.id);
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((previous) =>
      previous === key ? null : key
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 overflow-y-auto bg-[#F4EFE7] pt-28 sm:pt-32"
        >
          <div className="flex min-h-full flex-col items-center px-6 pb-16">
            <nav className="flex w-full flex-col items-center gap-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="flex w-full flex-col items-center"
                >
                  {item.type === "link" ? (
                    <button
                      type="button"
                      onClick={() => handleMainLink(item)}
                      className="group relative py-2 font-serif text-[40px] font-light leading-tight text-[#26382F] transition-transform duration-200 active:scale-95 sm:text-[52px]"
                    >
                      {item.name}
                      <Underline active={active === item.key} />
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        aria-expanded={openDropdown === item.key}
                        onClick={() => toggleDropdown(item.key)}
                        className="group relative flex items-center gap-3 py-2 font-serif text-[40px] font-light leading-tight text-[#26382F] transition-transform duration-200 active:scale-95 sm:text-[52px]"
                      >
                        <span className="relative">
                          {item.name}
                          <Underline
                            active={
                              active === item.key ||
                              openDropdown === item.key
                            }
                          />
                        </span>

                        <ChevronDown
                          size={28}
                          strokeWidth={1.5}
                          className={`transition-transform duration-300 ${
                            openDropdown === item.key
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {openDropdown === item.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="w-full max-w-sm overflow-hidden"
                          >
                            <div className="my-3 rounded-2xl border border-[#26382F]/10 bg-[#F4EFE7] p-2.5 shadow-[0_15px_40px_rgba(38,56,47,0.12)]">
                              <button
                                type="button"
                                onClick={() => handleMainLink(item)}
                                className="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-[#26382F] transition-all duration-200 active:bg-[#E7DED1] [@media(hover:hover)]:hover:bg-[#E7DED1] [@media(hover:hover)]:hover:pl-5"
                              >
                                Overview
                              </button>

                              {item.links.map((link, i) => (
                                <motion.button
                                  key={link.id}
                                  type="button"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.05 + i * 0.04,
                                  }}
                                  onClick={() =>
                                    handleDropdownLink(item, link)
                                  }
                                  className="block w-full rounded-xl px-4 py-3 text-left text-base text-[#26382F] transition-all duration-200 active:bg-[#E7DED1] [@media(hover:hover)]:hover:bg-[#E7DED1] [@media(hover:hover)]:hover:pl-5"
                                >
                                  {link.name}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
