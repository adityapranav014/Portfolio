import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Got a project idea or want to collaborate?
    Let's talk and build something 
    worth noticing.`;
  const items = [
    "TURN YOUR IDEAS INTO REALITY",
    "TURN YOUR IDEAS INTO REALITY",
    "TURN YOUR IDEAS INTO REALITY",
    "TURN YOUR IDEAS INTO REALITY",
    "TURN YOUR IDEAS INTO REALITY",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("");
  const videoUrl = "https://ik.imagekit.io/gglxgr4rz/Portfolio/lets-talk.mp4";

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoSrc(videoUrl);
            if (videoRef.current) {
              try {
                videoRef.current.load();
                videoRef.current.play().catch(() => { });
              } catch (e) { }
            }
            obs.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-dvh bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div
          className="relative px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10"
          ref={containerRef}
        >
          <div className="relative md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[45%] max-w-[1360px] block overflow-hidden z-30 mb-10 md:mb-0 aspect-[1360/480]">
            <video
              ref={videoRef}
              src={videoSrc || undefined}
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          <div className="flex flex-col w-full gap-10 relative z-20 md:pr-[45%] lg:pr-[35%]">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="mailto:hello@adityapranav.dev"
                aria-label="Send email to Aditya Pranav"
                className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/70 transition-colors duration-300"
              >
                hello@adityapranav.dev
              </a>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="tel:+910000000000"
                aria-label="Call Aditya Pranav"
                className="text-xl lowercase md:text-2xl lg:text-3xl hover:text-white/70 transition-colors duration-300"
              >
                +91 00000 00000
              </a>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name} profile`}
                    className="text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
