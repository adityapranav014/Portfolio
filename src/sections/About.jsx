import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Image } from "@imagekit/react";

const About = () => {
  const text = `Engineering precision meets design sensibility
    I build products that perform under pressure
    and feel effortless to use`;
  const aboutText = `I've spent the last several years at the intersection of engineering rigour and product thinking—shipping full-stack applications where every decision, from schema design to scroll animation, serves a purpose.
My work spans e-commerce platforms handling real transaction volume, cloud-native APIs built to survive traffic spikes, and interfaces crafted to make complex systems feel simple.
Outside the terminal I study what makes digital experiences genuinely memorable—attending to the micro-moments most developers skip. That attention to detail is the gap between software that works and software that wins.
Currently taking on select projects for brands ready to build something worth noticing.`;
  const imgRef = useRef(null);
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
  });
  return (
    <section id="about" className="min-h-dvh bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <div ref={imgRef} className="w-md rounded-3xl overflow-hidden">
          <Image
            src="/Portfolio/aditya-pranav.com.jpeg"
            alt="Aditya Pranav — Full-Stack Developer & Creative Technologist"
            width={420}
            className="w-full h-auto"
          />
        </div>
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
