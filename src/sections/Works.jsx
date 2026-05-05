import { Icon } from "@iconify/react/dist/iconify.js";
import { projects } from "../constants";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [curtainActive, setCurtainActive] = useState(false);
  const curtainRef = useRef(null);

  const openProject = (slug) => {
    gsap.killTweensOf("#displacementMap");
    setCurtainActive(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gsap.fromTo(
          curtainRef.current,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.inOut",
            onComplete: () => {
              navigate(`/work/${slug}`);
              window.scrollTo(0, 0);
              setCurtainActive(false);
            },
          }
        );
      });
    });
  };
  const text = `Each project is built with intent: thoughtful design,
    clean code, and a focus on results that actually
    matter to your business and your users.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);
  const worksHeaderRef = useRef(null);
  const worksTitleRef = useRef(null);

  useGSAP(
    () => {
      // Header index band
      gsap.from(worksHeaderRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: worksHeaderRef.current, start: "top 90%" },
      });
      // Title clip reveal
      gsap.from(worksTitleRef.current, {
        yPercent: 110,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: worksTitleRef.current, start: "top 95%" },
      });
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
    <>
      {curtainActive && createPortal(
        <div
          ref={curtainRef}
          style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9990, transform: "translateY(100%)" }}
          aria-hidden="true"
        />,
        document.body
      )}
      <section id="work" ref={containerRef} className="flex flex-col min-h-dvh">
        {/* ── SECTION HEADER: Counter rule layout ────────── */}
        <div className="pt-[clamp(3rem,8dvh,6rem)]" ref={worksHeaderRef}>
          {/* Spread rule with embedded labels */}
          <div className="flex items-center gap-4 px-6 md:px-10 pb-5 border-b border-black/[0.1]">
            <span className="text-[10px] font-light tracking-[0.35em] text-black/30 tabular-nums shrink-0">04</span>
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-[10px] font-light tracking-[0.3em] text-black/25 uppercase shrink-0">Selected Work</span>
            <div className="flex-1 h-px bg-black/10" />
            <span className="hidden md:block text-[10px] font-light tracking-[0.3em] text-black/20 tabular-nums shrink-0">2023 — 2025</span>
          </div>
          {/* Title row */}
          <div className="flex items-end justify-between gap-6 px-6 md:px-10 pt-8 pb-10">
            <div className="overflow-hidden">
              <h2
                ref={worksTitleRef}
                className="banner-text-responsive font-light leading-[0.95] tracking-tighter text-black"
              >
                Works
              </h2>
            </div>
            <p className="hidden md:block font-light text-[11px] tracking-wider text-black/35 max-w-[26ch] text-right leading-relaxed pb-2">
              Each project built with intent: thoughtful design, clean code, results that matter.
            </p>
          </div>
        </div>
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
              className="project-item relative isolate flex flex-col gap-1 py-8 cursor-pointer group md:gap-0"
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
                  <h2 className="text-[22px] sm:text-[32px] lg:text-[42px] leading-none font-medium tracking-tight">
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
                  <div className="md:w-8 md:h-8 w-6 h-6 mt-1 flex items-center justify-center">
                    <Icon
                      icon="ph:arrow-up-right-light"
                      className="w-full h-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Magnetic>
              </div>
              {/* divider */}
              <div className="w-full h-[1px] bg-black/10 mt-6 md:group-hover:bg-accent/30 transition-colors duration-500" />
              {/* framework */}
              <div className="flex flex-wrap px-6 md:px-10 text-[10px] md:text-sm leading-loose uppercase transition-all duration-500 gap-x-3 md:gap-x-5 md:group-hover:px-16 mt-2">
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
                <div className="relative flex items-center justify-center w-full h-[260px] sm:h-[380px] overflow-hidden rounded-xl bg-zinc-100">
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
          >
            <div className="w-full h-full" style={{ filter: "url(#displacementFilter)" }}>
              {currentIndex !== null && (
                <img
                  src={projects[currentIndex].image}
                  alt={`${projects[currentIndex].name} preview`}
                  className="object-cover w-full h-full scale-110"
                />
              )}
            </div>
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
    </>
  );
};


export default Works;

