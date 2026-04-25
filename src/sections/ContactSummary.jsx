import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Typewriter from "../components/Typewriter";
import { Link } from "react-scroll";

const ContactSummary = () => {
  const containerRef = useRef(null);
  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "contact us",
    "contact us",
    "contact us",
    "contact us",
    "contact us",
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  }, []);
  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-dvh gap-12 mt-16"
    >
      <Marquee items={items} />
      <div className="flex flex-col items-center gap-10 font-light text-center contact-text-responsive px-6">
        <p className="leading-tight">
          Let&apos;s build something
          <br />
          <Typewriter
            texts={[
              "memorable.",
              "that converts.",
              "worth noticing.",
              "unforgettable.",
              "that scales.",
            ]}
            speed={65}
            deleteSpeed={35}
            waitTime={1800}
            className="text-gold italic"
            cursorChar="_"
          />
        </p>

        {/* CTA — matches Hero button */}
        <Link
          to="contact"
          smooth
          duration={1800}
          offset={0}
          className="group relative flex items-center gap-3 bg-DarkLava text-primary px-7 py-3.5 overflow-hidden cursor-pointer select-none"
        >
          <span className="relative z-10 text-[10px] uppercase tracking-[0.22em] font-light transition-colors duration-500">
            Begin a Conversation
          </span>
          <span className="relative z-10 text-sm transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          {/* accent sweep */}
          <span className="absolute inset-0 bg-accent translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
        </Link>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
