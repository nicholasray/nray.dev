import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";
import { vars } from "@src/styles/themes/themes.css";

export const headerInner = style({
  ...t.mx("auto"),
  ...t.px(4),
  display: "flex",
  height: t.height[24],
  maxWidth: t.maxWidth["8xl"],
  alignItems: "center",
  justifyContent: "space-between",
  "@media": {
    [t.mediaQuery("sm")]: {
      ...t.px(6),
    },
    [t.mediaQuery("md")]: {
      ...t.px(8),
    },
  },
});

export const headerLogoLink = style({
  ...t.fontSize("2xl"),
  fontWeight: t.fontWeight.semibold,
  letterSpacing: t.letterSpacing["tight"],
});

export const headerLogo = style({
  height: t.height["8"],
  fill: t.color.zinc["900"],
  "@media": {
    [t.mediaQuery("dark")]: {
      fill: t.color.white,
    },
  },
});

export const headerNavLinks = style({
  display: "flex",
  alignItems: "center",
  gap: t.space["2"],
  fontWeight: t.fontWeight["semibold"],
  color: vars.linkColor,
  vars: {
    [vars.linkColor]: t.color.zinc["700"],
  },
  "@media": {
    [t.mediaQuery("sm")]: {
      gap: t.space["4"],
    },
    [t.mediaQuery("md")]: {
      gap: t.space["8"],
    },
    [t.mediaQuery("dark")]: {
      vars: {
        [vars.linkColor]: t.color.zinc["300"],
      },
    },
  },
});

export const headerNavLink = style({
  display: "block",
  borderRadius: t.borderRadius["2xl"],
  padding: t.space["3"],
  ":hover": {
    background: t.color.zinc["100"],
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      ":hover": {
        background: t.color.zinc["800"],
        color: t.color.white,
      },
    },
  },
});

export const headerRSSIcon = style({
  height: t.height[5],
  "@media": {
    [t.mediaQuery("md")]: {
      height: t.height[6],
    },
  },
});
