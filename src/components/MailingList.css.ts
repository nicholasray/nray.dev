import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";
import { vars } from "@src/styles/themes/themes.css";

export const mailingList = style({
  ...t.px(6),
  ...t.py(14),
  display: "flex",
  flexDirection: "column",
  borderRadius: t.borderRadius.lg,
  background: t.color.zinc[100],
  "@media": {
    [t.mediaQuery("md")]: {
      alignItems: "center",
    },
    [t.mediaQuery("dark")]: {
      background: t.color.zinc[800],
    },
  },
});

export const mailingListTitle = style({
  ...t.fontSize("3xl"),
  fontWeight: t.fontWeight["extrabold"],
  letterSpacing: t.letterSpacing["tight"],
  color: vars.titleColor,
  "@media": {
    [t.mediaQuery("md")]: {
      textAlign: "center",
    },
    [t.mediaQuery("lg")]: {
      ...t.fontSize("4xl"),
    },
  },
});

export const mailingListBody = style({
  ...t.fontSize("lg"),
  marginBlockStart: t.space["6"],
  maxWidth: t.maxWidth["2xl"],
  "@media": {
    [t.mediaQuery("md")]: {
      textAlign: "center",
    },
  },
});

export const mailingListForm = style({
  marginBlockStart: t.space["14"],
  display: "flex",
  width: t.width.full,
  maxWidth: t.maxWidth["2xl"],
  alignItems: "center",
});

export const mailingListInner = style({
  position: "relative",
  display: "flex",
  width: t.width.full,
  alignItems: "center",
});

export const mailingListInput = style({
  ...t.py(2),
  paddingInlineStart: t.space["7"],
  paddingInlineEnd: t.space["40"],
  height: t.height["16"],
  width: t.width.full,
  borderRadius: t.borderRadius["full"],
  background: t.color.white,
  fontWeight: t.fontWeight["semibold"],
  color: t.color.zinc[900],
  "::placeholder": {
    color: t.color.zinc[600],
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      background: t.color.zinc["50"],
    },
  },
});

export const mailingListButton = style({
  ...t.py(4),
  ...t.px(5),
  position: "absolute",
  right: t.space["1"],
  display: "flex",
  height: t.height["14"],
  alignItems: "center",
  borderRadius: t.borderRadius["full"],
  fontWeight: t.fontWeight["medium"],
  color: t.color.white,
  background: t.color.zinc["800"],
  ":hover": {
    color: t.color.zinc["50"],
    background: t.color.zinc["700"],
  },
  ":active": {
    background: t.color.zinc["600"],
    color: t.color.zinc["300"],
  },
});

export const mailingListFooter = style({
  ...t.fontSize("sm"),
  marginBlockStart: t.space["6"],
  textAlign: "center",
  color: t.color.zinc["800"],
  "@media": {
    [t.mediaQuery("dark")]: {
      color: t.color.zinc["300"],
    },
  },
});
