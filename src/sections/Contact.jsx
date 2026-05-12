import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";
import { socialImgs } from "../constants";
import gsap from "gsap";
import { VideoHover } from "../components/ui/image-reveal";
import { Icon } from "@iconify/react";
import Magnetic from "../components/ui/Magnetic";
import Tooltip from "../components/ui/Tooltip";

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
const contactBandRef = useRef(null);
  const contactTitleRef = useRef(null);
  useGSAP(() => {
    // Header index band
    gsap.from(contactBandRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: contactBandRef.current, start: "top 90%" },
    });
    // Contact title clip reveal
    gsap.from(contactTitleRef.current, {
      yPercent: 110,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: contactTitleRef.current, start: "top 95%" },
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl.from(".contact-video", {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    }).from(
      ".social-link",
      {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.2)",
      },
      "-=1"
    );
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
        {/* ── SECTION HEADER: Two-line indented statement ──── */}
        <div className="pt-[clamp(3rem,8dvh,6rem)]">
          {/* Rule + index band */}
          <div
            ref={contactBandRef}
            className="flex items-center justify-between px-5 sm:px-10 pb-5 border-b border-white/[0.12]"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-light tracking-[0.35em] text-white/30 tabular-nums">05</span>
              <span className="w-8 h-px bg-white/15 shrink-0" />
              <span className="text-[10px] font-light tracking-[0.28em] text-white/20 uppercase">Let&apos;s talk</span>
            </div>
            <p className="hidden md:block font-light text-[11px] tracking-wider text-white/25 max-w-[30ch] text-right leading-relaxed">
              Available for new projects — from anywhere in the world.
            </p>
          </div>
          {/* Two-line indented display title */}
          <div className="px-5 sm:px-10 pt-10 pb-12 overflow-hidden">
            <p
              ref={contactTitleRef}
              className="banner-text-responsive font-light leading-[0.92] tracking-tighter text-white"
            >
              Let&apos;s
              <br />
              <span className="pl-[0.3em] md:pl-[0.5em]">work together.</span>
            </p>
          </div>
        </div>
        <div
          className="relative px-5 sm:px-10 font-light text-white lg:text-[32px] text-[20px] sm:text-[26px] leading-none mb-10"
          ref={containerRef}
        >
          <VideoHover className="contact-video md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[45%] max-w-[1360px] block z-30 mb-10 md:mb-0 aspect-[1360/480]">
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
                  className="text-[13px] tracking-normal sm:tracking-widest sm:text-xl lowercase md:text-2xl lg:text-3xl hover:text-white/70 transition-colors duration-300 break-all sm:break-normal"
                >
                  adityapranav014@gmail.com
                </a>
                <Magnetic strength={0.4}>
                  <Tooltip text={hasCopied ? "Copied!" : "Copy email"}>
                    <button
                      onClick={handleCopy}
                      className="group/copy relative flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all duration-300 active:scale-90 shrink-0"
                      aria-label="Copy email address"
                    >
                      {hasCopied ? (
                        <Icon icon="ph:check-light" className="w-4 h-4 text-[#4ade80]" />
                      ) : (
                        <Icon icon="ph:copy-light" className="w-4 h-4 text-white/50 group-hover/copy:text-white transition-colors duration-300" />
                      )}
                    </button>
                  </Tooltip>
                </Magnetic>
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
                <Magnetic strength={0.4}>
                  <Tooltip text={hasCopiedPhone ? "Copied!" : "Copy phone number"}>
                    <button
                      onClick={handleCopyPhone}
                      className="group/copy relative flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all duration-300 active:scale-90 shrink-0"
                      aria-label="Copy phone number"
                    >
                      {hasCopiedPhone ? (
                        <Icon icon="ph:check-light" className="w-4 h-4 text-[#4ade80]" />
                      ) : (
                        <Icon icon="ph:copy-light" className="w-4 h-4 text-white/50 group-hover/copy:text-white transition-colors duration-300" />
                      )}
                    </button>
                  </Tooltip>
                </Magnetic>
              </div>
            </div>
            <div className="social-link">
              <h2>Connect</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {socialImgs.map((social, index) => (
                  <Magnetic key={index} strength={0.3}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${social.name} profile`}
                      className="text-xs leading-loose tracking-widest md:text-sm text-white/60 hover:text-accent transition-colors duration-300"
                    >
                      {social.name}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
