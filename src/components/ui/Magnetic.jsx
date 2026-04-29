import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Magnetic - A wrapper component that adds a magnetic attraction effect to its children.
 * Perfect for buttons, icons, and navigation links.
 */
const Magnetic = ({ children, strength = 0.5 }) => {
  const magnetic = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const currentMagnetic = magnetic.current;
    if (currentMagnetic && typeof currentMagnetic.addEventListener === 'function') {
      currentMagnetic.addEventListener("mousemove", handleMouseMove);
      currentMagnetic.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentMagnetic && typeof currentMagnetic.removeEventListener === 'function') {
        currentMagnetic.removeEventListener("mousemove", handleMouseMove);
        currentMagnetic.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [strength]);

  return (
    <div ref={magnetic} className="inline-flex items-center justify-center align-middle">
      {children}
    </div>
  );
};

export default Magnetic;
