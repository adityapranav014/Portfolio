import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [mountVideo, setMountVideo] = useState(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMountVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.01 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mountVideo) return;
    video.muted = true;
    video.play().catch(() => { });
  }, [mountVideo]);

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
        ref={sectionRef}
        id="services"
        className="bg-black overflow-hidden w-full aspect-video"
      >
        {mountVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-contain block"
          >
            <source
              src="https://ik.imagekit.io/gglxgr4rz/Portfolio/services.mp4?updatedAt=1777985379412"
              type="video/mp4"
            />
          </video>
        ) : (
          <div className="w-full h-full min-h-[200px] bg-black" aria-hidden="true" />
        )}
      </section>
    </div>
  );
};

export default Services;
