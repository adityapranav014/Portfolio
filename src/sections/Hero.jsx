import { useRef, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Link } from "react-scroll";
import { CanvasLines } from "../components/ui/canvas";
import gsap from "gsap";

const Hero = () => {
  const videoRef = useRef(null);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  const pillRef = useRef(null);

  const text = `I help growing brands and startups gain an
unfair advantage through premium
AI-native digital products.`;

  useEffect(() => {
    // Hold all content invisible until preloader exits
    gsap.set([headerRef.current, ctaRef.current, pillRef.current], {
      opacity: 0,
      y: 55,
    });
    gsap.set(videoRef.current, { scale: 1.1 });

    const onAnimate = () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Video slowly releases its scale — cinematic Ken Burns feel
      tl.to(videoRef.current, {
        scale: 1,
        duration: 2.8,
        ease: "power3.out",
      }, 0);

      // Header text block rises in
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
      }, 0);

      // CTAs stagger slightly behind header
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
      }, 0.22);

      // Availability pill last — lightest element, shortest travel
      tl.to(pillRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
      }, 0.38);
    };

    if (window.isPreloaderDone) {
      gsap.delayedCall(0.5, onAnimate);
    } else {
      window.addEventListener("hero:animate", onAnimate);
      return () => window.removeEventListener("hero:animate", onAnimate);
    }
  }, []);

  return (
    <section id="home" className="relative flex flex-col min-h-dvh overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover -z-50"
      >
        <source src="https://ik.imagekit.io/gglxgr4rz/Portfolio/hero.mp4" type="video/mp4" />
      </video>
      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      <div ref={headerRef}>
        <AnimatedHeaderSection
          subTitle={"Full-Stack Developer & Creative Technologist"}
          title={"Aditya Pranav"}
          text={text}
          textColor={"text-white"}
          headingTag="h1"
        />
      </div>

      {/* CTA row */}
      <div ref={ctaRef} className="mt-auto flex items-center flex-wrap gap-[clamp(1rem,3dvh,1.5rem)] px-[clamp(1.5rem,5vw,6rem)] pb-[clamp(1rem,2dvh,1.5rem)]">
        {/* Primary CTA — vertical fill sweep on hover */}
        <Link
          to="contact"
          smooth
          duration={1800}
          offset={0}
          className="group relative flex items-center gap-3 bg-white text-black px-[clamp(1rem,3vw,1.75rem)] py-[clamp(0.6rem,1.5dvh,0.875rem)] overflow-hidden cursor-pointer select-none"
        >
          <span className="relative z-10 text-[clamp(0.5rem,1.2dvh,10px)] uppercase tracking-[0.22em] font-light transition-colors duration-500">
            Start a Project
          </span>
          <span className="relative z-10 text-[clamp(0.6rem,1.5dvh,14px)] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          {/* accent sweep */}
          <span className="absolute inset-0 bg-accent translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
        </Link>

        {/* Secondary CTA — animated underline text link */}
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
          <span className="text-white/40 group-hover:text-white text-[clamp(0.6rem,1.5dvh,12px)] transition-all duration-300 group-hover:translate-y-0.5">↓</span>
        </Link>
      </div>

      {/* Availability pill */}
      <div ref={pillRef} className="flex items-center gap-2.5 px-[clamp(1.5rem,5vw,6rem)] pb-[clamp(1.5rem,4dvh,2rem)]">
        <span className="relative flex h-[clamp(0.5rem,1.5dvh,0.75rem)] w-[clamp(0.5rem,1.5dvh,0.75rem)] items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-[clamp(0.4rem,1.2dvh,0.5rem)] w-[clamp(0.4rem,1.2dvh,0.5rem)] rounded-full bg-green-400"></span>
        </span>
        <span className="text-[clamp(0.6rem,1.3dvh,0.75rem)] uppercase tracking-widest text-white/50 font-light">
          Available for work — May 2026
        </span>
      </div>
      <CanvasLines />
    </section>
  );
};

export default Hero;
