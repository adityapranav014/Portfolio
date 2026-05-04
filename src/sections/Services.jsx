import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Services = () => {
  const text = `I build clean, performant digital solutions tailored
    to your business. No fluff, just work that
    lasts and scales as you grow.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
  return (
    <section id="services" className="min-h-dvh bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"I can help you with..."}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30 group/card transition-colors duration-500 hover:border-accent"
          style={
            isDesktop
              ? {
                top: `calc(10vh + ${index * 5}em)`,
                marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
              }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-baseline justify-between">
                <h2 className="text-4xl lg:text-5xl group-hover/card:text-accent transition-colors duration-300">{service.title}</h2>
                <span className="text-xs tracking-widest uppercase text-white/20 group-hover/card:text-accent/60 transition-colors duration-300">
                  0{index + 1}
                </span>
              </div>
              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty normal-case">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex items-center gap-4">
                      <span className="mr-8 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      <span>{item.title}</span>
                      <span className="text-base text-white/30 font-light ml-2 hidden lg:block">
                        {item.description}
                      </span>
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/20 group-hover/card:bg-accent/20 transition-colors duration-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Accent bottom line reveal on hover */}
          <div className="mt-8 h-px w-0 group-hover/card:w-full bg-accent transition-all duration-700 ease-out" />
        </div>
      ))}
    </section>
  );
};

export default Services;
