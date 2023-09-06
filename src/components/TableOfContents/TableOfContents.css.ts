import { globalStyle, style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";
import { vars } from "@styles/themes/themes.css";

export const tableOfContentsNav = style({
  ...t.fontSize("sm"),
  position: "sticky",
  top: t.space[6],
  maxHeight: `calc(100vh - 1.5rem)`,
  overflowY: "auto",
  paddingBlockStart: t.space["1.5"],
  paddingBlockEnd: t.space["6"],
  paddingInlineEnd: t.space["6"],
  color: vars.annotationColor,
  fontWeight: t.fontWeight["medium"],
});

export const tableOfContentsTitle = style({
  marginBlockEnd: t.space["3"],
  fontWeight: t.fontWeight["bold"],
  textTransform: "uppercase",
  letterSpacing: t.letterSpacing.wide,
});

globalStyle(".table-of-contents-item--highlighted > .table-of-contents-link", {
  color: t.color.zinc["900"],
  "@media": {
    [t.mediaQuery("dark")]: {
      color: t.color.white,
    },
  },
});
