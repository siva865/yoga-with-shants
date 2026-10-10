import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";

import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import AboutShantala from "./components/AboutShantala";
import YogaClasses from "./components/YogaClasses";
import YogaVacations from "./components/YogaVacations";
import Upcoming from "./components/UpcomingVacations";
import PastEvents from "./components/PastEvents";
import YogaReviews from "./components/YogaReviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BingeAsanaHero from "./components/BingeAsanaHero";
import NutButters from "./components/NutButters";
import Honey from "./components/Honey";
import Cakes from "./components/Cakes";
import SundayLunches from "./components/SundayLunches";
import HowToOrder from "./components/HowToOrder";
import Reviews from "./components/BingeReviews";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Yoga With Shants Page
function YogaWithShantsPage() {
  return (
    <main>
      <HomeHero />
      <AboutShantala />
      <YogaClasses />
      <YogaVacations />
      <Upcoming />
      <PastEvents />
      <YogaReviews />
      <Contact />
    </main>
  );
}

// BingeAsana Single Page
function BingeAsanaPage() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    const sectionId = state?.scrollTo || hash.slice(1);

    if (!sectionId) {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
      return;
    }

    // Wait until the page sections have rendered
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [pathname, hash, state]);

  return (
    <main>
      <BingeAsanaHero />
      <NutButters />
      <Honey />
      <Cakes />
      <SundayLunches />
      <HowToOrder />
      <Reviews />
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<YogaWithShantsPage />}
          />

          <Route
            path="/bingeasana"
            element={<BingeAsanaPage />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}