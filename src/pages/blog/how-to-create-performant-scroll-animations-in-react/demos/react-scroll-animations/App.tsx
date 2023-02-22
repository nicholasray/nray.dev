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
  const [ref, entry] = useIntersectionObserver({
    // Trigger callback when at least 35% of the element is visible in the
    // viewport.
    threshold: 0.35,
    // Only execute animation once.
    executeOnce: true,
  });

  // Add initial transform/opacity classes if the entry is not intersecting.
  const addInitial = !entry?.isIntersecting;

  return (
    <div
      ref={ref}
      className={`animatable ${addInitial ? "animatable--initial" : ""}`.trim()}
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
    <section className="sp-demo">
      <div className="container">{animatables}</div>
    </section>
  );
}
