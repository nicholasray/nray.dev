import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const footer = style({
  ...t.py(14),
  position: "sticky",
  top: "100vh",
  borderTopWidth: "1px",
  borderTopColor: t.color.zinc["100"],
  "@media": {
    [t.mediaQuery("dark")]: {
      borderTopColor: t.color.zinc["800"],
    },
    [t.mediaQuery("lg")]: {
      ...t.py(20),
    },
  },
});

export const footerInner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

export const footerLogoLink = style({
  marginBlockEnd: t.space[5],
});

export const footerLogo = style({
  height: t.height[7],
  fill: t.color.zinc["900"],
  "@media": {
    [t.mediaQuery("dark")]: {
      fill: t.color.white,
    },
  },
});

export const footerSourceCodeContainer = style({
  marginBlockEnd: t.space[4],
});

export const footerSourceCodeLink = style({
  fontWeight: t.fontWeight["semibold"],
  color: t.color.zinc["500"],
  ":hover": {
    color: t.color.zinc["900"],
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      color: t.color.zinc[400],
      ":hover": {
        color: t.color.white,
      },
    },
  },
});

export const footerCopyright = style({
  ...t.fontSize("sm"),
  marginBlockEnd: t.space[12],
  color: t.color.zinc["600"],
  "@media": {
    [t.mediaQuery("dark")]: {
      color: t.color.zinc[400],
    },
  },
});

export const footerLinks = style({
  ...t.fontSize("sm"),
  fontWeight: t.fontWeight["bold"],
  display: "flex",
  gap: t.space["4"],
});

export const footerLink = style({
  color: t.color.zinc["500"],
  ":hover": {
    color: t.color.zinc["900"],
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      color: t.color.zinc["400"],
      ":hover": {
        color: t.color.white,
      },
    },
  },
});
