import { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import "./styles.css";

interface AnimatableProps {
  children: React.ReactNode;
}

/**
 * Animates an element when at least 35% of the element is within the viewport
 * including its top.
 */
function Animatable({ children }: AnimatableProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [ref, entry] = useIntersectionObserver({
    // Trigger callback when at least 35% of the element is visible in the
    // viewport.
    threshold: 0.35,
    isDisabled: isDisabled,
  });

  // Only transform the element if we don't have an IntersectionEntry for the
  // element yet (e.g. on the initial render) or if the element isn't
  // intersecting with the viewport and the top of the element is below the
  // bottom of the viewport.
  const shouldTransform: boolean =
    !entry || (!entry.isIntersecting && !!(entry.boundingClientRect.top > 0));

  // Only trigger the animation once.
  useEffect(() => {
    if (entry && !shouldTransform) {
      setIsDisabled(true);
    }
  }, [entry, shouldTransform]);

  return (
    <div
      ref={!isDisabled ? ref : undefined}
      className={`animatable ${
        shouldTransform ? "animatable--initial" : ""
      }`.trim()}
    >
      {children}
    </div>
  );
}

export default function App() {
  const animatables = [];
  for (let i = 0; i < 20; i++) {
    animatables.push(<Animatable key={i}>{i}</Animatable>);
  }

  return (
    <section>
      <div className="container">{animatables}</div>
    </section>
  );
}
