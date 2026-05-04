import { useRef } from "react";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
const Services = () => {
  const serviceRefs = useRef([]);
  const headerBandRef = useRef(null);
  const titleClipRef = useRef(null);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    // Header index band slides up
    gsap.from(headerBandRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: headerBandRef.current, start: "top 90%" },
    });
    // Title clip reveal from below
    gsap.from(titleClipRef.current, {
      yPercent: 110,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: titleClipRef.current, start: "top 95%" },
    });
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
  return (
    <section id="services" className="min-h-dvh bg-black rounded-t-4xl">
      {/* ── SECTION HEADER: Editorial index-grid layout ────── */}
      <div className="pt-[clamp(3rem,8dvh,6rem)]">
        {/* Rule + index band */}
        <div
          ref={headerBandRef}
          className="flex items-center justify-between px-5 sm:px-10 pb-5 border-b border-white/[0.12]"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-light tracking-[0.35em] text-white/30 tabular-nums">02</span>
            <span className="w-8 h-px bg-white/15 shrink-0" />
            <span className="text-[10px] font-light tracking-[0.28em] text-white/20 uppercase">Capabilities</span>
          </div>
          <p className="hidden md:block font-light text-[11px] tracking-wider text-white/25 max-w-[32ch] text-right leading-relaxed">
            Clean, performant solutions — no fluff, just work that lasts and scales.
          </p>
        </div>
        {/* Title row: display heading left + service category tags right */}
        <div className="flex items-end justify-between gap-8 px-5 sm:px-10 pt-10 pb-12">
          <div className="overflow-hidden">
            <h2
              ref={titleClipRef}
              className="banner-text-responsive font-light leading-[0.95] tracking-tighter text-white"
            >
              What I build
            </h2>
          </div>
          <ul className="hidden lg:flex flex-col items-end gap-1.5 pb-2 shrink-0">
            {["Full-Stack Dev", "Cloud & DevOps", "Security", "Mobile"].map((s, i) => (
              <li
                key={i}
                className={`text-[10px] font-light tracking-[0.28em] uppercase ${i === 0 ? "text-accent/70" : "text-white/20"
                  }`}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-5 sm:px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30 group/card transition-colors duration-500 hover:border-accent"
          style={
            isDesktop
              ? {
                top: `calc(10vh + ${index * 5}em)`,
                marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
              }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl group-hover/card:text-accent transition-colors duration-300">{service.title}</h2>
                <div className="flex items-center gap-4">
                  {service.icon && (
                    <Icon
                      icon={service.icon}
                      className="w-8 h-8 md:w-10 md:h-10 text-white/15 group-hover/card:text-accent/50 transition-colors duration-500 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-xs tracking-widest uppercase text-white/20 group-hover/card:text-accent/60 transition-colors duration-300">
                    0{index + 1}
                  </span>
                </div>
              </div>
              <p className="text-base sm:text-xl leading-relaxed tracking-wide sm:tracking-widest lg:text-2xl text-white/60 text-pretty normal-case">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex items-center gap-4">
                      <span className="mr-8 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      <span>{item.title}</span>
                      <span className="text-base text-white/30 font-light ml-2 hidden lg:block">
                        {item.description}
                      </span>
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/20 group-hover/card:bg-accent/20 transition-colors duration-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Accent bottom line reveal on hover */}
          <div className="mt-8 h-px w-0 group-hover/card:w-full bg-accent transition-all duration-700 ease-out" />
        </div>
      ))}
    </section>
  );
};

export default Services;
