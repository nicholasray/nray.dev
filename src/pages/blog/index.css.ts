import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";
import { vars } from "@src/styles/themes/themes.css";

export const blogSection = style({
  marginBlockStart: t.space["16"],
});

export const blogSectionInner = style({
  ...t.mx("auto"),
  ...t.px(4),
  maxWidth: t.maxWidth["8xl"],
  "@media": {
    [t.mediaQuery("sm")]: {
      ...t.px(6),
    },
    [t.mediaQuery("md")]: {
      ...t.px(8),
    },
  },
});

export const blogSectionTitle = style({
  ...t.fontSize("4xl"),
  fontWeight: t.fontWeight.bold,
  letterSpacing: t.letterSpacing.tight,
  color: vars.titleColor,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("5xl"),
    },
  },
});

export const blogSectionPosts = style({
  ...t.fontSize("4xl"),
  marginBlockStart: t.space["8"],
  display: "flex",
  flexDirection: "column",
  gap: t.space["14"],
  "@media": {
    [t.mediaQuery("md")]: {
      marginBlockStart: t.space["12"],
      display: "grid",
      rowGap: t.space["9"],
      columnGap: t.space["14"],
      gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
    },
  },
});
