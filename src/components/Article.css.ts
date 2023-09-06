import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";
import { vars } from "@styles/themes/themes.css";

export const article = style({
  display: "flex",
  height: t.height.full,
  flexDirection: "column",
});

export const articleImage = style({
  height: t.height[80],
  width: t.width.full,
  borderRadius: t.borderRadius["xl"],
  objectFit: "cover",
  "@media": {
    [t.mediaQuery("dark")]: {
      boxShadow: t.boxShadow["lg"],
    },
    [t.mediaQuery("md")]: {
      height: "32rem",
    },
  },
});

export const articleTitle = style({
  ...t.fontSize("2xl"),
  fontWeight: t.fontWeight["bold"],
  marginBlockStart: t.space["8"],
  color: vars.titleColor,
  letterSpacing: t.letterSpacing.tight,
});

export const articleBody = style({
  ...t.fontSize("lg"),
  marginBlockEnd: t.space[6],
  marginBlockStart: t.space["4"],
});

export const articleFooter = style({
  ...t.fontSize("sm"),
  marginBlockStart: "auto",
  display: "flex",
  gap: t.space["2"],
  textTransform: "uppercase",
  letterSpacing: t.letterSpacing["wide"],
  color: vars.annotationColor,
});
