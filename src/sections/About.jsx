import { useRef } from "react";
import { useScroll } from "framer-motion";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Image } from "@imagekit/react";
import { TextRevealByWord } from "../components/ui/text-reveal";

const About = () => {
  const text = `Engineering precision meets design sensibility
    I build products that perform under pressure
    and feel effortless to use`;
  const aboutText = `I've spent the last several years at the intersection of engineering rigour and product thinking — shipping full-stack applications where every decision, from schema design to scroll animation, serves a purpose. My work spans e-commerce platforms handling real transaction volume, cloud-native APIs built to survive traffic spikes, and interfaces crafted to make complex systems feel simple. Outside the terminal I study what makes digital experiences genuinely memorable — attending to the micro-moments most developers skip. That attention to detail is the gap between software that works and software that wins. Currently taking on select projects for brands ready to build something worth noticing.`;

  // One scroll driver for the whole reveal section.
  const scrollContainerRef = useRef(null);
  const imgRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  useGSAP(() => {
    // Section shrinks as the next section approaches.
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

    // Image wipes in when the scroll container enters the viewport.
    if (imgRef.current) {
      gsap.set(imgRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.to(imgRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power4.out",
        scrollTrigger: { trigger: scrollContainerRef.current },
      });
    }
  });

  return (
    <section id="about" className="bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {/*
        Single tall scroll container — drives both the sticky image and the
        word-reveal text.  h-[500vh] gives each of the ~80 words ~6vh of
        scroll room, so the reveal feels slow and cinematic.
      */}
      <div ref={scrollContainerRef} className="relative h-[600vh]">
        <div className="sticky top-0 flex flex-col lg:flex-row h-screen items-center justify-center gap-10 lg:gap-20 px-[clamp(1.5rem,5vw,6rem)]">

          {/* TOP/LEFT — portrait, responsive size; stays pinned for full 600vh */}
          <div
            ref={imgRef}
            className="w-[clamp(120px,40vw,350px)] lg:w-2/5 lg:max-w-md flex-shrink-0 rounded-2xl lg:rounded-3xl overflow-hidden mt-[clamp(2rem,10vh,4rem)] lg:mt-0"
          >
            <Image
              src="/Portfolio/aditya-pranav.com.jpeg"
              alt="Aditya Pranav — Full-Stack Developer & Creative Technologist"
              width={420}
              className="w-full h-auto"
            />
          </div>

          {/* RIGHT/BOTTOM — word-by-word reveal, controlled by the parent scroll */}
          <article className="w-full lg:w-3/5 text-center lg:text-left pb-[clamp(2rem,10vh,4rem)] lg:pb-0">
            <h3 className="sr-only">Professional Background</h3>
            <TextRevealByWord
              text={aboutText}
              progress={scrollYProgress}
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
