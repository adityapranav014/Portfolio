import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Link } from "react-scroll";
import { CanvasLines } from "../components/ui/canvas";

const Hero = () => {
  const text = `I help growing brands and startups gain an
unfair advantage through premium
AI-native digital products.`;
  return (
    <section id="home" className="relative flex flex-col justify-end min-h-dvh overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover -z-50"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />
      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      <AnimatedHeaderSection
        subTitle={"Full-Stack Developer & Creative Technologist"}
        title={"Aditya Pranav"}
        text={text}
        textColor={"text-white"}
        headingTag="h1"
      />
      {/* CTA row */}
      <div className="flex items-center gap-6 px-10 pb-6 md:px-16 lg:px-24">
        {/* Primary CTA — vertical fill sweep on hover */}
        <Link
          to="contact"
          smooth
          duration={1800}
          offset={0}
          className="group relative flex items-center gap-3 bg-white text-black px-7 py-3.5 overflow-hidden cursor-pointer select-none"
        >
          <span className="relative z-10 text-[10px] uppercase tracking-[0.22em] font-light transition-colors duration-500">
            Start a Project
          </span>
          <span className="relative z-10 text-sm transition-transform duration-300 group-hover:translate-x-1">
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
          <span className="relative text-[10px] uppercase tracking-[0.22em] font-light text-white/70 group-hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-400 group-hover:after:w-full">
            View My Work
          </span>
          <span className="text-white/40 group-hover:text-white text-xs transition-all duration-300 group-hover:translate-y-0.5">↓</span>
        </Link>
      </div>

      {/* Availability pill */}
      <div className="flex items-center gap-2.5 px-10 pb-8 md:px-16 lg:px-24">
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
        </span>
        <span className="text-xs uppercase tracking-widest text-white/50 font-light">
          Available for work — May 2026
        </span>
      </div>
      <CanvasLines />
    </section>
  );
};

export default Hero;
