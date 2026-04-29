import { Icon } from "@iconify/react/dist/iconify.js";
import UseAnimations from "react-useanimations";
import arrowUp from "react-useanimations/lib/arrowUp";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Magnetic from "../components/ui/Magnetic";

const Works = () => {
  const containerRef = useRef(null);
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(null);

  const openProject = (slug) => {
    const curtain = document.createElement("div");
    curtain.style.cssText =
      "position:fixed;inset:0;background:#000;z-index:9990;transform:translateY(100%)";
    document.body.appendChild(curtain);
    gsap.to(curtain, {
      yPercent: 0,
      duration: 0.7,
      ease: "expo.inOut",
      onComplete: () => {
        navigate(`/work/${slug}`);
        window.scrollTo(0, 0);
        document.body.removeChild(curtain);
      },
    });
  };
  const text = `I don't build generic websites. I launch lethal,
    high-conversion market weapons engineered to captivate
    audiences and crush revenue targets indiscriminately.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(
    () => {
      moveX.current = gsap.quickTo(previewRef.current, "x", {
        duration: 1.5,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(previewRef.current, "y", {
        duration: 2,
        ease: "power3.out",
      });

      gsap.from(".project-item", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: ".project-item",
        },
      });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = (index, e) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    const item = e.currentTarget;
    if (!el) return;

    gsap.killTweensOf([el, item, "#displacementMap"]);

    // Overlay reveal
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.4,
        ease: "power4.out",
      }
    );

    // Row skew/tilt
    gsap.to(item, {
      skewX: -2,
      x: 10,
      duration: 0.4,
      ease: "power2.out",
    });

    // Preview scale and displacement surge
    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power4.out",
    });

    gsap.fromTo("#displacementMap",
      { attr: { scale: 100 } },
      { attr: { scale: 0 }, duration: 1.2, ease: "power2.out" }
    );
  };

  const handleMouseLeave = (index, e) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    const item = e.currentTarget;
    if (!el) return;

    gsap.killTweensOf([el, item, "#displacementMap"]);

    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.4,
      ease: "power4.in",
    });

    gsap.to(item, {
      skewX: 0,
      x: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power4.in",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 40;
    mouse.current.y = e.clientY + 40;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);

    // Add a slight "jiggle" to displacement on move
    gsap.to("#displacementMap", {
      attr: { scale: 20 },
      duration: 0.2,
      onComplete: () => gsap.to("#displacementMap", { attr: { scale: 0 }, duration: 0.4 })
    });
  };

  return (
    <section id="work" ref={containerRef} className="flex flex-col min-h-dvh">
      <AnimatedHeaderSection
        subTitle={"An Arsenal of Digital Masterpieces"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id={`project-${project.id}`}
            role="button"
            tabIndex={0}
            className="project-item relative flex flex-col gap-1 py-8 cursor-pointer group md:gap-0"
            data-cursor-label="View"
            onClick={() => openProject(project.slug)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && openProject(project.slug)
            }
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseLeave={(e) => handleMouseLeave(index, e)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* title + meta */}
            <div className="flex justify-between items-start px-6 md:px-10 text-black transition-all duration-500 md:group-hover:px-16 md:group-hover:text-white">
              <div className="flex flex-col gap-1">
                <h2 className="lg:text-[42px] text-[32px] leading-none font-medium tracking-tight">
                  {project.name}
                </h2>
                <span className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-black/40 md:group-hover:text-white/40 transition-colors duration-500">
                  <span>{project.role}</span>
                  <span className="inline-flex items-center justify-center text-accent md:group-hover:text-accent transition-colors duration-500">
                    <svg viewBox="0 0 100 100" className="w-[0.9em] h-[0.9em] animate-[spin_8s_linear_infinite]" fill="currentColor" aria-hidden="true">
                      <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
                    </svg>
                  </span>
                  <span>{project.year}</span>
                </span>
              </div>
              <Magnetic strength={0.3}>
                <div className="md:w-8 md:h-8 w-6 h-6 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rotate-45 flex items-center justify-center">
                  <UseAnimations
                    animation={arrowUp}
                    size={32}
                    strokeColor="currentColor"
                    autoplay={true}
                    loop={true}
                  />
                </div>
              </Magnetic>
            </div>
            {/* divider */}
            <div className="w-full h-[1px] bg-black/10 mt-6 md:group-hover:bg-accent/30 transition-colors duration-500" />
            {/* framework */}
            <div className="flex flex-wrap px-6 md:px-10 text-[10px] md:text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-3 md:gap-x-5 md:group-hover:px-16 mt-2">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black/60 transition-colors duration-500 md:group-hover:text-white/40"
                >
                  {framework.name}
                </p>
              ))}
            </div>
            {/* mobile preview image */}
            <div className="px-6 md:hidden w-full mt-4">
              <div className="relative flex items-center justify-center w-full h-[400px] overflow-hidden rounded-xl bg-zinc-100">
                <img
                  src={project.bgImage}
                  alt={`${project.name} background`}
                  loading="lazy"
                  className="absolute inset-0 object-cover w-full h-full brightness-50"
                />
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  loading="lazy"
                  className="relative z-10 object-contain w-full h-full p-8"
                />
              </div>
            </div>
          </div>
        ))}
        {/* desktop floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-1/4 left-0 z-50 overflow-hidden border-[12px] border-black pointer-events-none w-[600px] aspect-[4/3] md:block hidden opacity-0 shadow-2xl"
          style={{ filter: "url(#displacementFilter)" }}
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt={`${projects[currentIndex].name} preview`}
              className="object-cover w-full h-full scale-110" // scale slightly to avoid edges during distortion
            />
          )}
        </div>

        {/* SVG Filter for Fluid Displacement */}
        <svg className="hidden">
          <filter id="displacementFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              id="displacementMap"
            />
          </filter>
        </svg>
      </div>
    </section>
  );
};


export default Works;

