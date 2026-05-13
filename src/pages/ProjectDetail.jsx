import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { projects } from "../constants";
import Transition from "../components/Transition";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.slug === slug);

    const headerRef = useRef(null);
    const metaRef = useRef(null);
    const bodyRef = useRef(null);
    const imgRef = useRef(null);
    const imgOverlayRef = useRef(null);
    const curtainRef = useRef(null);
    const [curtainActive, setCurtainActive] = useState(false);

    // Redirect to home if slug not found
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!project) navigate("/", { replace: true });
    }, [project, navigate]);

    useGSAP(() => {
        if (!project) return;
        const tl = gsap.timeline({ delay: 0.4 });

        tl.from(headerRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
            .to(imgOverlayRef.current, {
                height: 0,
                duration: 1.2,
                ease: "power3.inOut"
            }, "-=0.6")
            .from(imgRef.current, {
                scale: 1.2,
                duration: 1.2,
                ease: "power3.inOut"
            }, "<")
            .from(metaRef.current.children, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.4")
            .from(bodyRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");
    }, [project]);

    if (!project) return null;

    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const prevProject = projects[currentIndex - 1] ?? null;
    const nextProject = projects[currentIndex + 1] ?? null;

    const navigateWithCurtain = (targetSlug) => {
        setCurtainActive(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                gsap.fromTo(curtainRef.current,
                    { yPercent: 100 },
                    {
                        yPercent: 0,
                        duration: 0.7,
                        ease: "expo.inOut",
                        onComplete: () => {
                            navigate(`/work/${targetSlug}`);
                            window.scrollTo(0, 0);
                            setCurtainActive(false);
                        },
                    }
                );
            });
        });
    };

    const goHome = () => {
        setCurtainActive(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                gsap.fromTo(curtainRef.current,
                    { yPercent: 100 },
                    {
                        yPercent: 0,
                        duration: 0.7,
                        ease: "expo.inOut",
                        onComplete: () => {
                            navigate("/");
                            window.scrollTo(0, 0);
                            setCurtainActive(false);
                        },
                    }
                );
            });
        });
    };

    return (
        <Transition>
            {curtainActive && createPortal(
                <div
                    ref={curtainRef}
                    style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9990, transform: "translateY(100%)" }}
                    aria-hidden="true"
                />,
                document.body
            )}
            <main id="main-content" tabIndex={-1} className="outline-none min-h-screen bg-primary font-amiamie overflow-x-hidden text-black selection:bg-black selection:text-white">
                {/* Custom Cursor/Back Button overlaying hero roughly */}
                <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50 mix-blend-difference">
                    <button
                        onClick={goHome}
                        className="flex items-center gap-2 text-xs tracking-widest text-white hover:opacity-70 transition-opacity duration-300 cursor-none group"
                    >
                        <div className="size-5 flex items-center justify-center">
                            <Icon icon="ph:arrow-left-light" className="w-5 h-5" />
                        </div>
                        <span className="hidden md:inline">Back to Index</span>
                    </button>
                </div>

                <div className="pt-32 pb-24 md:pt-48 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
                    {/* Massive Title */}
                    <div className="overflow-hidden mb-10 md:mb-16 pb-4">
                        <h1
                            ref={headerRef}
                            className="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] font-light leading-none tracking-tighter"
                        >
                            {project.name}
                        </h1>
                    </div>

                    {/* Hero Image Container with reveal effect */}
                    <div className="relative w-full h-[50vh] md:h-[75vh] lg:h-[85vh] overflow-hidden mb-16 md:mb-24 rounded-sm">
                        <div ref={imgOverlayRef} className="absolute inset-0 bg-primary z-10 w-full h-full origin-bottom" />
                        <img
                            ref={imgRef}
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover origin-center"
                        />
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-8">
                        {/* Left Info Column */}
                        <div className="lg:col-span-4 flex flex-col gap-12" ref={metaRef}>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">Role</p>
                                <p className="text-base tracking-wide md:text-lg">{project.role}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">Year</p>
                                <p className="text-base tracking-wide md:text-lg">{project.year}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-black/50 mb-3">Stack</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.frameworks.map((f) => (
                                        <span key={f.id} className="text-xs uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full">
                                            {f.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {project.href && (
                                <div className="mt-4">
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-xs uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-500 cursor-none group"
                                    >
                                        Visit Live Site
                                        <Icon
                                            icon="ph:arrow-up-right-light"
                                            className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                        />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Right Content Column */}
                        <div className="lg:col-span-8 lg:pl-10" ref={bodyRef}>
                            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight mb-12">
                                {project.description}
                            </p>
                            <div className="h-px w-full bg-black/10 mb-12" />
                            <p className="text-sm md:text-base font-light leading-relaxed tracking-wide text-black/70 max-w-3xl">
                                {project.fullDescription}
                            </p>
                        </div>
                    </div>

                    {/* Challenge */}
                    {project.challenge && (
                        <div className="mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-8 border-t border-black/10 pt-16">
                            <div className="lg:col-span-4">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-light">The Challenge</p>
                            </div>
                            <div className="lg:col-span-8 lg:pl-10">
                                <p className="text-xl md:text-2xl font-light leading-relaxed tracking-wide text-black/80">
                                    {project.challenge}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Process */}
                    {project.process && project.process.length > 0 && (
                        <div className="mt-24 md:mt-32">
                            <div className="flex items-center gap-4 mb-12 border-t border-black/10 pt-16">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-light">Process</p>
                                <div className="flex-1 h-px bg-black/10" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
                                {project.process.map((p) => (
                                    <div key={p.step} className="bg-[#e5e5e0] p-8 md:p-10 flex flex-col gap-4">
                                        <span className="text-[10px] uppercase tracking-[0.35em] text-black/30 font-light tabular-nums">{p.step}</span>
                                        <h3 className="text-lg md:text-xl font-light tracking-tight text-black">{p.title}</h3>
                                        <p className="text-sm font-light leading-relaxed text-black/60">{p.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Outcomes */}
                    {project.outcomes && project.outcomes.length > 0 && (
                        <div className="mt-24 md:mt-32 border-t border-black/10 pt-16">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-light mb-12">Outcomes</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/10">
                                {project.outcomes.map((o, i) => (
                                    <div key={i} className="bg-[#e5e5e0] p-8 md:p-10 flex flex-col gap-2">
                                        <span className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-black leading-none">{o.metric}</span>
                                        <span className="text-[10px] uppercase tracking-[0.25em] text-black/50 font-light">{o.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Next/Prev Navigation Footer */}
                <div className="border-t border-black/10 mt-12 py-16 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                        {prevProject ? (
                            <button
                                onClick={() => navigateWithCurtain(prevProject.slug)}
                                className="flex flex-col items-start gap-2 group cursor-none w-1/2"
                            >
                                <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors duration-500 flex items-center gap-1">
                                    <Icon icon="ph:arrow-left-light" className="w-[1.2em] h-[1.2em]" /> Previous Project
                                </span>
                                <span className="text-2xl md:text-4xl font-light group-hover:translate-x-2 transition-transform duration-500 truncate w-full text-left">
                                    {prevProject.name}
                                </span>
                            </button>
                        ) : (
                            <div className="w-1/2" />
                        )}
                        {nextProject ? (
                            <button
                                onClick={() => navigateWithCurtain(nextProject.slug)}
                                className="flex flex-col items-end gap-2 group cursor-none w-1/2 text-right"
                            >
                                <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors duration-500 flex items-center gap-1 justify-end">
                                    Next Project <Icon icon="ph:arrow-right-light" className="w-[1.2em] h-[1.2em]" />
                                </span>
                                <span className="text-2xl md:text-4xl font-light group-hover:-translate-x-2 transition-transform duration-500 truncate w-full text-right">
                                    {nextProject.name}
                                </span>
                            </button>
                        ) : (
                            <div className="w-1/2" />
                        )}
                    </div>
                </div>
            </main>
        </Transition>
    );
};

export default ProjectDetail;
