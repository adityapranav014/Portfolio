/**
 * Full-bleed bottom marquee — Dennis Snellenberg–style oversized name rail.
 */
const SEGMENT_COUNT = 10;

function NameSegments({ idPrefix = "a" }) {
  return (
    <>
      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
        <span
          key={`${idPrefix}-${i}`}
          className="inline-flex shrink-0 items-center px-[clamp(1.25rem,5vw,4rem)] font-montserrat text-[clamp(2.5rem,13vw,9.5rem)] font-semibold leading-[0.92] tracking-[0.045em] text-white [text-shadow:0_4px_48px_rgba(0,0,0,0.75),0_2px_12px_rgba(0,0,0,0.5)] md:tracking-[0.05em]"
        >
          Aditya Pranav
          <span className="select-none pl-[clamp(0.75rem,2.5vw,2rem)] text-white/25" aria-hidden>
            —
          </span>
        </span>
      ))}
    </>
  );
}

export default function HeroMarquee({ reducedMotion = false }) {
  if (reducedMotion) {
    return (
      <div className="hero-marquee-fade flex w-full justify-center overflow-hidden py-8 md:py-10">
        <span className="font-montserrat text-[clamp(2rem,10vw,7rem)] font-semibold leading-[0.92] tracking-[0.04em] text-white [text-shadow:0_4px_48px_rgba(0,0,0,0.75),0_2px_12px_rgba(0,0,0,0.5)] md:tracking-[0.045em]">
          Aditya Pranav
        </span>
      </div>
    );
  }

  return (
    <div className="hero-marquee-fade relative w-full overflow-hidden py-5 md:py-7">
      <div className="hero-marquee-track flex w-max">
        <div className="flex shrink-0 items-center">
          <NameSegments idPrefix="m1" />
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          <NameSegments idPrefix="m2" />
        </div>
      </div>
    </div>
  );
}
