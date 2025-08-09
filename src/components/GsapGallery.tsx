import { DemoCard } from "./DemoCard";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type DemoCardData = {
  id: number;
  title: string;
  description: string;
};

const demoCards: DemoCardData[] = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Demo Card ${id}`,
    description:
      "This is placeholder content for the gallery card. Replace with real data later.",
  };
});

export const GsapGallery = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      gsap.from(".card", {
        scale: 0,
        duration: 1,
        repeat: -1,
        ease: "power2.inOut",
        yoyo: true,
        stagger: {
          each: 0.2,
        },
      });
    },
    { scope: wrapperRef },
  );

  return (
    <div
      ref={wrapperRef}
      className="wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {demoCards.map((card, index) => (
        <div
          key={card.id}
          ref={(elem: HTMLDivElement | null) => {
            cardRefs.current[index] = elem;
          }}
          className="card"
        >
          <DemoCard
            id={card.id}
            title={card.title}
            description={card.description}
          />
        </div>
      ))}
    </div>
  );
};
