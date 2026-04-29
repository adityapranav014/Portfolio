import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { projects } from "../constants";
import Transition from "../components/Transition";
import { Icon } from "@iconify/react/dist/iconify.js";
import UseAnimations from "react-useanimations";
import arrowUp from "react-useanimations/lib/arrowUp";

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.slug === slug);

    const headerRef = useRef(null);
    const metaRef = useRef(null);
    const bodyRef = useRef(null);
    const imgRef = useRef(null);
    const imgOverlayRef = useRef(null);

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
        const curtain = document.createElement("div");
        curtain.style.cssText = "position:fixed;inset:0;background:#000;z-index:9990;transform:translateY(100%)";
        document.body.appendChild(curtain);
        gsap.to(curtain, {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.inOut",
            onComplete: () => {
                navigate(`/work/${targetSlug}`);
                document.body.removeChild(curtain);
                window.scrollTo(0, 0);
            },
        });
    };

    const goHome = () => {
        const curtain = document.createElement("div");
        curtain.style.cssText = "position:fixed;inset:0;background:#000;z-index:9990;transform:translateY(100%)";
        document.body.appendChild(curtain);
        gsap.to(curtain, {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.inOut",
            onComplete: () => {
                navigate("/");
                document.body.removeChild(curtain);
                window.scrollTo(0, 0);
            },
        });
    };

    return (
        <Transition>
            <div className="min-h-screen bg-primary font-amiamie overflow-x-hidden text-black selection:bg-black selection:text-white">
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
                                        <div className="size-4 sm:size-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 rotate-45">
                                            <UseAnimations animation={arrowUp} size={20} strokeColor="currentColor" autoplay={true} loop={true} />
                                        </div>
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
            </div>
        </Transition>
    );
};

export default ProjectDetail;
