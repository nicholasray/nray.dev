import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";
import { vars } from "@styles/themes/themes.css";

export const main = style({
  display: "flex",
  flexDirection: "column",
  gap: t.space[20],
  overflow: "hidden",
  "@media": {
    [t.mediaQuery("sm")]: {
      gap: t.space[32],
    },
    [t.mediaQuery("md")]: {
      gap: t.space[40],
    },
  },
});

export const heroSection = style({
  marginBlockStart: t.space[12],
  "@media": {
    [t.mediaQuery("lg")]: {
      marginBlockStart: t.space[16],
    },
  },
});

export const heroSectionInner = style({
  display: "flex",
  flexDirection: "column",
  rowGap: t.space[12],
  ...t.mx("auto"),
  maxWidth: t.maxWidth["8xl"],
  // paddingInlineStart: t.space[4],
  // paddingInlineEnd: t.space[4],
  ...t.px(4),
  "@media": {
    [t.mediaQuery("sm")]: {
      paddingInlineStart: t.space[6],
      paddingInlineEnd: t.space[6],
    },
    [t.mediaQuery("md")]: {
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "30rem 30rem",
      columnGap: t.space[14],
      rowGap: t.space[0],
      paddingInlineStart: t.space[8],
      paddingInlineEnd: t.space[8],
    },
    [t.mediaQuery("lg")]: {
      gridTemplateColumns: "38rem 38rem",
    },
  },
});

export const heroContainerOne = style({
  "@media": {
    [t.mediaQuery("md")]: {
      gridColumnStart: 2,
    },
  },
});

export const heroContainerTwo = style({
  "@media": {
    [t.mediaQuery("md")]: {
      gridRowStart: 1,
    },
  },
});

export const heroTitle = style({
  ...t.fontSize("4xl"),
  fontWeight: t.fontWeight.extrabold,
  letterSpacing: t.letterSpacing.tight,
  color: vars.titleColor,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("5xl"),
    },
  },
});

export const heroBody = style({
  ...t.fontSize("xl"),
  marginBlockStart: t.space[8],
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("2xl"),
    },
  },
});

export const heroImageLink = style({
  display: "block",
  "@media": {
    [t.mediaQuery("md")]: {
      ...t.transform({ rotate: t.rotate["2"] }),
      ...t.transition(),
      ":hover": {
        ...t.transform({ rotate: t.rotate["0"] }),
      },
    },
  },
});

export const heroImage = style({
  height: t.height[80],
  width: t.width.full,
  borderRadius: t.borderRadius.xl,
  objectFit: "cover",
  "@media": {
    [t.mediaQuery("md")]: {
      height: "34rem",
    },
  },
});

export const heroFooter = style({
  ...t.fontSize("sm"),
  marginBlockStart: t.space[8],
  display: "flex",
  gap: t.space[2],
  textTransform: "uppercase",
  letterSpacing: t.letterSpacing.wide,
  color: vars.annotationColor,
});

export const heroButton = style({
  ...t.fontSize("lg"),
  fontWeight: t.fontWeight.semibold,
  position: "relative",
  zIndex: t.zIndex[10],
  marginBlockStart: t.space[12],
  display: "inline-flex",
  width: t.width.full,
  minWidth: "12rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: t.borderRadius.full,
  background: vars.buttonColor,
  paddingInlineStart: t.space[6],
  paddingInlineEnd: t.space[6],
  paddingBlockStart: t.space[5],
  paddingBlockEnd: t.space[5],
  color: vars.knockoutColor,
  "@media": {
    [t.mediaQuery("md")]: {
      width: t.width.auto,
      ":hover": t.transform({ scaleX: 1.1, scaleY: 1.1 }),
      ":active": t.transform({ translateY: "0.25rem" }),
      ...t.transition(),
    },
  },
});

export const sectionInner = style({
  ...t.mx("auto"),
  maxWidth: t.maxWidth["8xl"],
  paddingInlineStart: t.space[4],
  paddingInlineEnd: t.space[4],
  "@media": {
    [t.mediaQuery("sm")]: {
      paddingInlineStart: t.space[6],
      paddingInlineEnd: t.space[6],
    },
    [t.mediaQuery("md")]: {
      paddingInlineStart: t.space[8],
      paddingInlineEnd: t.space[8],
    },
  },
});

export const about = style({
  display: "flex",
  maxWidth: t.maxWidth["5xl"],
  flexDirection: "column",
  alignItems: "center",
  gap: t.space["8"],
  "@media": {
    [t.mediaQuery("md")]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: t.space["16"],
    },
  },
});

export const aboutImage = style({
  width: "100px",
  flexShrink: 0,
  borderRadius: t.borderRadius["full"],
  borderWidth: t.borderWidth[4],
  borderColor: t.color.zinc["600"],
  "@media": {
    [t.mediaQuery("md")]: {
      width: "120px",
    },
    [t.mediaQuery("dark")]: {
      borderColor: t.color.zinc["300"],
    },
  },
});

export const aboutTitle = style({
  ...t.fontSize("3xl"),
  fontWeight: t.fontWeight.bold,
  letterSpacing: t.letterSpacing.tight,
  color: vars.titleColor,
  "@media": {
    [t.mediaQuery("md")]: {
      ...t.fontSize("4xl"),
    },
  },
});

export const aboutBody = style({
  ...t.fontSize("xl"),
  marginBlockStart: t.space["5"],
  "@media": {
    [t.mediaQuery("md")]: {
      ...t.fontSize("2xl"),
    },
  },
});

export const aboutFooter = style({
  marginBlockStart: t.space["12"],
  display: "flex",
});

export const aboutLink = style({
  ...t.fontSize("xl"),
  fontWeight: t.fontWeight["semibold"],
  color: vars.linkColor,
  "@media": {
    [t.mediaQuery("md")]: {
      marginInlineStart: "calc(120px + 4rem)",
    },
  },
});

export const recentlyPublishedTitle = style({
  ...t.fontSize("base"),
  fontWeight: t.fontWeight["semibold"],
  position: "relative",
  textTransform: "uppercase",
  letterSpacing: t.letterSpacing["wide"],
  color: vars.titleColor,
  ":before": {
    content: "",
    display: "block",
    height: "3px",
    position: "absolute",
    top: `-${t.space[2]}`,
    width: "48px",
    background: t.color.zinc["400"],
  },
});

export const recentlyPublishedPosts = style({
  marginBlockStart: t.space[12],
  display: "flex",
  flexDirection: "column",
  rowGap: t.space[14],
  "@media": {
    [t.mediaQuery("md")]: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px,1fr))",
      columnGap: t.space[9],
      rowGap: t.space[14],
    },
  },
});
