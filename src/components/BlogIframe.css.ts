import { globalStyle } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

globalStyle(".blog-iframe", {
  width: t.width[72],
  height: t.height[40],
});

globalStyle(".blog-iframe-opacity", {
  opacity: 0,
});
