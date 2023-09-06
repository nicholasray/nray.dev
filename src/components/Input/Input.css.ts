import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const input = style({
  ...t.fontSize("base"),
  ...t.px(4),
  appearance: "none",
  position: "relative",
  fontFamily: t.fontFamily.sans,
  width: t.width.full,
  height: t.height[10],
  borderWidth: t.borderWidth[1],
  borderColor: t.color.zinc[200],
  borderRadius: t.borderRadius.md,
  outline: "none",
  "::placeholder": {
    color: t.color.zinc[400],
  },
  ":focus-visible": {
    borderColor: t.color.zinc[500],
    ...t.ring({
      width: t.ringWidth["1"],
      color: t.color.zinc["500"],
    }),
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      borderColor: t.color.zinc["700"],
      background: t.color.zinc["800"],
      ":focus-visible": {
        borderColor: t.color.zinc["600"],
        ...t.ring({
          width: t.ringWidth["1"],
          color: t.color.zinc["600"],
        }),
      },
    },
  },
});
