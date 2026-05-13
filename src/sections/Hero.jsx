import { useRef, useEffect, useState } from "react";
import { Link } from "react-scroll";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CanvasLines } from "../components/ui/canvas";
import Magnetic from "../components/ui/Magnetic";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import HeroMarquee from "../components/HeroMarquee";

const HERO_VIDEO_URL = "https://ik.imagekit.io/gglxgr4rz/Portfolio/hero.mp4";
const HERO_POSTER_URL = `${HERO_VIDEO_URL}/ik-thumbnail.jpg`;

function LocatedCard({ className = "" }) {
  const [dotLottie, setDotLottie] = useState(null);
  const playCount = useRef(1);

  useEffect(() => {
    if (dotLottie) {
      const onComplete = () => {
        if (playCount.current < 2) {
          playCount.current += 1;
          dotLottie.setFrame(0);
          dotLottie.play();
        }
      };
      dotLottie.addEventListener("complete", onComplete);
      return () => {
        dotLottie.removeEventListener("complete", onComplete);
      };
    }
  }, [dotLottie]);

  return (
    <div
      className={`flex w-fit shrink-0 items-center justify-between gap-4 rounded-full bg-[#1c1d20] py-2.5 text-white shadow-[0_16px_48px_rgba(0,0,0,0.35)] md:gap-8 pl-5 pr-2.5 md:pl-[clamp(1.5rem,5vw,4rem)] md:pr-4 md:py-[1.125rem] md:rounded-l-none md:rounded-r-full ${className}`}
    >
      <p className="min-w-0 text-left text-[14px] font-medium leading-[1.2] text-white md:text-[16px] md:leading-[1.3]">
        <span className="block inline md:block">Located </span>
        <span className="block inline md:block">in </span>
        <span className="block inline md:block">India</span>
      </p>
      <div
        className="relative ml-2 flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-transparent md:ml-3 md:h-12 md:w-12"
        aria-hidden="true"
      >
        <div className="flex h-full w-full items-center justify-center">
          <DotLottieReact
            dotLottieRefCallback={setDotLottie}
            src="https://lottie.host/f287a05d-7b5d-4212-8ef5-17578888d005/VJ2vFPHVeX.lottie"
            loop={false}
            autoplay
            speed={0.5}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}

function RoleTagline({ className = "", centered = false }) {
  return (
    <div
      className={`relative flex flex-col text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] ${centered ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <Icon
        icon="ph:arrow-down-right-light"
        className={`${centered ? "mb-2 md:absolute md:-top-24 md:left-1/2 md:-translate-x-1/2" : "absolute -top-16 -left-2 md:-top-24 md:-left-4"} text-2xl text-white md:text-4xl`}
        aria-hidden="true"
      />
      <div className="font-montserrat">
        <p className="text-[24px] font-normal leading-[1.2] tracking-wide text-white md:text-[36px]">
          Freelance
          <br />
          Designer & Developer
        </p>
      </div>
    </div>
  );
}

const Hero = () => {
  const mediaRef = useRef(null);
  const floatsRef = useRef(null);
  const marqueeRef = useRef(null);
  const ctaRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const targets = [
      floatsRef.current,
      ctaRef.current,
      marqueeRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 36 });
    if (mediaRef.current) gsap.set(mediaRef.current, { scale: 1.08 });

    const onAnimate = () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (mediaRef.current) {
        tl.to(
          mediaRef.current,
          { scale: 1, duration: 2.4, ease: "power3.out" },
          0
        );
      }

      tl.to(floatsRef.current, { opacity: 1, y: 0, duration: 1 }, 0.05);
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.95 }, 0.15);
      tl.to(marqueeRef.current, { opacity: 1, y: 0, duration: 1 }, 0.28);
    };

    if (window.isPreloaderDone) {
      gsap.delayedCall(0.4, onAnimate);
    } else {
      let fired = false;
      const handle = () => {
        fired = true;
        onAnimate();
      };
      window.addEventListener("hero:animate", handle, { once: true });
      const fallback = setTimeout(() => {
        if (!fired) onAnimate();
      }, 4000);
      return () => {
        window.removeEventListener("hero:animate", handle);
        clearTimeout(fallback);
      };
    }
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-dvh overflow-hidden font-montserrat"
    >
      {/* Full-bleed hero video (original cinematic background) */}
      {prefersReducedMotion ? (
        <img
          ref={mediaRef}
          src={HERO_POSTER_URL}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 -z-50 h-full w-full object-cover"
          aria-hidden
        />
      ) : (
        <video
          ref={mediaRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={HERO_POSTER_URL}
          fetchPriority="high"
          className="absolute inset-0 -z-50 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {/* Scrims — readability over video */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      <div className="pointer-events-none absolute inset-0 -z-39 bg-gradient-to-r from-black/55 via-black/18 to-black/25 md:from-black/40 md:via-black/12 md:to-black/35" />
      <div
        className="pointer-events-none absolute inset-0 -z-38 bg-[radial-gradient(ellipse_90%_70%_at_50%_85%,rgba(0,0,0,0.55)_0%,transparent_55%)]"
        aria-hidden
      />

      {/* Cursor trail — monochrome ribbons over the hero (desktop pointer only) */}
      <CanvasLines />

      <div
        ref={floatsRef}
        className="pointer-events-none absolute inset-0 z-20 hidden md:block"
      >
        <div className="relative min-h-dvh w-full">
          <div className="absolute left-0 top-[calc(50%+1.25rem)] z-20 -translate-y-1/2 md:pointer-events-auto">
            {/* Extended black background to break out of the max-w container on ultra-wide screens */}
            <div className="hidden md:block absolute top-0 bottom-0 right-full w-[50vw] bg-[#1c1d20]" aria-hidden />
            <LocatedCard className="hidden md:flex rounded-l-none" />
          </div>
          <div className="absolute right-5 md:right-[clamp(1.5rem,5vw,4rem)] top-[calc(50%+1.25rem)] z-20 -translate-y-1/2 md:pointer-events-auto">
            <RoleTagline />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-dvh w-full flex-col px-5 pb-6 pt-6 md:px-[clamp(1.5rem,5vw,4rem)] md:pt-[clamp(2rem,5vh,3rem)] md:pb-10">

        {/* Top Header Navigation */}
        <div ref={ctaRef} className="relative z-30 flex justify-between items-center w-full text-white font-montserrat h-12 md:h-16">
          <div className="text-[16px] md:text-[18px] font-medium">
            © Aditya Pranav
          </div>
          <div className="hidden md:flex gap-8 text-[16px] md:text-[18px] font-medium relative z-50 items-center">
            {["Services", "About", "Work", "Contact"].map((item) => (
              <Magnetic strength={0.3} key={item}>
                <Link
                  to={item.toLowerCase()}
                  smooth
                  className="group relative cursor-pointer block px-2 py-1"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </Link>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="mb-10 mt-16 flex flex-col items-center gap-6 md:mb-0 md:hidden">
          <LocatedCard className="" />
          <RoleTagline centered />
        </div>

        {/* Vertical rhythm: video fills the frame; reserve space so CTAs sit above the marquee */}
        <div
          className="relative flex-1"
          aria-hidden
        />

        <div
          ref={marqueeRef}
          className="relative z-30 mb-0 w-screen left-1/2 -translate-x-1/2"
        >
          <HeroMarquee reducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
