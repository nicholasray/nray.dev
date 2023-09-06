import { globalStyle } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

globalStyle(".blog-image--centered", {
  display: "flex",
  justifyContent: "center",
  marginTop: 0,
});

globalStyle(".blog-image--full-width", {
  width: t.width.full,
});

globalStyle(".blog-image--shadow", {
  boxShadow: t.boxShadow["xl"],
});

globalStyle(".blog-image--white-background", {
  background: "white",
});

globalStyle(".blog-image--rounded", {
  borderRadius: t.borderRadius.lg,
});
