import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Link } from "react-scroll";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
AI-native digital products.`;
  return (
    <section id="home" className="flex flex-col justify-end min-h-dvh">
      <AnimatedHeaderSection
        subTitle={"Full-Stack Developer & Creative Technologist"}
        title={"Aditya Pranav"}
        text={text}
        textColor={"text-black"}
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
          className="group relative flex items-center gap-3 bg-DarkLava text-primary px-7 py-3.5 overflow-hidden cursor-pointer select-none"
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
          <span className="relative text-[10px] uppercase tracking-[0.22em] font-light text-black/70 group-hover:text-black transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-400 group-hover:after:w-full">
            View My Work
          </span>
          <span className="text-black/40 group-hover:text-black text-xs transition-all duration-300 group-hover:translate-y-0.5">↓</span>
        </Link>
      </div>

      {/* Availability pill */}
      <div className="flex items-center gap-2.5 px-10 pb-8 md:px-16 lg:px-24">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
        <span className="text-xs uppercase tracking-widest text-black/50 font-light">
          Available for work — May 2026
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100dvh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
