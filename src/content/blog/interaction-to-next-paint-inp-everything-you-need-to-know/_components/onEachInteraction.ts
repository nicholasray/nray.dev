/* eslint-disable @typescript-eslint/ban-ts-comment */
interface EventLatencies {
  [id: number]: PerformanceEventTiming[];
}

interface Interaction {
  attribution: {
    eventEntry: PerformanceEventTiming;
    eventTime: number;
    eventType: "pointerdown" | "pointerup" | "click" | "keydown" | "keyup";
  };
  entries: PerformanceEventTiming[];
  name: string;
  rating: string;
  value: number;
}

interface INPCallback {
  (interaction: Interaction): void;
}

const valueToRating = (score: number) =>
  score <= 200 ? "good" : score <= 500 ? "needs-improvement" : "poor";

/**
 * Adapted from Google Chrome's web-vitals-extension: https://github.com/GoogleChrome/web-vitals-extension/blob/96ca0de13a497bec80422398bc688a2cf1c4836b/src/browser_action/on-each-interaction.js
 */
export default function onEachInteraction(callback: INPCallback) {
  const observer = new PerformanceObserver((list) => {
    const interactions: EventLatencies = {};
    const entries = list.getEntries().filter(
      (entry) =>
        // @ts-ignore
        entry instanceof PerformanceEventTiming && entry.interactionId
    ) as PerformanceEventTiming[];

    for (const entry of entries) {
      // @ts-ignore
      interactions[entry.interactionId] =
        // @ts-ignore
        interactions[entry.interactionId] || [];
      // @ts-ignore
      interactions[entry.interactionId].push(entry);
    }

    // Will report as a single interaction even if parts are in separate frames.
    // Consider splitting by animation frame.
    for (const interaction of Object.values(
      interactions
    ) as PerformanceEventTiming[][]) {
      const entry = interaction.reduce((prev, curr) =>
        prev.duration >= curr.duration ? prev : curr
      );
      const value = entry.duration;

      callback({
        attribution: {
          eventEntry: entry,
          eventTime: entry.startTime,
          // @ts-ignore
          eventType: entry.name,
        },
        entries: interaction,
        name: "Interaction",
        rating: valueToRating(value),
        value,
      });
    }
  });

  observer.observe({
    type: "event",
    // @ts-ignore
    durationThreshold: 0,
    buffered: true,
  });
}
