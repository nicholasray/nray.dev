import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const section = style({
  marginBlockStart: t.space["12"],
  "@media": {
    [t.mediaQuery("lg")]: {
      marginBlockStart: t.space["16"],
    },
  },
});

export const sectionInner = style({
  ...t.mx("auto"),
  maxWidth: t.maxWidth["3xl"],
  ...t.px(4),
  "@media": {
    [t.mediaQuery("sm")]: {
      ...t.px(6),
    },
    [t.mediaQuery("md")]: {
      ...t.px(8),
    },
  },
});

export const slotContainer = style({
  display: "flex",
  justifyContent: "center",
});

export const content = style({
  ...t.fontSize("lg"),
  display: "flex",
  flexDirection: "column",
  gap: t.space["8"],
  marginBlockStart: t.space["8"],
  color: t.color.zinc["800"],
  "@media": {
    [t.mediaQuery("dark")]: {
      color: t.color.zinc["200"],
    },
  },
});
