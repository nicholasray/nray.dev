import { useEffect, useState } from "react";

type ReturnType = [
  (element: Element | null) => void,
  IntersectionObserverEntry | null
];

interface Options extends IntersectionObserverInit {
  /**
   * Disable detecting intersection changes. Use this if the user has enabled
   * the "prefer-reduced-motion" setting on their OS, for example.
   */
  isDisabled?: boolean;
}

function useIntersectionObserver({
  root = null,
  rootMargin = "0%",
  threshold = 0,
  isDisabled = false,
}: Options): ReturnType {
  const [ref, setRef] = useState<Element | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(
    () => {
      // Return early if isDisabled is `true`, if we don't have a reference to
      // the element yet, or the browser doesn't support IntersectionObserver.
      if (isDisabled || !ref || !window.IntersectionObserver) {
        return;
      }

      // Create new Intersection Observer instance where we'll set they entry
      // state when intersection changes are detected.
      const observer = new IntersectionObserver(
        ([entry]) => {
          setEntry(entry);
        },
        { root, rootMargin, threshold }
      );

      // Start observing element.
      observer.observe(ref);

      // Cleanup function;
      return () => {
        observer.disconnect();
      };
    },
    // Avoid excessive re-renders by converting threshold to a string if it is
    // an array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [root, rootMargin, JSON.stringify(threshold), ref, isDisabled]
  );

  return [setRef, entry];
}

export default useIntersectionObserver;
