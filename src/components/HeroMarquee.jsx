const SEGMENT_COUNT = 10;

function NameSegments({ idPrefix = "a" }) {
  return (
    <>
      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
        <span
          key={`${idPrefix}-${i}`}
          className="inline-flex shrink-0 items-center px-[clamp(1.25rem,5vw,4rem)] font-montserrat text-[clamp(2.5rem,13vw,9.5rem)] font-semibold leading-none tracking-wider text-white [text-shadow:0_4px_48px_rgba(0,0,0,0.75),0_2px_12px_rgba(0,0,0,0.5)]"
        >
          Aditya Pranav
          <div className="ml-[clamp(1rem,2.5vw,2rem)] shrink-0 w-5 h-0.5 md:h-1 md:w-32 bg-accent" aria-hidden></div>
        </span>
      ))}
    </>
  );
}

export default function HeroMarquee({ reducedMotion = false }) {
  if (reducedMotion) {
    return (
      <div className="flex w-full justify-center overflow-hidden py-8 md:py-10">
        <span className="font-montserrat text-[clamp(2rem,10vw,7rem)] font-semibold tracking-wider text-white [text-shadow:0_4px_48px_rgba(0,0,0,0.75),0_2px_12px_rgba(0,0,0,0.5)]">
          Aditya Pranav
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden py-5 md:py-7">
      <div className="hero-marquee-track flex w-max min-w-full">
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
