import Marquee from "../components/Marquee";
import Typewriter from "../components/Typewriter";
import { Link } from "react-scroll";
import { Icon } from "@iconify/react";

const ContactSummary = () => {
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

  return (
    <section
      className="flex flex-col items-center justify-center gap-20 md:justify-between min-h-[60dvh] md:min-h-dvh md:gap-12 mt-16 bg-[#e5e5e0] relative z-20 w-full"
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

        <Link
          to="contact"
          smooth
          duration={1800}
          offset={0}
          className="group relative flex items-center gap-3 bg-DarkLava text-primary px-7 py-3.5 overflow-hidden cursor-pointer select-none"
        >
          <span className="relative z-10 text-[10px] uppercase tracking-[0.22em] font-light transition-colors duration-500">
            Start a project
          </span>
          <span className="relative z-10 text-sm transition-transform duration-300 group-hover:translate-x-1 flex items-center">
            <Icon icon="ph:arrow-right-light" className="w-[1.2em] h-[1.2em]" />
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
