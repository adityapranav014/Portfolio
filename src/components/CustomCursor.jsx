import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * CustomCursor - A smooth, magnetic dot cursor with label support.
 * Shows a small dot by default, expands to show "View" on [data-cursor-label] elements.
 * Hidden on touch devices.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      isTouch.current = true;
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Smooth follow for dot (tight)
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "none" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "none" });

    // Smooth follow for ring (laggy/elastic)
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "expo.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "expo.out" });

    const handleMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleEnter = (e) => {
      const target = e.target.closest("[data-cursor-label]");
      if (target) {
        const text = target.getAttribute("data-cursor-label") || "View";
        label.textContent = text;
        
        // Expand ring
        gsap.to(ring, {
          width: 80,
          height: 80,
          duration: 0.5,
          ease: "elastic.out(1, 0.75)",
          backgroundColor: "rgba(207, 163, 85, 0.9)", // Solar Gold
          borderColor: "rgba(207, 163, 85, 0)",
        });
        
        // Hide dot
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(label, { autoAlpha: 1, duration: 0.2 });
      }
    };

    const handleLeave = (e) => {
      const target = e.target.closest("[data-cursor-label]");
      if (target) {
        gsap.to(ring, {
          width: 40,
          height: 40,
          duration: 0.5,
          ease: "power2.out",
          backgroundColor: "transparent",
          borderColor: "rgba(207, 163, 85, 0.5)",
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      }
    };

    document.body.style.cursor = "none";
    const styleSheet = document.createElement("style");
    styleSheet.id = "custom-cursor-styles";
    styleSheet.textContent = `
      a, button, [role="button"], input, textarea, select, [data-cursor-label], .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleSheet);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    const handleWindowLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };
    const handleWindowEnter = () => {
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
    };
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
    <>
      {/* Lagging Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full flex items-center justify-center border border-accent/50"
        style={{
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
          willChange: "transform, width, height",
        }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-medium uppercase tracking-[0.2em] text-white opacity-0 pointer-events-none select-none"
        >
          View
        </span>
      </div>

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent"
        style={{
          width: 6,
          height: 6,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
};


export default CustomCursor;
