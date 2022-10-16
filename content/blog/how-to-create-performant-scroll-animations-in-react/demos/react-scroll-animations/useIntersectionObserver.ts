import { useEffect, useRef, useState } from "react";

type ReturnType = [
  (element: Element | null) => void,
  IntersectionObserverEntry | null
];

interface Options extends IntersectionObserverInit {
  /**
   * Only execute Intersection Observer callback once while the element is
   * intersected. Use this if you only want to run an animation once, for
   * example.
   */
  executeOnce?: boolean;
}

/**
 * A React Hook used to observe intersection changes with elements.
 *
 * @param options
 */
function useIntersectionObserver({
  root = null,
  rootMargin = "0%",
  threshold = 0,
  executeOnce = false,
}: Options): ReturnType {
  const [ref, setRef] = useState<Element | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasExecuted = useRef(false);

  useEffect(
    () => {
      // Return early if the callback has already executed while the element was
      // intersected, if we don't have a reference to the element yet, if the
      // browser doesn't support IntersectionObserver or if the callback has
      // already executed while the element was intersected.
      if (
        !ref ||
        !window.IntersectionObserver ||
        (executeOnce && hasExecuted.current)
      ) {
        return;
      }

      // Create new Intersection Observer instance where we'll set the entry
      // state when intersection changes are detected.
      const observer = new IntersectionObserver(
        ([entry]) => {
          setEntry(entry);

          if (entry.isIntersecting && executeOnce) {
            observer.disconnect();
            hasExecuted.current = true;
          }
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
    [root, rootMargin, JSON.stringify(threshold), ref, executeOnce]
  );

  return [setRef, entry];
}

export default useIntersectionObserver;
