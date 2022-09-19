import { useState, useEffect } from "react";

/**
 * @param query The media query to match against.
 */
function useMediaQuery(query: string) {
  // Support isomorphic rendering by checking if `window` (clientside) exists.
  // If not, then this code is probably being executed on the backend.
  const mediaQuery = typeof window !== "undefined" ? matchMedia(query) : false;
  const [matches, setMatches] = useState(mediaQuery && mediaQuery.matches);

  useEffect(() => {
    if (!mediaQuery) {
      return;
    }

    const handler = (e: MediaQueryListEvent) => {
      /**
       * Using `e.matches` is more performant than checking properties like
       * `window.innerWidth` which are prone to causing expensive style
       * recalcs/layout operations.
       *
       * @see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
       */
      if (e.matches) {
        // The viewport is >= 1000px wide.
        setMatches(true);
      } else {
        // The viewport is < 1000px wide.
        setMatches(false);
      }
    };

    // If the browser supports the `addEventListener` API, the following line will
    // be truthy so we use it. If not, it will be falsy and we use the deprecated
    // `addListener` API.
    mediaQuery.addEventListener
      ? mediaQuery.addEventListener("change", handler)
      : mediaQuery.addListener(handler);

    // Clean up event listener after this effect is no longer needed.
    return () =>
      mediaQuery.removeEventListener
        ? mediaQuery.removeEventListener("change", handler)
        : mediaQuery.removeListener(handler);
    // Don't change when the mediaQuery reference changes as we only use that on
    // the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export default useMediaQuery;
