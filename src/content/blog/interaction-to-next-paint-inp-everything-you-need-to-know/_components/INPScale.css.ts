import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const scaleItem = style({
  ...t.px(4),
  ...t.py(8),
  borderRadius: t.borderRadius.lg,
  background: t.color.zinc[50],
  boxShadow: t.boxShadow.xl,
  borderWidth: t.borderWidth[4],
  borderColor: t.color.white,
  "@media": {
    [t.mediaQuery("dark")]: {
      ...t.ring({
        width: t.ringWidth[1],
        color: "rgba(255, 255, 255, .1)",
      }),
      background: "#ffffff06",
      borderColor: t.color.transparent,
    },
  },
});

export const scale = style({
  ...t._mx(4),
});

export const scaleInputContainer = style({
  paddingBlockStart: t.space[4],
});

export const scaleInput = style({
  "@media": {
    [t.mediaQuery("dark")]: {
      background: t.color.zinc["900"] + "!important",
    },
  },
});

export const scaleSliderContainer = style({
  display: "flex",
  justifyContent: "center",
  fontFamily: t.fontFamily.sans,
  marginBlockStart: t.space["2"],
});

export const scaleSliderContainerInner = style({
  display: "flex",
  maxWidth: t.maxWidth.xl,
  flexGrow: 1,
  flexDirection: "column",
  fontFamily: t.fontFamily.sans,
});

export const scaleSlider = style({
  marginBlockStart: t.space["3"],
  display: "block",
});

export const scaleSliderInner = style({
  ...t.fontSize("base"),
  display: "flex",
  justifyContent: "space-between",
  marginBlockStart: t.space["3"],
  alignItems: "baseline",
});

export const scaleSliderLabel = style({
  ...t.fontSize("sm"),
  fontWeight: t.fontWeight.semibold,
  letterSpacing: t.letterSpacing.wide,
  textTransform: "uppercase",
});

export const scaleSliderValue = style({
  ...t.fontSize("lg"),
  fontWeight: t.fontWeight.bold,
});
