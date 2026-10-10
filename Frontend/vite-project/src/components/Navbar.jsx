import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Minus, Menu, ChevronDown } from "lucide-react";
import FullScreenMenu from "./FullScreenMenu";

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

const sectionMap = {
  home: ["home"],
  about: ["about"],
  yoga: ["yoga-classes", ...yogaLinks.map((link) => link.id)],
  binge: ["bingeasana", ...bingeLinks.map((link) => link.id)],
  contact: ["contact"],
};

const allIds = Object.values(sectionMap).flat();

function useActiveNav() {
  const [active, setActive] = useState("home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/bingeasana") {
      setActive("binge");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = Object.keys(sectionMap).find((item) =>
              sectionMap[item].includes(entry.target.id)
            );

            if (key) setActive(key);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return active;
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
}

const glass = (scrolled) =>
  `border border-white/60 backdrop-blur-xl transition-all duration-500 ${
    scrolled
      ? "bg-[#F4EFE7]/85 shadow-[0_10px_40px_rgba(38,56,47,0.18)]"
      : "bg-[#F4EFE7]/65 shadow-[0_6px_24px_rgba(38,56,47,0.08)]"
  }`;

function NavItem({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[15px] font-semibold tracking-tight transition-all duration-300 active:scale-95 xl:px-5 ${
        active
          ? "bg-[#26382F] text-[#F4EFE7]"
          : "text-[#26382F] hover:bg-[#26382F]/10"
      }`}
    >
      {children}
    </button>
  );
}

function Dropdown({
  label,
  links,
  open,
  setOpen,
  active,
  onMainClick,
  onSectionClick,
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavItem active={active} onClick={onMainClick}>
        <span className="flex items-center gap-1.5">
          {label}
          <ChevronDown
            size={15}
            strokeWidth={2}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </NavItem>

      <div
        className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-5 transition-all duration-300 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="rounded-3xl border border-white/60 bg-[#F4EFE7]/95 p-2.5 shadow-[0_20px_50px_rgba(38,56,47,0.18)] backdrop-blur-xl">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                setOpen(false);
                onSectionClick(link);
              }}
              className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#26382F] transition-all duration-200 hover:bg-[#E7DED1] hover:pl-5 active:bg-[#E7DED1]"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [yogaOpen, setYogaOpen] = useState(false);
  const [bingeOpen, setBingeOpen] = useState(false);

  const active = useActiveNav();
  const scrolled = useScrolled();
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenus = () => {
    setMenuOpen(false);
    setYogaOpen(false);
    setBingeOpen(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Navigate to a section on the Yoga With Shants page
  const goToSection = (id, page = "/") => {
    closeMenus();

    if (location.pathname !== page) {
      navigate(page, {
        state: { scrollTo: id },
      });
      return;
    }

    scrollToSection(id);
  };

  // Main BingeAsana Navbar item always opens the top
  const goToBingeAsana = () => {
    closeMenus();

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
  const goToBingeSection = (link) => {
    closeMenus();

    if (location.pathname !== "/bingeasana") {
      navigate("/bingeasana", {
        state: { scrollTo: link.id },
      });
      return;
    }

    scrollToSection(link.id);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-5 lg:px-10">
        {/* Mobile: flex + justify-between (logo left, menu right)
            Desktop (lg): 3-column grid (logo | nav | empty) */}
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-normal">
          {/* LEFT: LOGO */}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => goToSection("home", "/")}
              aria-label="Yoga With Shants home"
              className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-[#26382F] active:scale-90 sm:h-14 sm:w-14 ${glass(
                scrolled
              )}`}
            >
              YWS
            </button>
          </div>

          {/* CENTER: ROUNDED NAVBAR */}
          <nav
            className={`pointer-events-auto hidden items-center justify-center gap-1 rounded-full ${
              scrolled ? "p-1" : "p-1.5"
            } ${glass(scrolled)} lg:flex`}
          >
            <NavItem
              active={location.pathname === "/" && active === "home"}
              onClick={() => goToSection("home", "/")}
            >
              Home
            </NavItem>

            <NavItem
              active={location.pathname === "/" && active === "about"}
              onClick={() => goToSection("about", "/")}
            >
              About
            </NavItem>

            <Dropdown
              label="Yoga Classes"
              links={yogaLinks}
              open={yogaOpen}
              setOpen={setYogaOpen}
              active={location.pathname === "/" && active === "yoga"}
              onMainClick={() => goToSection("yoga-classes", "/")}
              onSectionClick={(link) =>
                goToSection(link.id, "/")
              }
            />

            <Dropdown
              label="BingeAsana"
              links={bingeLinks}
              open={bingeOpen}
              setOpen={setBingeOpen}
              active={location.pathname === "/bingeasana"}
              onMainClick={goToBingeAsana}
              onSectionClick={goToBingeSection}
            />

            <NavItem
              active={location.pathname === "/" && active === "contact"}
              onClick={() => goToSection("contact", "/")}
            >
              Contact
            </NavItem>
          </nav>

          {/* RIGHT: MOBILE MENU BUTTON */}
          <div className="flex justify-end">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#26382F] text-[#F4EFE7] shadow-[0_8px_24px_rgba(38,56,47,0.25)] transition-all duration-300 hover:bg-[#354B40] active:scale-90 sm:h-14 sm:w-14 lg:hidden"
            >
              {menuOpen ? (
                <Minus size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={23} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      <FullScreenMenu
        open={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        active={active}
      />
    </>
  );
}