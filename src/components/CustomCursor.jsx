import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * CustomCursor — A smooth, magnetic dot cursor with label support.
 * Shows a small dot by default, expands to show "View" on [data-cursor-label] elements.
 * Hidden on touch devices.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      isTouch.current = true;
      return;
    }

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    // Smooth follow with quickTo
    const xTo = gsap.quickTo(dot, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.6, ease: "power3.out" });

    const handleMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleEnter = (e) => {
      const target = e.target.closest("[data-cursor-label]");
      if (target) {
        const text = target.getAttribute("data-cursor-label") || "View";
        label.textContent = text;
        gsap.to(dot, {
          width: 80,
          height: 80,
          duration: 0.35,
          ease: "power2.out",
          backgroundColor: "rgba(77, 163, 255, 0.9)",
        });
        gsap.to(label, { autoAlpha: 1, duration: 0.2 });
      }
    };

    const handleLeave = (e) => {
      const target = e.target.closest("[data-cursor-label]");
      if (target) {
        gsap.to(dot, {
          width: 12,
          height: 12,
          duration: 0.35,
          ease: "power2.out",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      }
    };

    // Hide default cursor
    document.body.style.cursor = "none";

    // Links and buttons get pointer cursor hidden too
    const styleSheet = document.createElement("style");
    styleSheet.id = "custom-cursor-styles";
    styleSheet.textContent = `
      a, button, [role="button"], input, textarea, select, [data-cursor-label] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleSheet);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    // Hide cursor when leaving window
    const handleWindowLeave = () => gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
    const handleWindowEnter = () => gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
    document.addEventListener("mouseleave", handleWindowLeave);
    document.addEventListener("mouseenter", handleWindowEnter);

    return () => {
      document.body.style.cursor = "";
      const s = document.getElementById("custom-cursor-styles");
      if (s) s.remove();
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
      document.removeEventListener("mouseleave", handleWindowLeave);
      document.removeEventListener("mouseenter", handleWindowEnter);
    };
  }, []);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full flex items-center justify-center mix-blend-difference"
      style={{
        width: 12,
        height: 12,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        transform: "translate(-50%, -50%)",
        willChange: "transform, width, height",
      }}
    >
      <span
        ref={labelRef}
        className="text-[9px] font-light uppercase tracking-[0.2em] text-white opacity-0 pointer-events-none select-none whitespace-nowrap"
      >
        View
      </span>
    </div>
  );
};

export default CustomCursor;
