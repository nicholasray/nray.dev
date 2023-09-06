import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const blogVideoFigure = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const blogVideoShadow = style({
  boxShadow: t.boxShadow["xl"],
});

export const blogVideo = style({
  borderRadius: t.borderRadius.lg,
});
