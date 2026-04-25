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
        <div className="sticky top-0 flex h-screen items-center gap-10 px-8 lg:gap-20 lg:px-20">

          {/* LEFT — portrait, desktop only; stays pinned for full 500vh */}
          <div
            ref={imgRef}
            className="hidden lg:block w-2/5 max-w-md flex-shrink-0 rounded-3xl overflow-hidden"
          >
            <Image
              src="/Portfolio/aditya-pranav.com.jpeg"
              alt="Aditya Pranav — Full-Stack Developer & Creative Technologist"
              width={420}
              className="w-full h-auto"
            />
          </div>

          {/* RIGHT — word-by-word reveal, controlled by the parent scroll */}
          <TextRevealByWord
            text={aboutText}
            progress={scrollYProgress}
            className="w-full lg:w-3/5"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
