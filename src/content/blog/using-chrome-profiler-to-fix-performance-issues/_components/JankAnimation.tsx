import clsx from "clsx";
import styles from "./Ball.module.css";
import { Button } from "@/components/Button/Button";

interface BallProps {
  className: string;
}

function Ball({ className }: BallProps) {
  return (
    <div
      className={clsx("h-16 w-16 rounded-full bg-slate-500", className)}
    ></div>
  );
}

interface JankAnimationProps {
  // How long the main thread should be blocked in seconds.
  duration: number;
}

function JankAnimation({ duration = 1 }: JankAnimationProps) {
  return (
    <div className="relative">
      <div className="m-auto flex h-[350px] max-w-xs justify-between">
        <Ball className={clsx(styles.ballInefficient, "relative")} />
        <Ball className={clsx(styles.ballEfficient, "relative")} />
      </div>
      <div className="relative flex justify-center">
        <Button
          onClick={() => {
            const t0 = performance.now();

            while (performance.now() - t0 < duration * 1000);
          }}
        >
          Block main thread for {duration}{" "}
          {duration === 1 ? "second" : "seconds"}
        </Button>
      </div>
    </div>
  );
}

export default JankAnimation;
