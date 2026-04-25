"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * TextRevealByWord
 *
 * Two modes:
 * 1. Standalone  – no `progress` prop. Renders its own h-[500vh] scroll
 *    container with a sticky inner panel.
 * 2. Controlled  – `progress` MotionValue passed from a parent scroll driver.
 *    Renders only the <p> so the parent can embed it inside its own sticky
 *    layout (e.g. next to a sticky image).
 */
const TextRevealByWord = ({ text, className, progress: externalProgress }) => {
    const targetRef = useRef(null);

    const { scrollYProgress: internalProgress } = useScroll({
        // When controlled externally, skip tracking (target stays null).
        target: externalProgress ? undefined : targetRef,
        offset: ["start start", "end end"],
    });

    const progress = externalProgress ?? internalProgress;
    const words = text.split(" ");

    // Reveal completes at REVEAL_END (65 %) of the scroll range — leaves a
    // generous fully-lit pause before Lenis smooth-scroll exits the section.
    const REVEAL_END = 0.65;
    const wordList = words.map((word, i) => {
        const start = (i / words.length) * REVEAL_END;
        const end = start + REVEAL_END / words.length;
        return (
            <Word key={i} progress={progress} range={[start, end]}>
                {word}
            </Word>
        );
    });

    // Controlled mode – just the paragraph, no scroll wrapper.
    if (externalProgress) {
        return (
            <p
                className={cn(
                    "flex flex-wrap font-light leading-relaxed text-white/20 text-lg md:text-xl lg:text-2xl",
                    className
                )}
            >
                {wordList}
            </p>
        );
    }

    // Standalone mode – owns its own scroll container.
    return (
        <div ref={targetRef} className={cn("relative z-0 h-[600vh]", className)}>
            <div className="sticky top-0 flex h-screen w-full items-center bg-transparent px-6 py-16">
                <p className="flex flex-wrap font-light leading-relaxed text-white/20 text-lg md:text-xl lg:text-2xl">
                    {wordList}
                </p>
            </div>
        </div>
    );
};

const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{ opacity }} className="text-white">
                {children}
            </motion.span>
        </span>
    );
};

export { TextRevealByWord };
