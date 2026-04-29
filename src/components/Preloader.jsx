import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Preloader - award-worthy cinematic entrance.
 *
 * Layout:
 *  - Top bar:   "AP" monogram (left)  |  "2026" (right)
 *  - Center:    Massive percentage counter (the primary focus)
 *  - Sub-label: "Loading portfolio of Aditya Pranav" slides up below counter
 *  - Bottom:    Thin horizontal progress line
 *
 * Timeline:
 *  0.0s  Top-bar labels fade in
 *  0.2s  Counter clip-reveal: starts at 0, counts to 100 over ~2.2s
 *  0.3s  Sub-label slides up from clip
 *  0.4s  Progress line fills left → right in sync with counter
 *  ~2.6s Brief hold - all content fades
 *  ~3.0s Two-panel split exit: top half rises, bottom half drops (expo.inOut)
 *  ~4.0s onComplete fires → parent unmounts
 */
const Preloader = ({ onComplete }) => {
    const topPanelRef = useRef(null);
    const btmPanelRef = useRef(null);
    const contentRef = useRef(null);
    const counterRef = useRef(null);
    const pctRef = useRef(null);
    const lineRef = useRef(null);
    const topBarRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        const obj = { val: 0 };

        const tl = gsap.timeline({ onComplete });

        // 0 - initial states
        gsap.set([topBarRef.current, labelRef.current], { opacity: 0, y: 12 });
        gsap.set(counterRef.current, { opacity: 0, y: 40 });

        // 1 - top bar fades in
        tl.to(topBarRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);

        // 2 - counter rises in
        tl.to(counterRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.15);

        // 3 - sub-label slides up
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.3);

        // 4 - count 0 → 100
        tl.to(
            obj,
            {
                val: 100,
                duration: 2.2,
                ease: "power1.inOut",
                onUpdate() {
                    const v = Math.round(obj.val);
                    if (pctRef.current)
                        pctRef.current.textContent = String(v).padStart(2, "0");
                    if (lineRef.current)
                        lineRef.current.style.transform = `scaleX(${v / 100})`;
                },
            },
            0.25
        );

        // 5 - hold at 100
        tl.to({}, { duration: 0.25 });

        // 6 - content fades out
        tl.to(contentRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
        });

        // 7 - two-panel split exit
        tl.to(
            topPanelRef.current,
            { yPercent: -100, duration: 1.1, ease: "expo.inOut" },
            "-=0.1"
        );
        tl.to(
            btmPanelRef.current,
            { yPercent: 100, duration: 1.1, ease: "expo.inOut" },
            "<"
        );

        return () => tl.kill();
    }, [onComplete]);

    return (
        <>
            {/* Top half panel */}
            <div
                ref={topPanelRef}
                className="fixed inset-x-0 top-0 h-1/2 z-[9999] bg-black"
                aria-hidden="true"
            />
            {/* Bottom half panel */}
            <div
                ref={btmPanelRef}
                className="fixed inset-x-0 bottom-0 h-1/2 z-[9999] bg-black"
                aria-hidden="true"
            />

            {/* Content layer - sits on top of both panels */}
            <div
                ref={contentRef}
                className="fixed inset-0 z-[10000] flex flex-col justify-between px-8 py-8 md:px-14 md:py-10 pointer-events-none select-none"
                aria-hidden="true"
            >
                {/* Top bar */}
                <div ref={topBarRef} className="flex justify-between items-center">
                    <span className="text-xs font-black tracking-[0.08em] text-white uppercase">
                        AP
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-light">
                        2026
                    </span>
                </div>

                {/* Center - percentage counter */}
                <div className="flex flex-col items-center gap-4">
                    <div ref={counterRef} className="relative flex items-end leading-none">
                        <span
                            ref={pctRef}
                            className="font-black tabular-nums text-white"
                            style={{ fontSize: "clamp(7rem, 22vw, 22rem)", letterSpacing: "-0.04em" }}
                        >
                            00
                        </span>
                        <span
                            className="font-light text-white/40 mb-[1.5vw]"
                            style={{ fontSize: "clamp(1.5rem, 4vw, 5rem)" }}
                        >
                            %
                        </span>
                    </div>

                    {/* Sub-label */}
                    <p
                        ref={labelRef}
                        className="text-[9px] md:text-[10px] uppercase tracking-[0.45em] text-white/35 font-light text-center"
                    >
                        Loading portfolio of&nbsp;Aditya&nbsp;Pranav
                    </p>
                </div>

                {/* Bottom - progress line */}
                <div className="flex flex-col gap-3">
                    <div className="relative h-px w-full overflow-hidden bg-white/10">
                        <div
                            ref={lineRef}
                            className="absolute inset-0 bg-white origin-left"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Preloader;
