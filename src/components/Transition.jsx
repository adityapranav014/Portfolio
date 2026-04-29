import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Transition - A high-end staggered panel transition.
 * Wipes out from the center to reveal content.
 */
const Transition = ({ children }) => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useGSAP(() => {
    gsap.to(panelsRef.current, {
      yPercent: -100,
      duration: 0.8,
      stagger: {
        amount: 0.3,
        from: "center",
      },
      ease: "power4.inOut",
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative">
      <div className="fixed inset-0 z-[9990] flex pointer-events-none" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            className="h-full flex-1 bg-black"
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default Transition;

