import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const socialLinksList = style({
  ...t.fontSize("base"),
  listStyleType: "none",
  display: "flex",
  flexDirection: "column",
  gap: t.space["4"],
  paddingInlineStart: `${t.space["0"]} !important`,
  fontWeight: t.fontWeight["semibold"],
});

export const socialIcon = style({
  width: t.width["6"],
  height: t.width["6"],
});

export const socialLinksListItem = style({
  display: "flex",
  selectors: {
    [`${socialLinksList} &`]: {
      ...t.my(0),
    },
  },
});

export const socialLink = style({
  display: "flex",
  alignItems: "center",
  ":hover": {
    color: t.color.zinc["500"],
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      ":hover": {
        color: t.color.zinc["200"],
      },
    },
  },
});

export const socialLinkText = style({
  marginInlineStart: t.space["4"],
});
