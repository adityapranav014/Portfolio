import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const VIDEO_URL = "https://ik.imagekit.io/gglxgr4rz/Portfolio/services.mp4?updatedAt=1777985379412";

const Services = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(VIDEO_URL);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    video.muted = true;
    video.load();
    video.play().catch(() => { });
  }, [videoSrc]);

  useGSAP(() => {
    gsap.to("#services", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#services",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });
  });

  return (
    <div>
      <section
        id="services"
        ref={sectionRef}
        className="bg-black overflow-hidden w-full aspect-video"
      >
        <video
          ref={videoRef}
          src={videoSrc || undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-contain block"
        />
      </section>
    </div>
  );
};

export default Services;
