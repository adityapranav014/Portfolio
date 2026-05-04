/**
 * Footer - minimal, editorial footer with year and copyright.
 * Follows the design language of the rest of the site.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white/40 py-6 px-10 md:px-14">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] uppercase tracking-[0.35em] font-light text-center md:text-left">
        <span>© {year} Aditya Pranav</span>
        <span className="text-white/20">Designed & Developed with care</span>
      </div>
    </footer>
  );
};

export default Footer;
