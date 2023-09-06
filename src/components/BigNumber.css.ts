import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const bigNumber = style({
  ...t.fontSize("8xl"),
  fontWeight: t.fontWeight["extrabold"],
  letterSpacing: t.letterSpacing["tighter"],
  textAlign: "center",
  "@media": {
    [t.mediaQuery("md")]: {
      ...t.fontSize("9xl"),
    },
  },
});
