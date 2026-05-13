import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  title,
  text,
  textColor,
  withScrollTrigger = false,
  headingTag: Tag = "h2",
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(contextRef.current, { y: 0 });
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      return;
    }
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
          trigger: contextRef.current,
        }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);
  return (
    <header className="relative w-full" ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-[clamp(1.5rem,3dvh,3rem)] pt-[clamp(2rem,6dvh,4rem)]"
        >
          <div className="pl-[clamp(1.5rem,5vw,6rem)] pr-6 sm:pr-[clamp(1rem,12vw,8rem)] md:pr-[clamp(1rem,15vw,8rem)]">
            <Tag
              className={`flex flex-col gap-1 banner-text-responsive md:block pb-[clamp(0.5rem,2dvh,1.5rem)] ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index} className="inline-block relative">
                  {part}
                  {/* Append animated icon after the very last letter of the title */}
                  {index === titleParts.length - 1 && (
                    <span className="inline-flex items-center justify-center align-middle ml-2 md:ml-5 text-accent translate-y-[-0.15em] origin-center">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-[0.7em] h-[0.7em] animate-[spin_8s_linear_infinite]"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
                      </svg>
                    </span>
                  )}
                  {index < titleParts.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </Tag>
          </div>
        </div>
      </div>
      <div className={`relative px-6 sm:px-[clamp(1.5rem,5vw,6rem)] md:px-[clamp(1.5rem,5vw,6rem)] ${textColor}`}>
        <div className="py-[clamp(1.5rem,4dvh,4rem)] text-left md:text-end overflow-hidden max-w-[min(100%,40rem)] md:max-w-none md:ml-auto">
          <AnimatedTextLines
            text={text}
            className={`font-light value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </header>
  );
};

export default AnimatedHeaderSection;
