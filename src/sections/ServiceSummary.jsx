import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  { index: "01", label: "Architecture" },
  { index: "02", label: "Development" },
  { index: "03", label: "Deployment" },
  { index: "04", label: "APIs" },
  { index: "05", label: "Frontends" },
  { index: "06", label: "Databases" },
];

const ServiceSummary = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(row1Ref.current, {
          xPercent: 12,
          scrollTrigger: { trigger: row1Ref.current, scrub: true },
        });
        gsap.to(row2Ref.current, {
          xPercent: -15,
          scrollTrigger: { trigger: row2Ref.current, scrub: true },
        });
        gsap.to(row3Ref.current, {
          xPercent: 18,
          scrollTrigger: { trigger: row3Ref.current, scrub: true },
        });
        gsap.to(row4Ref.current, {
          xPercent: -18,
          scrollTrigger: { trigger: row4Ref.current, scrub: true },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(row1Ref.current, {
          xPercent: 8,
          scrollTrigger: { trigger: row1Ref.current, scrub: true },
        });
        gsap.to(row2Ref.current, {
          xPercent: -10,
          scrollTrigger: { trigger: row2Ref.current, scrub: true },
        });
        gsap.to(row3Ref.current, {
          xPercent: 8,
          scrollTrigger: { trigger: row3Ref.current, scrub: true },
        });
        gsap.to(row4Ref.current, {
          xPercent: -10,
          scrollTrigger: { trigger: row4Ref.current, scrub: true },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="mt-20 overflow-hidden font-light leading-snug text-center mb-42"
    >
      {/* Discipline index list - editorial typographic treatment */}
      <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-10 gap-y-2 px-4 md:px-10 mb-16 text-[10px] md:text-xs uppercase tracking-[0.25em] text-black/40">
        {disciplines.map(({ index, label }) => (
          <span key={index} className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[10px] text-black/25">{index}</span>
            <span>{label}</span>
          </span>
        ))}
      </div>

      {/* Scrubbing display rows */}
      <div className="contact-text-responsive overflow-hidden">
        <div ref={row1Ref}>
          <p>Architecture</p>
        </div>
        <div
          ref={row2Ref}
          className="flex items-center justify-center gap-1.5 md:gap-3 translate-x-2 md:translate-x-8"
        >
          <p className="font-normal">Development</p>
          <div className="w-5 h-0.5 md:h-1 md:w-32 bg-accent" />
          <p>Deployment</p>
        </div>
        <div
          ref={row3Ref}
          className="flex items-center justify-center gap-1.5 md:gap-3 -translate-x-2 md:-translate-x-16"
        >
          <p>APIs</p>
          <div className="w-5 h-0.5 md:h-1 md:w-32 bg-accent" />
          <p className="italic">Frontends</p>
          <div className="w-5 h-0.5 md:h-1 md:w-32 bg-accent" />
          <p>Scalability</p>
        </div>
        <div ref={row4Ref} className="translate-x-1 md:translate-x-20">
          <p>Databases</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;

