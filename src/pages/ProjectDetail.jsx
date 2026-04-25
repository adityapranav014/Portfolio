import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { projects } from "../constants";
import Transition from "../components/Transition";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Image } from "@imagekit/react";

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.slug === slug);

    const headerRef = useRef(null);
    const metaRef = useRef(null);
    const bodyRef = useRef(null);
    const imgRef = useRef(null);

    // Redirect to home if slug not found
    useEffect(() => {
        if (!project) navigate("/", { replace: true });
    }, [project, navigate]);

    useGSAP(() => {
        if (!project) return;
        const tl = gsap.timeline({ delay: 0.6 });
        tl.from(headerRef.current, { y: 60, opacity: 0, duration: 0.8, ease: "power3.out" })
            .from(metaRef.current, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
            .from(imgRef.current, { scale: 1.05, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.4")
            .from(bodyRef.current, { y: 40, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.5");
    }, [project]);

    if (!project) return null;

    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const prevProject = projects[currentIndex - 1] ?? null;
    const nextProject = projects[currentIndex + 1] ?? null;

    const navigateWithCurtain = (targetSlug) => {
        // Play exit curtain then navigate
        const curtain = document.createElement("div");
        curtain.style.cssText =
            "position:fixed;inset:0;background:#000;z-index:9990;transform:translateY(100%)";
        document.body.appendChild(curtain);
        gsap.to(curtain, {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.inOut",
            onComplete: () => {
                navigate(`/work/${targetSlug}`);
                document.body.removeChild(curtain);
            },
        });
    };

    const goHome = () => {
        const curtain = document.createElement("div");
        curtain.style.cssText =
            "position:fixed;inset:0;background:#000;z-index:9990;transform:translateY(100%)";
        document.body.appendChild(curtain);
        gsap.to(curtain, {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.inOut",
            onComplete: () => {
                navigate("/");
                document.body.removeChild(curtain);
            },
        });
    };

    return (
        <Transition>
            <div className="min-h-screen bg-primary font-amiamie overflow-x-hidden">
                {/* Back button */}
                <div className="fixed top-6 left-8 z-50">
                    <button
                        onClick={goHome}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-black/50 hover:text-black transition-colors duration-300 cursor-none"
                    >
                        <Icon icon="lucide:arrow-left" className="size-4" />
                        All Work
                    </button>
                </div>

                {/* Hero image — full width */}
                <div
                    ref={imgRef}
                    className="w-full h-[55vh] md:h-[70vh] overflow-hidden"
                >
                    <Image
                        src={project.bgImage}
                        alt={project.name}
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-8 md:px-16 py-16">
                    {/* Title */}
                    <h1
                        ref={headerRef}
                        className="text-5xl md:text-7xl lg:text-8xl uppercase font-light leading-none mb-8"
                    >
                        {project.name}
                    </h1>

                    {/* Meta row */}
                    <div
                        ref={metaRef}
                        className="flex flex-wrap items-start gap-x-12 gap-y-4 mb-16 pb-8 border-b border-black/20"
                    >
                        <div>
                            <p className="text-xs uppercase tracking-widest text-black/40 mb-1">Role</p>
                            <p className="text-sm tracking-wide">{project.role}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-black/40 mb-1">Year</p>
                            <p className="text-sm tracking-wide">{project.year}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-black/40 mb-1">Stack</p>
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                {project.frameworks.map((f) => (
                                    <span key={f.id} className="text-sm tracking-wide">
                                        {f.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {project.href && (
                            <div className="ml-auto">
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit ${project.name} live site`}
                                    className="flex items-center gap-2 text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-300 cursor-none"
                                >
                                    Visit Site
                                    <Icon icon="lucide:arrow-up-right" className="size-3" />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Project body */}
                    <div ref={bodyRef} className="grid md:grid-cols-2 gap-16 mb-24">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-black/40 mb-4">Overview</p>
                            <p className="text-lg md:text-xl font-light leading-relaxed tracking-wide text-black/70">
                                {project.description}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-black/40 mb-4">Details</p>
                            <p className="text-base md:text-lg font-light leading-relaxed tracking-wide text-black/60">
                                {project.fullDescription}
                            </p>
                        </div>
                    </div>

                    {/* Project image */}
                    <div className="w-full overflow-hidden rounded-2xl mb-24">
                        <Image
                            src={project.image}
                            alt={`${project.name} screenshot`}
                            width={1600}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Prev / Next navigation */}
                    <div className="flex justify-between items-center border-t border-black/20 pt-10">
                        {prevProject ? (
                            <button
                                onClick={() => navigateWithCurtain(prevProject.slug)}
                                className="flex flex-col items-start gap-1 group cursor-none"
                            >
                                <span className="text-xs uppercase tracking-widest text-black/40 group-hover:text-black transition-colors duration-300">
                                    ← Previous
                                </span>
                                <span className="text-xl md:text-2xl font-light group-hover:translate-x-1 transition-transform duration-300">
                                    {prevProject.name}
                                </span>
                            </button>
                        ) : (
                            <div />
                        )}
                        {nextProject ? (
                            <button
                                onClick={() => navigateWithCurtain(nextProject.slug)}
                                className="flex flex-col items-end gap-1 group cursor-none"
                            >
                                <span className="text-xs uppercase tracking-widest text-black/40 group-hover:text-black transition-colors duration-300">
                                    Next →
                                </span>
                                <span className="text-xl md:text-2xl font-light group-hover:-translate-x-1 transition-transform duration-300">
                                    {nextProject.name}
                                </span>
                            </button>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default ProjectDetail;
