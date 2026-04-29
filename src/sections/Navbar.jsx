import { useEffect, useRef, useState } from "react";
import { socialImgs } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import { Icon } from "@iconify/react";
import Magnetic from "../components/ui/Magnetic";

const navLinks = [
  { label: "Home", to: "home" },
  { label: "Services", to: "services" },
  { label: "About", to: "about" },
  { label: "Work", to: "work" },
  { label: "Contact", to: "contact" },
];

const Navbar = () => {
  const navRef = useRef(null);
  const backdropRef = useRef(null);
  const linkRowRefs = useRef([]);
  const footerRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    // Initial states
    gsap.set(navRef.current, {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    });
    gsap.set(backdropRef.current, { autoAlpha: 0 });
    gsap.set(linkRowRefs.current, { autoAlpha: 0, x: 80, skewX: -4 });
    gsap.set(footerRef.current, { autoAlpha: 0, y: 40 });

    // Main open/close timeline
    tl.current = gsap
      .timeline({ paused: true })
      // Backdrop fade
      .to(
        backdropRef.current,
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        0
      )
      // Panel curtain reveal
      .to(
        navRef.current,
        {
          clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power4.inOut",
        },
        0
      )
      // Staggered link rows
      .to(
        linkRowRefs.current,
        {
          autoAlpha: 1,
          x: 0,
          skewX: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: "power3.out",
        },
        0.35
      )
      // Footer info
      .to(
        footerRef.current,
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.55
      );

    // Burger → X morph
    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        { rotate: -45, y: -3.3, duration: 0.3, ease: "power2.inOut" },
        "<"
      );
  }, []);

  // Scroll-hide burger
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setShowBurger(y <= lastScrollY || y < 10);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    tl.current.reverse();
    iconTl.current.reverse();
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={closeMenu}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />

      {/* Side panel */}
      <nav
        ref={navRef}
        id="main-nav"
        aria-label="Site navigation"
        className="fixed inset-y-0 right-0 z-50 flex flex-col w-full md:w-[55%] lg:w-[45%] bg-[#0a0a0a]"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Navigation links */}
        <div className="flex flex-col justify-center flex-1 px-8 md:px-14 lg:px-20">
          {navLinks.map((link, index) => (
            <div
              key={link.to}
              ref={(el) => (linkRowRefs.current[index] = el)}
              className="group relative"
            >
              <Magnetic strength={0.2}>
                <Link
                  className="relative flex items-center md:items-baseline gap-4 md:gap-6 py-[clamp(0.7rem,2.2vh,1.4rem)] cursor-pointer"
                  to={link.to}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={closeMenu}
                >
                  {/* Index number */}
                  <span className="text-[10px] md:text-xs font-light tracking-[0.3em] text-white/25 tabular-nums transition-colors duration-300 group-hover:text-accent min-w-[1.5rem] md:min-w-[2.5rem]">
                    0{index + 1}
                  </span>

                  {/* Link label */}
                  <span className="relative text-[clamp(2rem,5.5vh,4.5rem)] uppercase font-light tracking-tight text-white/70 transition-all duration-500 group-hover:text-white group-hover:tracking-wide">
                    {link.label}
                    {/* Underline reveal on hover */}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
                  </span>

                  {/* Arrow indicator */}
                  <span className="ml-auto text-[clamp(0.7rem,1.2vh,1rem)] text-white/0 group-hover:text-white/40 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0 flex items-center">
                    <Icon
                      icon="ph:arrow-right-light"
                      className="w-[1.2em] h-[1.2em]"
                    />
                  </span>
                </Link>
              </Magnetic>

              {/* Divider */}
              <div className="h-px bg-white/[0.06] transition-colors duration-300 group-hover:bg-white/[0.12]" />
            </div>
          ))}
        </div>

        {/* Footer info section */}
        <div ref={footerRef} className="px-8 pb-8 md:px-14 lg:px-20">
          {/* Separator line */}
          <div className="h-px w-full bg-white/[0.06] mb-6" />

          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end">
            {/* Availability */}
            <div className="flex flex-col gap-2.5">
              <p className="text-[11px] md:text-sm uppercase tracking-[0.4em] text-white/30 font-light">
                Availability
              </p>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <p className="text-[12px] md:text-sm tracking-[0.15em] uppercase text-green-400/80 font-light whitespace-nowrap">
                  Open to work • May 2026
                </p>
              </div>
            </div>

            {/* Social connect */}
            <div className="flex flex-col gap-2.5 mt-6 md:mt-0">
              <p className="text-[11px] md:text-sm uppercase tracking-[0.4em] text-white/30 font-light">
                Connect
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {socialImgs.map((social, index) => (
                  <Magnetic key={index} strength={0.3}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${social.name} profile`}
                      className="text-[12px] md:text-sm tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {social.name}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Burger / Close button */}
      <Magnetic strength={0.4}>
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="main-nav"
          className={`group fixed z-[60] flex flex-col items-center justify-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full cursor-pointer w-12 h-12 md:w-16 md:h-16 top-5 right-[clamp(1.5rem,5vw,3rem)] ${
            isOpen
              ? "bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-sm"
              : "bg-black/80 hover:bg-black backdrop-blur-sm hover:scale-105 active:scale-95 ring-1 ring-white/[0.06] hover:ring-white/[0.12]"
          }`}
          onClick={toggleMenu}
          style={
            showBurger || isOpen
              ? { clipPath: "circle(50% at 50% 50%)" }
              : { clipPath: "circle(0% at 50% 50%)" }
          }
        >
          <span
            ref={topLineRef}
            className="block w-5 md:w-6 h-[1.5px] bg-white rounded-full origin-center transition-all duration-300"
          />
          <span
            ref={bottomLineRef}
            className="block w-5 md:w-6 h-[1.5px] bg-white rounded-full origin-center transition-all duration-300"
          />
        </button>
      </Magnetic>
    </>
  );
};

export default Navbar;

