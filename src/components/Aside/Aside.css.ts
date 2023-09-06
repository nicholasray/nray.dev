import { globalStyle, style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const aside = style({
  ...t.my(5),
  "@media": {
    [t.mediaQuery("md")]: {
      ...t.my(6),
    },
  },
});

globalStyle(`${aside} p`, {
  margin: 0,
  padding: 0,
});

export const asideInner = style({
  position: "relative",
  borderRadius: t.borderRadius.lg,
  padding: t.space[6],
  background: t.color.sky[100],
  color: t.color.sky[900],
  "@media": {
    [t.mediaQuery("dark")]: {
      background: "#1A1F27",
      color: t.color.sky[200],
      ...t.ring({
        width: t.ringWidth[1],
        color: "rgba(14, 165, 233, 0.3)",
      }),
    },
  },
});

export const asideIconContainer = style({
  position: "absolute",
  right: 0,
  top: 0,
  padding: t.space["1"],
  background: t.color.white,
  width: t.space["10"],
  height: t.space["10"],
  transform: "translate(25%, -33%)",
  borderRadius: t.borderRadius.full,
  display: "none",
  "@media": {
    [t.mediaQuery("dark")]: {
      background: t.color.zinc[900],
    },
    [t.mediaQuery("md")]: {
      width: t.space["12"],
      height: t.space["12"],
    },
    [t.mediaQuery("xl")]: {
      width: t.space["14"],
      height: t.space["14"],
      display: "block",
    },
  },
});

export const asideIcon = style({
  background: t.color.sky[100],
  padding: t.space["2"],
  borderRadius: t.borderRadius.full,
  width: t.width.full,
  height: t.height.full,
  "@media": {
    [t.mediaQuery("md")]: {
      padding: t.space["2.5"],
    },
    [t.mediaQuery("dark")]: {
      background: "#1A1F27",
      ...t.ring({
        width: t.ringWidth[1],
        color: "rgba(14, 165, 233, 0.3)",
      }),
    },
  },
});

export const asideTitle = style({
  fontWeight: t.fontWeight.bold,
  display: "flex",
  alignItems: "center",
  lineHeight: t.lineHeight.snug,
});

export const asideBody = style({
  marginBlockStart: t.space["6"],
});
