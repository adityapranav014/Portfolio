import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Transition from "./components/Transition";
import ProjectDetail from "./pages/ProjectDetail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
  const [isReady, setIsReady] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const konamiIndex = useRef(0);
  const easterRef = useRef(null);

  // Branded preloader — animates 0→100 in ~1.1s
  useEffect(() => {
    let start = null;
    const duration = 1100;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const pct = Math.min(Math.round(((timestamp - start) / duration) * 100), 100);
      setDisplayProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => setIsReady(true), 250);
      }
    };
    requestAnimationFrame(step);
  }, []);

  // Easter egg — Konami code triggers a brief colour-inversion flash
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

      {/* Branded preloader */}
      {!isReady && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white">
          {/* AP monogram */}
          <p className="text-7xl md:text-9xl font-black tracking-tight mb-6 text-white leading-none select-none">
            AP
          </p>
          {/* Thin progress line */}
          <div className="relative h-px w-48 bg-white/20 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-100"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
            {displayProgress}%
          </p>
        </div>
      )}

      {/* Easter egg overlay */}
      <div
        ref={easterRef}
        className="fixed inset-0 z-[9998] bg-accent pointer-events-none opacity-0"
        aria-hidden="true"
      />

      <div className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ImageKitProvider>
  );
};

export default App;
