import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export const AnimatedTextLines = ({ text, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  // Collapse all lines into a single string for mobile (natural wrapping)
  const singleLine = lines.map((l) => l.trim()).join(" ");

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {/* Desktop: preserve manual line breaks for editorial control */}
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="hidden md:block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
      {/* Mobile: single flowing block — browser wraps naturally */}
      <span
        ref={(el) => (lineRefs.current[lines.length] = el)}
        className="block md:hidden leading-relaxed tracking-wide text-balance"
      >
        {singleLine}
      </span>
    </div>
  );
};
