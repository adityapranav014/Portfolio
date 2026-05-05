import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => { });
  }, []);

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
        className="bg-black overflow-hidden w-full aspect-video"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain block"
        >
          <source
            src="https://ik.imagekit.io/gglxgr4rz/Portfolio/services.mp4?updatedAt=1777985379412"
            type="video/mp4"
          />
        </video>
      </section>
    </div>
  );
};

export default Services;
