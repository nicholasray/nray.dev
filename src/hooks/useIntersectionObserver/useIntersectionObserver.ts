import { useEffect, useState } from "react";

type ElementObserverCallback = (entry: IntersectionObserverEntry) => void;

interface IntersectionObserverWrapper {
  observe: (element: Element, callback: ElementObserverCallback) => void;
  unobserve: (element: Element) => void;
}

/**
 * Creates an object with an `observe` method that can be used to observe
 * intersection changes. The passed-in callback will be called when intersection
 * observer changes occur.
 *
 * @param options Options passed to IntersectionObserver constructor.
 * @param onDisconnect Callback that is called when the intersection observer
 * has no elements that it is observing.
 */
function createIntersectionObserverWrapper(
  options: IntersectionObserverInit,
  onDisconnect: VoidFunction
): IntersectionObserverWrapper {
  const elementMap = new Map<Element, ElementObserverCallback>();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (elementMap.has(entry.target)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        elementMap.get(entry.target)!(entry);
      }
    });
  }, options);

  return {
    observe: (element: Element, callback: ElementObserverCallback) => {
      elementMap.set(element, callback);
      observer.observe(element);
    },
    unobserve: (element: Element) => {
      if (!elementMap.has(element)) {
        return;
      }

      elementMap.delete(element);
      observer.unobserve(element);

      // If observer has no elements, disconnect it.
      if (elementMap.size === 0) {
        observer.disconnect();
        onDisconnect();
      }
    },
  };
}

const rootIdMap: WeakMap<Element | Document, string> = new WeakMap();
let rootId = 0;

/**
 * Retrieves a string id from cache if the root Element is identical or
 * generates the id.
 *
 * @param root Element used as the viewport for determining the intersection.
 */
function getOrCreateRootId(root: IntersectionObserverInit["root"]): string {
  if (!root) return "0";

  if (rootIdMap.has(root)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return rootIdMap.get(root)!;
  }
  rootId++;
  rootIdMap.set(root, rootId.toString());

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return rootIdMap.get(root)!;
}

/**
 * Generate a string derived from IntersectionObserverInit options.
 *
 * @param options Options passed to IntersectionObserver constructor.
 */
function generateKey(options: IntersectionObserverInit) {
  return (Object.keys(options) as (keyof IntersectionObserverInit)[])
    .sort()
    .filter((key) => options[key] !== undefined)
    .map(
      (key) =>
        `${key}-${
          key === "root" ? getOrCreateRootId(options.root) : options[key]
        }`
    )
    .toString();
}

const observerMap = new Map<string, IntersectionObserverWrapper>();

/**
 * Retrieves an intersection observer from cache if the IntersectionObserverInit
 * options are identical or creates a new one instance.
 *
 * @param options Options passed to IntersectionObserver constructor.
 */
const getOrCreateIntersectionObserverWrapper = (
  options: IntersectionObserverInit
): IntersectionObserverWrapper => {
  const key = generateKey(options);

  if (observerMap.has(key)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return observerMap.get(key)!;
  }

  observerMap.set(
    key,
    createIntersectionObserverWrapper(options, () => {
      observerMap.delete(key);
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return observerMap.get(key)!;
};

type IntersectionObserverHookReturn = [
  (element: Element | null) => void,
  IntersectionObserverEntry | null
];

/**
 * A react hook used to observe intersection changes with elements.
 *
 * @param options Options passed to IntersectionObserver constructor.
 *
 * @example
 * ```jsx
 * import React from 'react';
 * import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
 *
 * function Component() {
 *  const [ ref, entry ] = useIntersectionObserver({
 *    threshold: 0.5
 *  });
 *
 *  return <div ref={ref} className={entry && entry.isIntersecting ? 'in-viewport' : ''} />
 * }
 * ```
 */
function useIntersectionObserver({
  root = null,
  rootMargin = "0%",
  threshold = 0,
}: IntersectionObserverInit): IntersectionObserverHookReturn {
  const [ref, setRef] = useState<Element | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(
    () => {
      if (!ref || !window.IntersectionObserver) {
        return;
      }

      const observerWrapper = getOrCreateIntersectionObserverWrapper({
        root,
        rootMargin,
        threshold,
      });

      const handler = (entry: IntersectionObserverEntry) => {
        setEntry(entry);
      };

      observerWrapper.observe(ref, handler);

      return () => {
        observerWrapper.unobserve(ref);
      };
    },
    // Avoid excessive re-renders by converting threshold to a string if it is
    // an array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      root,
      rootMargin,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(threshold),
      ref,
    ]
  );

  return [setRef, entry];
}

export default useIntersectionObserver;
