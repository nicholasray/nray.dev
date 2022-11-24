"use client";

import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { useEffect, useState } from "react";
import useMediaQuery from "@hooks/useMediaQuery";
import constants from "../constants";
import clsx from "clsx";
interface TimelinePointProps {
  image: React.ReactNode;
  description: React.ReactNode;
  hasFade: boolean;
}

const TimelinePoint = ({ image, description, hasFade }: TimelinePointProps) => {
  const matches = useMediaQuery(constants.animations);
  const [skip, setSkip] = useState(!matches);
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.35,
    skip,
    executeOnce: true,
  });

  // Add initial transform/opacity classes if the entry is not intersecting.
  const addInitial = !entry?.isIntersecting;

  // Disable IntersectionObserver logic if the animation media query doesn't match.
  useEffect(() => {
    setSkip(!matches);
  }, [matches]);

  return (
    <div ref={ref} className="md:grid md:grid-cols-2 md:items-center md:gap-16">
      <div className="relative">
        <div className="absolute left-0 top-0 -my-px ml-px -translate-x-1/2 bg-gray-900 p-2">
          <div className="h-3 w-3 rounded-full border-2 border-gray-400"></div>
        </div>
        <p
          className={clsx(
            "max-w-xl px-6 animation-safe:transition-performant animation-safe:duration-500",
            {
              "animation-safe-safe:opacity-0 animation-safe:-translate-x-4":
                addInitial,
            }
          )}
        >
          {description}
        </p>
      </div>
      <div
        className={clsx(
          "relative mx-6 mt-8 flex max-w-xl justify-center overflow-hidden rounded-2xl bg-white px-4 pt-6 shadow-xl animation-safe:transition-performant animation-safe:duration-500 md:mx-0 md:mt-0 md:w-[117%]",
          { "pb-6": !hasFade },
          {
            "animation-safe:translate-x-1/3 animation-safe:scale-90 animation-safe:opacity-60":
              addInitial,
          }
        )}
      >
        {image}
        {hasFade && (
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent pb-[15%]"></div>
        )}
      </div>
    </div>
  );
};

export default TimelinePoint;
