import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { vars } from "@styles/themes/themes.css";
import * as t from "@src/styles/tokens";

globalStyle("body", {
  backgroundColor: vars.background,
  color: vars.textColor,
  fontFamily: t.fontFamily.sans,
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
});

globalStyle("body", {
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("p, h1, h2, h3, h4,h5, h6", {
  overflowWrap: "break-word",
});

globalFontFace("Inter var", {
  fontStyle: "normal",
  fontWeight: "400 800",
  src: `url("/assets/fonts/inter.var.woff2") format("woff2")`,
  fontDisplay: "optional",
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
});

globalStyle("*, ::before, ::after", {
  "@media": {
    [t.mediaQuery("motionReduce")]: {
      animationDelay: "-1ms !important",
      animationDuration: "1ms !important",
      animationIterationCount: "1 !important",
      backgroundAttachment: "initial !important",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      scrollBehavior: "auto",
      transitionDuration: "0s !important",
      transitionDelay: "0s !important",
    },
  },
});

globalStyle(".sr-only", {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
});
