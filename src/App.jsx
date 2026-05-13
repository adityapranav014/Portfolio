import { Component, useEffect, useRef, useState } from "react";
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
import Footer from "./components/Footer";
import StatsMarquee from "./sections/StatsMarquee";
import { ImageKitProvider } from "@imagekit/react";
import Noise from "./components/Noise";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.35em]">Something went wrong</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            className="text-white text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white/10 transition-colors duration-300"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const NotFound = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-6 text-center font-amiamie">
    <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">404</span>
    <h1 className="text-[clamp(4rem,12vw,10rem)] font-light leading-none tracking-tighter text-white">Not Found</h1>
    <a href="/" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300 border-b border-white/20 pb-px">
      Return to Index
    </a>
  </div>
);

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
    <ReactLenis root className="relative w-full min-h-dvh overflow-x-hidden">
      <LenisScrollSync />
      <ScrollUI />
      <Navbar />
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <StatsMarquee />
      <ContactSummary />
      <Contact />
      <Footer />
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
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
      <SpeedInsights />
    </ImageKitProvider>
  );
};

export default App;
