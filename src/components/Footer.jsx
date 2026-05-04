import { Link } from "react-scroll";
import { Icon } from "@iconify/react";
import { socialImgs } from "../constants";


const navLinks = [
  { label: "Home", to: "home" },
  { label: "Services", to: "services" },
  { label: "About", to: "about" },
  { label: "Work", to: "work" },
  { label: "Contact", to: "contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white border-t border-white/[0.06]">
      {/* Main footer body */}
      <div className="px-10 md:px-14 pt-16 pb-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Brand + tagline */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/20 font-light">Aditya Pranav</p>
          <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight text-white/80 max-w-[20ch]">
            Building things worth noticing.
          </p>
          <a
            href="mailto:adityapranav014@gmail.com"
            className="group mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300"
          >
            Start a project
            <Icon icon="ph:arrow-up-right-light" className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/20 font-light mb-2">Index</p>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={1800}
              offset={0}
              className="text-sm font-light tracking-wide text-white/40 hover:text-white transition-colors duration-300 cursor-pointer w-fit"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/20 font-light mb-2">Connect</p>
          <div className="flex flex-col gap-3">
            {socialImgs.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group text-sm font-light tracking-wide text-white/40 hover:text-white transition-colors duration-300 w-fit capitalize"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-10 md:px-14 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/20 font-light">
          © {year} Aditya Pranav
        </span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/10 font-light">
          Designed & developed with care
        </span>
      </div>
    </footer>
  );
};

export default Footer;
