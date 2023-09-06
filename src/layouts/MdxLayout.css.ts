import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const section = style({
  ...t.mx("auto"),
  marginBlockStart: t.space["16"],
  maxWidth: t.maxWidth["3xl"],
});

export const sectionInner = style({
  ...t.mx("auto"),
  maxWidth: t.maxWidth["8xl"],
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
