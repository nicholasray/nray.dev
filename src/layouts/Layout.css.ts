import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const mailingListSection = style({
  ...t.my(20),
  "@media": {
    [t.mediaQuery("sm")]: {
      ...t.my(32),
    },
    [t.mediaQuery("md")]: {
      ...t.my(40),
    },
  },
});

export const mailingListSectionInner = style({
  ...t.mx("auto"),
  ...t.px(4),
  marginBlockEnd: t.space["16"],
  maxWidth: t.maxWidth["8xl"],
  alignItems: "center",
  "@media": {
    [t.mediaQuery("sm")]: {
      ...t.px(6),
    },
    [t.mediaQuery("md")]: {
      ...t.px(8),
    },
  },
});
