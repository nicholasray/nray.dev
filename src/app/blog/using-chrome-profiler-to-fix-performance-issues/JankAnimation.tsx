"use client";

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

function JankAnimation() {
  return (
    <div className="relative">
      <div className="m-auto flex h-[350px] max-w-xs justify-between">
        <Ball className="relative animate-[vertical-bounce-inefficient_6s_linear_infinite]" />
        <Ball className="animate-[vertical-bounce-efficient_6s_linear_infinite]" />
      </div>
      <div className="relative flex  justify-center">
        <button
          className="rounded-md bg-indigo-500 py-2 px-3 text-base font-semibold text-white hover:bg-indigo-600"
          onClick={() => {
            const t0 = performance.now();

            while (performance.now() - t0 < 1000);
          }}
        >
          Block main thread
        </button>
      </div>
    </div>
  );
}

export default JankAnimation;
