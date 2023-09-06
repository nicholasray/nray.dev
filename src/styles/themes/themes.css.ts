import { assignVars, createThemeContract, style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const vars = createThemeContract({
  background: null,
  titleColor: null,
  textColor: null,
  buttonColor: null,
  knockoutColor: null,
  linkColor: null,
  annotationColor: null,
  // buttonHoverColor: null,
  // linkHoverColor: null,
});

export const theme = style({
  vars: assignVars(vars, {
    background: t.color.white,
    titleColor: t.color.zinc[900],
    textColor: t.color.zinc[700],
    buttonColor: t.color.zinc[800],
    knockoutColor: t.color.white,
    linkColor: t.color.zinc[900],
    annotationColor: t.color.zinc[500],
  }),
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: assignVars(vars, {
        background: t.color.zinc[900],
        titleColor: t.color.white,
        textColor: t.color.zinc[400],
        buttonColor: t.color.zinc[50],
        knockoutColor: t.color.zinc[900],
        linkColor: t.color.white,
        annotationColor: t.color.zinc[400],
      }),
    },
  },
});
