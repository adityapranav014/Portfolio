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
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to("#title-service-1", {
        xPercent: 20,
        scrollTrigger: { trigger: "#title-service-1", scrub: true },
      });
      gsap.to("#title-service-2", {
        xPercent: -30,
        scrollTrigger: { trigger: "#title-service-2", scrub: true },
      });
      gsap.to("#title-service-3", {
        xPercent: 60,
        scrollTrigger: { trigger: "#title-service-3", scrub: true },
      });
      gsap.to("#title-service-4", {
        xPercent: -60,
        scrollTrigger: { trigger: "#title-service-4", scrub: true },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.to("#title-service-1", {
        xPercent: 8,
        scrollTrigger: { trigger: "#title-service-1", scrub: true },
      });
      gsap.to("#title-service-2", {
        xPercent: -10,
        scrollTrigger: { trigger: "#title-service-2", scrub: true },
      });
      gsap.to("#title-service-3", {
        xPercent: 8,
        scrollTrigger: { trigger: "#title-service-3", scrub: true },
      });
      gsap.to("#title-service-4", {
        xPercent: -10,
        scrollTrigger: { trigger: "#title-service-4", scrub: true },
      });
    });
  });

  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42">
      {/* Discipline index list — editorial typographic treatment */}
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 px-10 mb-16 text-xs uppercase tracking-[0.25em] text-black/40">
        {disciplines.map(({ index, label }) => (
          <span key={index} className="flex items-center gap-2">
            <span className="text-[10px] text-black/25">{index}</span>
            <span>{label}</span>
          </span>
        ))}
      </div>

      {/* Scrubbing display rows */}
      <div className="contact-text-responsive">
        <div id="title-service-1">
          <p>Architecture</p>
        </div>
        <div
          id="title-service-2"
          className="flex items-center justify-center gap-3 translate-x-4 md:translate-x-16"
        >
          <p className="font-normal">Development</p>
          <div className="w-10 h-1 md:w-32 bg-accent" />
          <p>Deployment</p>
        </div>
        <div
          id="title-service-3"
          className="flex items-center justify-center gap-3 -translate-x-8 md:-translate-x-48"
        >
          <p>APIs</p>
          <div className="w-10 h-1 md:w-32 bg-accent" />
          <p className="italic">Frontends</p>
          <div className="w-10 h-1 md:w-32 bg-accent" />
          <p>Scalability</p>
        </div>
        <div id="title-service-4" className="translate-x-8 md:translate-x-48">
          <p>Databases</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;
