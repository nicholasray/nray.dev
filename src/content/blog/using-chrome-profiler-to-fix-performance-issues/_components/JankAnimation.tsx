import clsx from "clsx";

interface BallProps {
  className: string;
}

function Ball({ className }: BallProps) {
  return (
    <div
      className={clsx("h-16 w-16 rounded-full bg-gray-500", className)}
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
        <Ball className="relative animate-[vertical-bounce-inefficient_6s_linear_infinite]" />
        <Ball className="animate-[vertical-bounce-efficient_6s_linear_infinite]" />
      </div>
      <div className="relative flex  justify-center">
        <button
          className="rounded-md bg-zinc-200 px-3 py-2 text-base font-semibold text-zinc-900 hover:bg-zinc-400 dark:hover:bg-white"
          onClick={() => {
            const t0 = performance.now();

            while (performance.now() - t0 < duration * 1000);
          }}
        >
          Block main thread for {duration}{" "}
          {duration === 1 ? "second" : "seconds"}
        </button>
      </div>
    </div>
  );
}

export default JankAnimation;
