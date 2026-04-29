import { useRef } from "react";
import UseAnimations from "react-useanimations";
import star from "react-useanimations/lib/star";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
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
          <div className={`flex items-center gap-3 pl-[clamp(1.5rem,5vw,6rem)] pr-[clamp(6rem,15vw,8rem)] ${textColor}`}>
            <UseAnimations animation={star} size={24} strokeColor="currentColor" autoplay={true} loop={true} />
            <p
              className="text-[clamp(0.6rem,1.2dvh,0.875rem)] font-light tracking-[0.5rem] uppercase pt-0.5"
            >
              {subTitle}
            </p>
          </div>
          <div className="pl-[clamp(1.5rem,5vw,6rem)] pr-[clamp(6rem,15vw,8rem)]">
            <Tag
              className={`flex flex-col gap-[clamp(1rem,2.5dvh,3rem)] uppercase banner-text-responsive md:block pb-[clamp(0.5rem,2dvh,1.5rem)] ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </Tag>
          </div>
        </div>
      </div>
      <div className={`relative px-6 md:px-[clamp(1.5rem,5vw,6rem)] ${textColor}`}>
        <div className="py-[clamp(1.5rem,4dvh,4rem)] text-left md:text-end overflow-hidden">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </header>
  );
};

export default AnimatedHeaderSection;
