import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis, { useLenis } from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { ImageKitProvider } from "@imagekit/react";
import Noise from "./components/Noise";

import ScrollUI from "./components/ScrollUI";
import Transition from "./components/Transition";
import Preloader from "./components/Preloader";
import ProjectDetail from "./pages/ProjectDetail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Always start at the top on every page load/refresh
if (typeof window !== "undefined") {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

// Konami code sequence
const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

// Sync Lenis scroll position into GSAP ScrollTrigger on every frame
const LenisScrollSync = () => {
  useLenis(ScrollTrigger.update);
  return null;
};

const HomePage = () => (
  <Transition>
    <ReactLenis root className="relative w-screen min-h-dvh overflow-x-auto">
      <LenisScrollSync />
      <ScrollUI />
      <Navbar />
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <ContactSummary />
      <Contact />
    </ReactLenis>
  </Transition>
);

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const konamiIndex = useRef(0);

  // Lock body scroll while preloader is active
  useEffect(() => {
    document.body.style.overflow = showPreloader ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showPreloader]);
  const easterRef = useRef(null);

  // Easter egg - Konami code triggers a brief colour-inversion flash
  useEffect(() => {
    const onKey = (e) => {
      if (e.keyCode === KONAMI[konamiIndex.current]) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          if (easterRef.current) {
            gsap.fromTo(
              easterRef.current,
              { opacity: 1, scale: 1 },
              { opacity: 0, scale: 1.04, duration: 1.2, ease: "expo.out" }
            );
            gsap.fromTo(
              document.body,
              { filter: "invert(1)" },
              { filter: "invert(0)", duration: 1.5, ease: "power2.inOut" }
            );
          }
        }
      } else {
        konamiIndex.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ImageKitProvider urlEndpoint="https://ik.imagekit.io/gglxgr4rz">
      <Noise />

      {/* Cinematic preloader - renders on top while app loads beneath */}
      {showPreloader && (
        <Preloader
          onComplete={() => {
            setShowPreloader(false);
            window.isPreloaderDone = true;
            window.dispatchEvent(new CustomEvent("hero:animate"));
          }}
        />
      )}

      {/* Easter egg overlay */}
      <div
        ref={easterRef}
        className="fixed inset-0 z-[9998] bg-accent pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* App renders immediately so the hero video starts buffering */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
    </ImageKitProvider>
  );
};

export default App;
