import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";

/**
 * ScrollUI — Scroll progress bar + back-to-top button.
 *
 * Must be rendered inside <ReactLenis root> so useLenis() has context.
 * Both elements are position:fixed and sit above all other content.
 */
const ScrollUI = () => {
    const barRef = useRef(null);
    const btnRef = useRef(null);
    const isVisible = useRef(false);
    const lenisRef = useRef(null);

    useLenis((lenis) => {
        lenisRef.current = lenis;
        const progress = lenis.progress ?? 0;

        // Sync bar width via scaleX (GPU-accelerated, no layout thrash)
        if (barRef.current) {
            gsap.set(barRef.current, { scaleX: progress });
        }

        // Toggle button visibility when past 12 % of page
        const shouldShow = progress > 0.12;
        if (shouldShow !== isVisible.current) {
            isVisible.current = shouldShow;
            gsap.to(btnRef.current, {
                autoAlpha: shouldShow ? 1 : 0,
                y: shouldShow ? 0 : 18,
                duration: 0.55,
                ease: shouldShow ? "power3.out" : "power2.in",
            });
        }
    });

    const scrollToTop = () => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, {
                duration: 1.8,
                easing: (t) => 1 - Math.pow(1 - t, 5),
            });
        }
    };

    return (
        <>
            {/* ── Scroll Progress Bar ────────────────────────────── */}
            {/*
        Track: barely-there warm tint so the fill reads clearly.
        Fill: accent-blue → gold gradient matching the site palette.
      */}
            <div
                className="fixed top-0 left-0 w-full z-[9999] pointer-events-none"
                style={{ height: "2px", background: "rgba(57,54,50,0.18)" }}
            >
                <div
                    ref={barRef}
                    className="h-full w-full origin-left"
                    style={{
                        background:
                            "linear-gradient(90deg, #4da3ff 0%, #4da3ff 55%, #cfa355 100%)",
                        transform: "scaleX(0)",
                    }}
                />
            </div>

            {/* ── Back-to-Top Button ─────────────────────────────── */}
            {/*
        Starts invisible (GSAP autoAlpha:0 + CSS invisible).
        DarkLava fill → accent-blue on hover; thin cream border at rest.
        The arrow nudges up on hover for a subtle kinetic hint.
      */}
            <button
                ref={btnRef}
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="
          fixed bottom-8 right-8 z-[9999]
          group flex items-center justify-center
          w-11 h-11 rounded-full
          bg-[#393632] border border-[rgba(229,229,224,0.15)]
          text-[#e5e5e0]
          hover:bg-[#4da3ff] hover:border-transparent
          transition-colors duration-300 ease-out
          opacity-0 invisible
        "
                style={{ willChange: "transform, opacity" }}
            >
                {/* Upward arrow */}
                <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                >
                    <path
                        d="M6.5 11V2M6.5 2L2 6.5M6.5 2L11 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </>
    );
};

export default ScrollUI;
