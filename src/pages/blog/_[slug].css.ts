import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";
import { vars } from "@src/styles/themes/themes.css";

export const main = style({
  marginBlockStart: t.space["8"],
});

export const section = style({
  ...t.mx("auto"),
  ...t.px(4),
  marginBlockStart: t.space["8"],
  "@media": {
    [t.mediaQuery("sm")]: {
      ...t.px(6),
    },
    [t.mediaQuery("md")]: {
      ...t.px(8),
      maxWidth: t.maxWidth["2xl"],
      marginBlockStart: t.space["12"],
      columnGap: t.space["10"],
    },
    [t.mediaQuery("lg")]: {
      display: "grid",
      marginBlockStart: t.space["14"],
      maxWidth: t.maxWidth["5xl"],
      columnGap: t.space["14"],
      gridTemplateColumns: "245px minmax(0,1fr) 245px",
    },
    [t.mediaQuery("xl")]: {
      maxWidth: t.maxWidth["8xl"],
    },
  },
});

export const sectionInner = style({
  gridColumnStart: 2,
  "@media": {
    [t.mediaQuery("lg")]: {
      gridColumnEnd: -1,
    },
    [t.mediaQuery("xl")]: {
      gridColumnEnd: 3,
    },
  },
});

export const sectionTitle = style({
  ...t.fontSize("3xl"),
  fontWeight: t.fontWeight["extrabold"],
  letterSpacing: t.letterSpacing["tight"],
  color: vars.titleColor,
  "@media": {
    [t.mediaQuery("md")]: {
      ...t.fontSize("5xl"),
      maxWidth: t.maxWidth["5xl"],
    },
  },
});

export const sectionMeta = style({
  ...t.fontSize("sm"),
  fontWeight: t.fontWeight["medium"],
  marginBlockStart: t.space["4"],
  marginBlockEnd: t.space["8"],
  gridColumnStart: 2,
  display: "flex",
  alignItems: "center",
  color: vars.annotationColor,
  "@media": {
    [t.mediaQuery("md")]: {
      ...t.fontSize("base"),
      ...t.mx("auto"),
      marginBlockStart: t.space["6"],
      marginBlockEnd: t.space["10"],
    },
    [t.mediaQuery("lg")]: {
      ...t.mx(0),
      marginBlockStart: t.space["10"],
      marginBlockEnd: t.space["14"],
      gridColumnEnd: -1,
    },
    [t.mediaQuery("xl")]: {
      gridColumnEnd: 3,
    },
  },
});

export const sectionMetaInner = style({
  display: "flex",
  alignItems: "center",
  fontWeight: t.fontWeight["medium"],
});

export const avatarContainer = style({
  marginInlineEnd: t.space["3"],
  height: t.height["10"],
  width: t.width["10"],
  borderRadius: t.borderRadius.full,
  "@media": {
    [t.mediaQuery("md")]: {
      height: t.height["12"],
      width: t.width["12"],
    },
  },
});

export const avatarLink = style({
  display: "flex",
  alignItems: "center",
});

export const avatarImage = style({
  borderRadius: t.borderRadius.full,
});

export const authorInfo = style({
  "@media": {
    [t.mediaQuery("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
});

export const authorLink = style({
  display: "flex",
  alignItems: "center",
});

export const publishInfo = style({
  display: "flex",
  alignItems: "center",
  marginBlockStart: t.space[0.5],
  "@media": {
    [t.mediaQuery("md")]: {
      marginBlockStart: t.space[0],
    },
  },
});

export const publishSeparator = style({
  ...t.mx(3),
  fontWeight: t.fontWeight["bold"],
  display: "none",
  "@media": {
    [t.mediaQuery("md")]: {
      display: "block",
    },
  },
});

export const publishSeparatorTwo = style({
  ...t.mx(2),
  display: "none",
  fontWeight: "bold",
  "@media": {
    [t.mediaQuery("sm")]: {
      display: "block",
    },
    [t.mediaQuery("md")]: {
      ...t.mx(3),
    },
  },
});

export const readingTimeContainer = style({
  display: "none",
  "@media": {
    [t.mediaQuery("sm")]: {
      display: "block",
    },
  },
});

export const tableOfContentsContainer = style({
  display: "none",
  "@media": {
    [t.mediaQuery("md")]: {
      gridRowStart: 3,
    },
    [t.mediaQuery("lg")]: {
      display: "block",
    },
  },
});

export const proseContainer = style({
  "@media": {
    [t.mediaQuery("lg")]: {
      gridColumn: "2/-1",
    },
    [t.mediaQuery("xl")]: {
      gridColumn: "2/3",
    },
  },
});
