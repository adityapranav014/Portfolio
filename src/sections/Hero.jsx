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

  const text = `I help brands build meaningful digital experiences, from clean, 
    fast interfaces to solid, scalable backends. Together  
    we will create something worth noticing.`;

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
      let fired = false;
      const handle = () => { fired = true; onAnimate(); };
      window.addEventListener("hero:animate", handle, { once: true });
      // Safety net: if the event was dispatched before this listener attached,
      // fall back to animating after a reasonable delay.
      const fallback = setTimeout(() => { if (!fired) onAnimate(); }, 4000);
      return () => {
        window.removeEventListener("hero:animate", handle);
        clearTimeout(fallback);
      };
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
        poster="https://ik.imagekit.io/gglxgr4rz/Portfolio/hero.mp4/ik-thumbnail.jpg"
        className="absolute inset-0 h-full w-full object-cover -z-50"
      >
        <source
          src="https://ik.imagekit.io/gglxgr4rz/Portfolio/hero.mp4"
          type="video/mp4"
        />
      </video>
      {/* Base gradient – bottom darkening for text readability */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-gradient-to-b from-transparent via-transparent to-black/65" />

      {/* Ambient corner glow — single clean light source */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          zIndex: -35,
          background: "radial-gradient(ellipse 80% 70% at 82% 10%, rgba(255,248,225,0.55) 0%, rgba(207,163,85,0.18) 35%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Directional crepuscular ray */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          zIndex: -34,
          background: "radial-gradient(ellipse 110% 18% at 82% 10%, rgba(255,250,230,0.18) 0%, rgba(207,163,85,0.06) 50%, transparent 80%)",
          transformOrigin: "82% 10%",
          transform: "rotate(-35deg)",
          filter: "blur(30px)",
        }}
      />

      <div ref={headerRef} className="relative z-10 font-montserrat">
        <AnimatedHeaderSection
          title={"Aditya Pranav"}
          text={text}
          textColor={"text-white [text-shadow:0_4px_24px_rgba(0,0,0,1),0_2px_6px_rgba(0,0,0,0.5)]"}
          headingTag="h1"
        />
      </div>

      {/* CTA row */}
      <div
        ref={ctaRef}
        className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-[clamp(1.5rem,3dvh,2rem)] px-[clamp(1.5rem,5vw,6rem)] pb-8 sm:pb-[clamp(2rem,3dvh,2.5rem)]"
      >
        {/* Primary CTA - vertical fill sweep on hover */}
        <Magnetic strength={0.3}>
          <Link
            to="contact"
            smooth
            duration={1800}
            offset={0}
            className="group relative flex items-center gap-4 bg-white text-black px-7 sm:px-[clamp(1.5rem,3.5vw,2.5rem)] py-3.5 sm:py-[clamp(0.8rem,2dvh,1.2rem)] overflow-hidden cursor-pointer select-none"
          >
            <span className="relative z-10 text-[11px] sm:text-[clamp(0.55rem,1.2dvh,11px)] uppercase tracking-[0.28em] font-medium transition-colors duration-500">
              Start a Project
            </span>
            <span className="relative z-10 text-[14px] sm:text-[clamp(0.7rem,1.5dvh,15px)] transition-transform duration-300 group-hover:translate-x-1 flex items-center">
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
            className="group flex items-center gap-2.5 cursor-pointer select-none py-1 sm:py-0"
          >
            <span className="relative text-[11px] sm:text-[clamp(0.55rem,1.2dvh,11px)] uppercase tracking-[0.28em] font-light text-white/70 group-hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-400 group-hover:after:w-full">
              View My Work
            </span>
            <span className="text-white/40 group-hover:text-white text-[14px] sm:text-[clamp(0.7rem,1.5dvh,15px)] transition-all duration-300 group-hover:translate-y-0.5 flex items-center">
              <Icon icon="ph:arrow-down-light" className="w-[1.2em] h-[1.2em]" />
            </span>
          </Link>
        </Magnetic>
      </div>

      {/* Availability pill */}
      <div
        ref={pillRef}
        className="flex items-center gap-3 px-[clamp(1.5rem,5vw,6rem)] pb-[clamp(2rem,4dvh,2rem)] sm:pb-[clamp(1.5rem,4dvh,2rem)]"
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
