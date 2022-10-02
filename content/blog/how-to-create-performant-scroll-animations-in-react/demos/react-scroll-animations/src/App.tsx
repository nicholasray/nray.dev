import "./styles.css";
import useIntersectionObserver from "./useIntersectionObserver";

interface AnimatableProps {
  children: React.ReactNode;
}

function Animatable({ children }: AnimatableProps) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
  });

  // Only start animation when the top of the element intersects with the
  // bottom of the viewport. Note that `entry.boundingClientRect.top` will be
  // negative when the top of the element is above the viewport.
  const shouldTransform: boolean =
    !entry || (!entry.isIntersecting && !!(entry.boundingClientRect.top > 0));

  return (
    <div
      ref={ref}
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
