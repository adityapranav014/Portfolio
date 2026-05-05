import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import Magnetic from "../components/ui/Magnetic";

const DEFAULT_IMG = "https://ik.imagekit.io/gglxgr4rz/Portfolio/aditya-pranav.png";
const HOVER_IMG = "https://ik.imagekit.io/gglxgr4rz/Portfolio/aditya-pranav.com.jpeg";

const whenItems = [
  {
    label: (
      <>
        Climbing mountains <Icon icon="ph:arrow-right-light" className="inline-block mx-1.5 w-4 h-4 text-white/30 group-hover:text-accent/60 transition-colors duration-300 -translate-y-[1px]" /> because the hardest paths often lead to the clearest perspectives
      </>
    ),
    icon: <Icon icon="ph:mountains-light" className="w-5 h-5" />,
  },
  {
    label: (
      <>
        Getting lost in music <Icon icon="ph:arrow-right-light" className="inline-block mx-1.5 w-4 h-4 text-white/30 group-hover:text-accent/60 transition-colors duration-300 -translate-y-[1px]" /> because inspiration often strikes between the notes
      </>
    ),
    icon: <Icon icon="ph:music-notes-light" className="w-5 h-5" />,
  },
  {
    label: (
      <>
        Writing about what I learn <Icon icon="ph:arrow-right-light" className="inline-block mx-1.5 w-4 h-4 text-white/30 group-hover:text-accent/60 transition-colors duration-300 -translate-y-[1px]" /> because clarity of thought is a craft too
      </>
    ),
    icon: <Icon icon="ph:pencil-simple-line-light" className="w-5 h-5" />,
  },
  {
    label: (
      <>
        Reverse-engineering what I admire <Icon icon="ph:arrow-right-light" className="inline-block mx-1.5 w-4 h-4 text-white/30 group-hover:text-accent/60 transition-colors duration-300 -translate-y-[1px]" /> rebuilding it better
      </>
    ),
    icon: <Icon icon="ph:terminal-window-light" className="w-5 h-5" />,
  },
];

const About = () => {
  const text = `The combination of my passion for design, code & interaction 
    puts me in a unique place in the web world. I care deeply
    about quality, and it shows in every project.`;
  const imgRef = useRef(null);
  const introRef = useRef(null);
  const labelRef = useRef(null);
  const itemRefs = useRef([]);
  const sectionBandRef = useRef(null);
  const aboutTitleRef = useRef(null);

  useGSAP(() => {
    // Header index band
    gsap.from(sectionBandRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionBandRef.current, start: "top 90%" },
    });
    // About title clip reveal
    gsap.from(aboutTitleRef.current, {
      yPercent: 110,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: aboutTitleRef.current, start: "top 95%" },
    });
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });

    // Intro paragraph
    gsap.from(introRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: introRef.current },
    });

    // "When I'm not shipping" label
    gsap.from(labelRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: labelRef.current },
    });

    // Icon list items
    if (itemRefs.current.length) {
      gsap.from(itemRefs.current, {
        x: -32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: labelRef.current },
      });
    }
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      {/* ── SECTION HEADER: Watermark split ────────────── */}
      <div className="pt-[clamp(3rem,8dvh,6rem)] relative">
        {/* Rule + index band */}
        <div
          ref={sectionBandRef}
          className="flex items-center justify-between px-5 sm:px-10 pb-5 border-b border-white/[0.12]"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-light tracking-[0.35em] text-white/30 tabular-nums">03</span>
            <span className="w-8 h-px bg-white/15 shrink-0" />
            <span className="text-[10px] font-light tracking-[0.28em] text-white/20 uppercase">The person</span>
          </div>
          <p className="hidden md:block font-light text-[11px] tracking-wider text-white/25 max-w-[32ch] text-right leading-relaxed">
            Passion for design, code &amp; interaction. Quality that shows in every project.
          </p>
        </div>
        {/* Display title + ghost watermark numeral */}
        <div className="relative px-5 sm:px-10 pt-10 pb-12 overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute top-0 right-4 font-light leading-none tracking-tighter text-white/[0.045] select-none pointer-events-none"
            style={{ fontSize: "clamp(5rem, 22vw, 20rem)" }}
          >
            03
          </span>
          <div className="overflow-hidden relative z-10">
            <h2
              ref={aboutTitleRef}
              className="banner-text-responsive font-light leading-[0.95] tracking-tighter text-white"
            >
              About
            </h2>
          </div>
          <p className="hidden lg:block font-light italic text-white/25 text-sm mt-4 max-w-[26ch] text-right ml-auto leading-relaxed relative z-10">
            Always exploring,<br />always building.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-16 px-5 sm:px-10 pb-16 lg:flex-row">
        {/* Photo — Premium subtle crossfade with scale */}
        <div
          ref={imgRef}
          className="group w-full max-w-md rounded-3xl overflow-hidden shrink-0 relative cursor-pointer bg-black/20 tap-highlight-transparent"
        >
          {/* Default image (visible before hover) */}
          <img
            src={DEFAULT_IMG}
            alt="Aditya Pranav, Creative Technologist"
            className="w-full h-auto block transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:opacity-0 md:group-hover:scale-[1.03] active:opacity-0 active:scale-[1.03]"
            draggable={false}
          />
          {/* Hover image */}
          <img
            src={HOVER_IMG}
            alt="Aditya Pranav, Creative Technologist Hover"
            className="absolute inset-0 w-full h-full object-cover opacity-0 scale-[1.08] transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:opacity-100 md:group-hover:scale-100 active:opacity-100 active:scale-100"
            draggable={false}
          />
          {/* Subtle dimming overlay to add depth on hover */}
          <div className="absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:opacity-100 active:opacity-100 pointer-events-none" />
        </div>

        {/* Text block */}
        <div className="w-full flex flex-col gap-10">
          {/* Intro paragraph */}
          <p
            ref={introRef}
            className="text-xl font-light leading-relaxed tracking-wide text-white/60 md:text-2xl lg:text-3xl text-pretty"
          >
            I started building for the web at 16, obsessed with the gap between
            a design that looked good and one that{" "}
            <em className="text-white/90 not-italic">felt inevitable</em>. That obsession
            hasn't left. Today I work at the intersection of performance
            engineering and interface craft: writing code that's fast enough
            for real users, and considered enough for the people who care about
            the details.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* When I'm not shipping */}
          <div>
            <span
              ref={labelRef}
              className="block text-[10px] uppercase tracking-[0.35em] text-[#cfa355] mb-6 font-light"
            >
              When I&apos;m not shipping
            </span>

            <ul className="flex flex-col gap-5">
              {whenItems.map((item, i) => (
                <li
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="group flex items-center gap-4"
                >
                  {/* Icon pill */}
                  <Magnetic strength={0.2}>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.04] text-white/40 shrink-0 group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300">
                      {item.icon}
                    </span>
                  </Magnetic>
                  <span className="text-base font-light leading-relaxed tracking-wide text-white/50 md:text-lg lg:text-xl group-hover:text-white/80 transition-colors duration-300">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
