import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socialImgs } from "../constants";
import gsap from "gsap";
import { VideoHover } from "../components/ui/image-reveal";

const Contact = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [hasCopiedPhone, setHasCopiedPhone] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("adityapranav014@gmail.com");
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+916200284805");
    setHasCopiedPhone(true);
    setTimeout(() => setHasCopiedPhone(false), 2000);
  };
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
              } catch { /* play() may fail silently */ }
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
          <VideoHover className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[45%] max-w-[1360px] block z-30 mb-10 md:mb-0 aspect-[1360/480]">
            <video
              ref={videoRef}
              src={videoSrc || undefined}
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none"
            />
          </VideoHover>

          <div className="flex flex-col w-full gap-10 relative z-20 md:pr-[45%] lg:pr-[35%]">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex items-center gap-3">
                <a
                  href="mailto:adityapranav014@gmail.com"
                  aria-label="Send email to Aditya Pranav"
                  className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/70 transition-colors duration-300"
                >
                  adityapranav014@gmail.com
                </a>
                <button
                  onClick={handleCopy}
                  className="group/copy relative flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all duration-300 active:scale-90 shrink-0"
                  title={hasCopied ? "Copied!" : "Copy email"}
                  aria-label="Copy email address"
                >
                  {hasCopied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover/copy:text-white transition-colors duration-300">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex items-center gap-3">
                <a
                  href="tel:+916200284805"
                  aria-label="Call Aditya Pranav"
                  className="text-xl lowercase md:text-2xl lg:text-3xl hover:text-white/70 transition-colors duration-300"
                >
                  +91 62002 84805
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="group/copy relative flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all duration-300 active:scale-90 shrink-0"
                  title={hasCopiedPhone ? "Copied!" : "Copy phone number"}
                  aria-label="Copy phone number"
                >
                  {hasCopiedPhone ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover/copy:text-white transition-colors duration-300">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="social-link">
              <h2>Connect</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {socialImgs.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name} profile`}
                    className="text-xs leading-loose tracking-widest uppercase md:text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {social.name}
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
