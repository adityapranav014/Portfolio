import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const labelRef = useRef(null);

    // Don't mount the cursor on touch / coarse-pointer devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;

        // Use xPercent/yPercent for centering — these are additive with GSAP
        // so they don't conflict with CSS translate classes
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

        const moveXDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
        const moveYDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
        const moveXRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
        const moveYRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

        const onMove = (e) => {
            moveXDot(e.clientX);
            moveYDot(e.clientY);
            moveXRing(e.clientX);
            moveYRing(e.clientY);
        };

        const onEnterLink = (e) => {
            const label = e.currentTarget.dataset.cursorLabel;
            const targetScale = label ? 3 : 1.8;
            gsap.to(ring, { scale: targetScale, duration: 0.4, ease: "power2.out" });
            gsap.to(dot, { scale: 0, duration: 0.2 });
            if (label && labelRef.current) {
                // Exit difference blend → solid DarkLava pill so label is
                // readable on BOTH the light (cream) and dark (black) sections.
                gsap.set(ring, { mixBlendMode: "normal" });
                gsap.to(ring, {
                    backgroundColor: "#393632",
                    borderColor: "transparent",
                    duration: 0.25,
                    ease: "power2.out",
                });
                labelRef.current.style.color = "#e5e5e0"; // --color-primary
                labelRef.current.textContent = label;
                gsap.to(labelRef.current, { opacity: 1, duration: 0.25, delay: 0.15 });
            }
        };

        const onLeaveLink = () => {
            gsap.to(ring, { scale: 1, duration: 0.4, ease: "power2.out" });
            gsap.to(dot, { scale: 1, duration: 0.2 });
            if (labelRef.current) {
                gsap.to(labelRef.current, {
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        if (labelRef.current) labelRef.current.textContent = "";
                        // Restore difference blend after label is fully hidden
                        gsap.set(ring, {
                            backgroundColor: "transparent",
                            borderColor: "white",
                            mixBlendMode: "difference",
                        });
                    },
                });
            }
        };

        const attach = () => {
            document
                .querySelectorAll("a, button, [data-cursor], [role='button']")
                .forEach((el) => {
                    el.style.cursor = "none";
                    el.removeEventListener("mouseenter", onEnterLink);
                    el.removeEventListener("mouseleave", onLeaveLink);
                    el.addEventListener("mouseenter", onEnterLink);
                    el.addEventListener("mouseleave", onLeaveLink);
                });
        };

        window.addEventListener("mousemove", onMove);
        attach();

        const observer = new MutationObserver(attach);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{ willChange: "transform", mixBlendMode: "difference" }}
            >
                <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center w-10 h-10 rounded-full border border-white"
                style={{ willChange: "transform", mixBlendMode: "difference" }}
            >
                <span
                    ref={labelRef}
                    className="text-[9px] uppercase tracking-[0.18em] text-white font-light opacity-0 select-none whitespace-nowrap leading-none"
                />
            </div>
        </>
    );
};

export default Cursor;
