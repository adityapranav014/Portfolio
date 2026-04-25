import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Transition — a full-screen black curtain that wipes in then out.
 * Wrap any page with this component; it plays the reveal on mount.
 * For exit transitions, call the exported `playExit(onComplete)` ref method
 * via a forwarded ref from the parent router.
 */
const Transition = ({ children }) => {
    const curtainRef = useRef(null);

    useGSAP(() => {
        // Page enter: curtain wipes upward to reveal content
        gsap.fromTo(
            curtainRef.current,
            { yPercent: 0 },
            {
                yPercent: -100,
                duration: 0.9,
                ease: "expo.inOut",
                delay: 0.05,
            }
        );
    }, []);

    return (
        <div className="relative">
            {/* Curtain overlay */}
            <div
                ref={curtainRef}
                className="fixed inset-0 z-[9990] bg-black pointer-events-none"
                aria-hidden="true"
            />
            {children}
        </div>
    );
};

export default Transition;
