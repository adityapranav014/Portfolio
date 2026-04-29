import { useRef, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Link } from "react-scroll";
import { CanvasLines } from "../components/ui/canvas";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import Magnetic from "../components/ui/Magnetic";

const Hero = () => {
  const videoRef = useRef(null);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  const pillRef = useRef(null);

  const text = `I forge category-defining digital empires that manipulate 
    psychology and raw compute power, arming visionary 
    leaders with products their competitors will fear.`;

  useEffect(() => {
    // Hold all content invisible until preloader exits
    gsap.set([headerRef.current, ctaRef.current, pillRef.current], {
      opacity: 0,
      y: 55,
    });
    gsap.set(videoRef.current, { scale: 1.1 });

    const onAnimate = () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Video slowly releases its scale - cinematic Ken Burns feel
      tl.to(
        videoRef.current,
        {
          scale: 1,
          duration: 2.8,
          ease: "power3.out",
        },
        0
      );

      // Header text block rises in
      tl.to(
        headerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
        },
        0
      );

      // CTAs stagger slightly behind header
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
        },
        0.22
      );

      // Availability pill last - lightest element, shortest travel
      tl.to(
        pillRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        0.38
      );
    };

    if (window.isPreloaderDone) {
      gsap.delayedCall(0.5, onAnimate);
    } else {
      window.addEventListener("hero:animate", onAnimate);
      return () => window.removeEventListener("hero:animate", onAnimate);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col min-h-dvh overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover -z-50"
      >
        <source
          src="https://ik.imagekit.io/gglxgr4rz/Portfolio/hero.mp4"
          type="video/mp4"
        />
      </video>
      {/* Base gradient – bottom darkening for text readability only */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-gradient-to-b from-transparent via-transparent to-black/65" />

      {/* ── REALISTIC VOLUMETRIC SUN LIGHT (TOP-RIGHT SOURCE) ──────────── */}

      {/* ── NATURAL "RAY OF HOPE" VOLUMETRIC LIGHTING ──────────── */}

      {/* Core Sun Brightness - Soft, pure light breaking the clouds */}
      <div
        className="pointer-events-none absolute mix-blend-screen"
        style={{
          top: "20%",
          left: "80%",
          width: "70vw",
          height: "70vw",
          transform: "translate(-50%, -50%)",
          zIndex: -35,
          background: "radial-gradient(circle closest-side, rgba(255,252,240,0.6) 0%, rgba(207,163,85,0.2) 40%, transparent 100%)",
          animation: "sun-flare-pulse 8s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />

      {/* Inner Hotspot for realism */}
      <div
        className="pointer-events-none absolute mix-blend-screen"
        style={{
          top: "20%",
          left: "80%",
          width: "25vw",
          height: "25vw",
          transform: "translate(-50%, -50%)",
          zIndex: -34,
          background: "radial-gradient(circle closest-side, rgba(255,255,255,0.9) 0%, rgba(255,245,210,0.4) 40%, transparent 100%)",
          filter: "blur(15px)",
        }}
      />

      {/* Main Ray of Hope - Desktop (Aimed perfectly at face area at ~-38deg) */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block mix-blend-screen"
        style={{
          zIndex: -34,
          background: "radial-gradient(ellipse 120% 25% at 80% 20%, rgba(255,252,240,0.2) 0%, rgba(207,163,85,0.08) 40%, transparent 80%)",
          transformOrigin: "80% 20%",
          transform: "rotate(-38deg)",
          filter: "blur(40px)",
          animation: "hero-light-breathe 10s ease-in-out infinite",
        }}
      />

      {/* Secondary Inner Ray - Desktop (Tighter, brighter core to the beam) */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block mix-blend-screen"
        style={{
          zIndex: -33,
          background: "radial-gradient(ellipse 100% 12% at 80% 20%, rgba(255,255,255,0.25) 0%, rgba(207,163,85,0.1) 50%, transparent 80%)",
          transformOrigin: "80% 20%",
          transform: "rotate(-40deg)",
          filter: "blur(20px)",
          animation: "hero-light-breathe 8s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Main Ray - Mobile (Points more vertically downward) */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden mix-blend-screen"
        style={{
          zIndex: -34,
          background: "radial-gradient(ellipse 140% 35% at 80% 20%, rgba(255,252,240,0.15) 0%, rgba(207,163,85,0.08) 45%, transparent 80%)",
          transformOrigin: "80% 20%",
          transform: "rotate(-75deg)",
          filter: "blur(40px)",
          animation: "hero-light-breathe 10s ease-in-out infinite",
        }}
      />

      {/* Atmospheric Gold Wash */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          zIndex: -33,
          background: "radial-gradient(ellipse 100% 100% at 80% 20%, rgba(207,163,85,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Deep Shadow Contrast for Volumetric Pop */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          zIndex: -32,
          background: "radial-gradient(ellipse 80% 70% at -10% 110%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)",
        }}
      />
      {/* 7. Text Legibility Gradient - A subtle dark scrim pinned to the right edge wrapping the paragraph */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          zIndex: -31,
          background: "radial-gradient(ellipse 70% 60% at 85% 45%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 45%, transparent 80%)",
        }}
      />
      {/* ────────────────────────────────────────────────────────────────────── */}

      <div ref={headerRef} className="relative z-10">
        <AnimatedHeaderSection
          subTitle={"Architect of Digital Dominance"}
          title={"Aditya Pranav"}
          text={text}
          textColor={"text-white [text-shadow:0_4px_24px_rgba(0,0,0,1),0_2px_6px_rgba(0,0,0,0.5)]"}
          headingTag="h1"
        />
      </div>

      {/* CTA row */}
      <div
        ref={ctaRef}
        className="mt-auto flex items-center flex-wrap gap-[clamp(1rem,3dvh,1.5rem)] px-[clamp(1.5rem,5vw,6rem)] pb-[clamp(1rem,2dvh,1.5rem)]"
      >
        {/* Primary CTA - vertical fill sweep on hover */}
        <Magnetic strength={0.3}>
          <Link
            to="contact"
            smooth
            duration={1800}
            offset={0}
            className="group relative flex items-center gap-3 bg-white text-black px-[clamp(1.2rem,3.5vw,2rem)] py-[clamp(0.7rem,1.8dvh,1rem)] overflow-hidden cursor-pointer select-none"
            data-cursor-label="Let's go"
          >
            <span className="relative z-10 text-[clamp(0.5rem,1.2dvh,10px)] uppercase tracking-[0.22em] font-medium transition-colors duration-500">
              Start a Project
            </span>
            <span className="relative z-10 text-[clamp(0.6rem,1.5dvh,14px)] transition-transform duration-300 group-hover:translate-x-1 flex items-center">
              <Icon
                icon="ph:arrow-right-light"
                className="w-[1.2em] h-[1.2em]"
              />
            </span>
            {/* accent sweep */}
            <span className="absolute inset-0 bg-accent translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          </Link>
        </Magnetic>

        {/* Secondary CTA - animated underline text link */}
        <Magnetic strength={0.2}>
          <Link
            to="work"
            smooth
            duration={1600}
            offset={0}
            className="group flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="relative text-[clamp(0.5rem,1.2dvh,10px)] uppercase tracking-[0.22em] font-light text-white/70 group-hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-400 group-hover:after:w-full">
              View My Work
            </span>
            <span className="text-white/40 group-hover:text-white text-[clamp(0.6rem,1.5dvh,12px)] transition-all duration-300 group-hover:translate-y-0.5 flex items-center">
              <Icon icon="ph:arrow-down-light" className="w-[1.2em] h-[1.2em]" />
            </span>
          </Link>
        </Magnetic>
      </div>

      {/* Availability pill */}
      <div
        ref={pillRef}
        className="flex items-center gap-2.5 px-[clamp(1.5rem,5vw,6rem)] pb-[clamp(1.5rem,4dvh,2rem)]"
      >
        <span className="relative flex h-[clamp(0.5rem,1.5dvh,0.75rem)] w-[clamp(0.5rem,1.5dvh,0.75rem)] items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-[clamp(0.4rem,1.2dvh,0.5rem)] w-[clamp(0.4rem,1.2dvh,0.5rem)] rounded-full bg-green-400"></span>
        </span>
        <span className="text-[clamp(0.6rem,1.3dvh,0.75rem)] uppercase tracking-widest text-white/50 font-light">
          Available for work • May 2026
        </span>
      </div>
      <CanvasLines />
    </section>
  );
};

export default Hero;
