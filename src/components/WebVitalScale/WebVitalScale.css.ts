import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const webVitalScale = style({
  position: "relative",
  display: "block",
  fontFamily: t.fontFamily.sans,
});

export const webVitalScaleInner = style({
  display: "flex",
  textAlign: "center",
  fontWeight: "bold",
});

export const webVitalScaleGood = style({
  ...t.py(8),
  ...t.px(4),
  flex: "1 1 auto",
  background: t.color.emerald[100],
  color: t.color.green["950"],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media": {
    [t.mediaQuery("dark")]: {
      ...t.ring({
        width: t.ringWidth["1"],
        color: "#3F8862",
      }),
      background: "#1D2A24",
      color: t.color.emerald["100"],
    },
  },
});

export const webVitalScaleNeedsImprovement = style({
  ...t.py(8),
  ...t.px(4),
  flex: "1 1 auto",
  background: t.color.orange[100],
  color: t.color.orange["950"],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media": {
    [t.mediaQuery("dark")]: {
      ...t.ring({
        width: t.ringWidth["1"],
        color: "#B68F25",
      }),
      background: "#2A261D",
      color: t.color.amber["100"],
    },
  },
});

export const webVitalScalePoor = style({
  ...t.py(8),
  ...t.px(4),
  flex: "1 1 auto",
  background: t.color.red[100],
  color: t.color.red["950"],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media": {
    [t.mediaQuery("dark")]: {
      ...t.ring({
        width: t.ringWidth["1"],
        color: "#775050",
      }),
      background: "#2A1D1D",
      color: t.color.red["100"],
    },
  },
});

export const webVitalScaleScoreContainer = style({
  display: "flex",
  transform: "translateY(-25%)",
  justifyContent: "center",
});

export const webVitalScaleScore = style({
  ...t.px(3),
  ...t.py(1),
  ...t.fontSize("base"),
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: t.borderRadius.lg,
  background: t.color.white,
  fontFamily: t.fontFamily.mono,
  fontWeight: t.fontWeight.bold,
  opacity: 0,
  filter:
    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
  "::before": {
    content: "",
    display: "block",
    width: 0,
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderBottom: "8px solid white",
    position: "absolute",
    top: "-7px",
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      color: t.color.zinc["900"],
    },
  },
});
