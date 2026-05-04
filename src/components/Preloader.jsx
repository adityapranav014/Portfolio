import { useRef, useEffect } from "react";
import gsap from "gsap";

const greetings = [
    "Hello",
    "Bonjour",
    "Ciao",
    "Olá",
    "こんにちは",
    "Hallå",
    "Guten Tag",
    "Hallo",
    "नमस्ते",
    "مرحبا",
    "你好",
];

const TOTAL = greetings.length;

const Preloader = ({ onComplete }) => {
    const topPanelRef = useRef(null);
    const btmPanelRef = useRef(null);
    const contentRef = useRef(null);
    const wordRef = useRef(null);
    const dotRef = useRef(null);
    const lineRef = useRef(null);
    const indexRef = useRef(null);
    const totalLblRef = useRef(null);

    useEffect(() => {
        const el = wordRef.current;
        const dot = dotRef.current;
        const line = lineRef.current;
        const idx = indexRef.current;
        const lbl = totalLblRef.current;
        const content = contentRef.current;
        const top = topPanelRef.current;
        const btm = btmPanelRef.current;

        // ── initial states ──────────────────────────────────────────────
        gsap.set([dot, idx, lbl], { opacity: 0, y: 8 });
        gsap.set(el, { opacity: 0 });
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({ onComplete });

        // ── chrome fades in ─────────────────────────────────────────────
        tl.to([dot, idx, lbl], { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.06 }, 0);

        // ── word reel ───────────────────────────────────────────────────
        greetings.forEach((word, i) => {
            const speed = Math.pow(0.80, i);          // each word ~20% faster
            const animIn = 0.40 * speed;
            const hold = 0.10 * speed;
            const animOut = 0.26 * speed;
            const progress = (i + 1) / TOTAL;

            tl.call(() => {
                el.textContent = word;
                idx.textContent = String(i + 1).padStart(2, "0");
            });

            // enter: clip up + scale snap + letter-spacing contract
            tl.set(el, { yPercent: 112, opacity: 1, scale: 0.88, filter: "blur(4px)", letterSpacing: "0.12em" });
            tl.to(el, {
                yPercent: 0,
                scale: 1,
                filter: "blur(0px)",
                letterSpacing: "0em",
                duration: animIn,
                ease: "expo.out",
            });

            // progress line in sync
            tl.to(line, { scaleX: progress, duration: animIn + hold, ease: "power1.out" }, "<");

            tl.to({}, { duration: hold });

            if (i < TOTAL - 1) {
                // exit: shoot up + blur out
                tl.to(el, {
                    yPercent: -112,
                    scale: 0.95,
                    filter: "blur(3px)",
                    duration: animOut,
                    ease: "expo.in",
                });
            }
        });

        // ── hold on last word ───────────────────────────────────────────
        tl.to({}, { duration: 0.45 });

        // ── fade content ────────────────────────────────────────────────
        tl.to(content, { opacity: 0, duration: 0.35, ease: "power2.in" });

        // ── two-panel split exit ─────────────────────────────────────────
        tl.to(top, { yPercent: -100, duration: 1.0, ease: "expo.inOut" }, "-=0.05");
        tl.to(btm, { yPercent: 100, duration: 1.0, ease: "expo.inOut" }, "<");

        return () => tl.kill();
    }, [onComplete]);

    return (
        <>
            {/* Split exit panels */}
            <div ref={topPanelRef} className="fixed inset-x-0 top-0 h-1/2 z-[10001] bg-[#0e0e0e]" aria-hidden="true" />
            <div ref={btmPanelRef} className="fixed inset-x-0 bottom-0 h-1/2 z-[10001] bg-[#0e0e0e]" aria-hidden="true" />

            {/* Content — sits above both panels */}
            <div
                ref={contentRef}
                className="fixed inset-0 z-[10002] flex flex-col justify-between px-8 py-9 md:px-14 md:py-11 pointer-events-none select-none"
                aria-hidden="true"
            >
                {/* Top row: label left | counter right */}
                <div className="flex justify-between items-end">
                    <span className="text-[9px] md:text-[10px] tracking-[0.55em] text-white/25 font-light uppercase">
                        greeting
                    </span>
                    <div className="flex items-baseline gap-1 tabular-nums">
                        <span ref={indexRef} className="text-[11px] md:text-[13px] text-white/60 font-light">01</span>
                        <span ref={totalLblRef} className="text-[9px] md:text-[10px] text-white/20 font-light">
                            / {String(TOTAL).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Center: bullet + massive word */}
                <div className="flex items-center gap-5 md:gap-7 -mt-6">
                    <span
                        ref={dotRef}
                        className="text-white/40 flex-shrink-0"
                        style={{ fontSize: "clamp(0.65rem, 1.2vw, 1rem)" }}
                    >
                        &#x2022;
                    </span>
                    {/* overflow-hidden acts as the clip mask for the word */}
                    <div style={{ overflow: "hidden", paddingTop: "0.35em", paddingBottom: "0.15em" }}>
                        <span
                            ref={wordRef}
                            className="block text-white"
                            style={{
                                fontSize: "clamp(4.5rem, 12vw, 11rem)",
                                fontWeight: 300,
                                lineHeight: 1.05,
                            }}
                        />
                    </div>
                </div>

                {/* Bottom: thin progress line */}
                <div className="relative h-px w-full bg-white/8">
                    <div
                        ref={lineRef}
                        className="absolute inset-0 bg-white/70"
                    />
                </div>
            </div>
        </>
    );
};

export default Preloader;
