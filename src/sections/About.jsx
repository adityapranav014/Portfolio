import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Image } from "@imagekit/react";
import { Icon } from "@iconify/react";
import Magnetic from "../components/ui/Magnetic";

const whenItems = [
  {
    label: "Open-sourcing my latest experiment (or hacking on yours)",
    icon: <Icon icon="ph:terminal-window-light" className="w-5 h-5" />,
  },
  {
    label: "Teaching devs, because rising tides lift all ships",
    icon: <Icon icon="ph:chalkboard-teacher-light" className="w-5 h-5" />,
  },
  {
    label: "Rock climbing, problem-solving with real stakes",
    icon: <Icon icon="ph:mountains-light" className="w-5 h-5" />,
  },
  {
    label: "Strumming chords while CI pipelines pass",
    icon: <Icon icon="ph:guitar-light" className="w-5 h-5" />,
  },
];

const About = () => {
  const text = `Passionate about clean architecture, I build scalable,
    high-performance solutions from 
    prototype to production`;
  const imgRef = useRef(null);
  const introRef = useRef(null);
  const labelRef = useRef(null);
  const itemRefs = useRef([]);

  useGSAP(() => {
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
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 lg:flex-row">
        {/* Photo */}
        <div ref={imgRef} className="w-full max-w-md rounded-3xl overflow-hidden shrink-0">
          <Image
            src="/Portfolio/aditya-pranav.com.jpeg"
            alt="Aditya Pranav, Creative Technologist"
            width={420}
            className="w-full h-auto"
          />
        </div>

        {/* Text block */}
        <div className="w-full flex flex-col gap-10">
          {/* Intro paragraph */}
          <p
            ref={introRef}
            className="text-xl font-light leading-relaxed tracking-wide text-white/60 md:text-2xl lg:text-3xl text-pretty"
          >
            Obsessed with building fast, intuitive apps from pixel-perfect UIs
            to bulletproof serverless backends. Every line of code is a promise:{" "}
            <em className="text-white/90 not-italic">quality that users feel.</em>
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
                  className="group flex items-start gap-4"
                >
                  {/* Icon pill — size matches one line-height so it sits flush with the first text line */}
                  <Magnetic strength={0.2}>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.04] text-white/40 shrink-0 self-start translate-y-[0.15em] group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300">
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
