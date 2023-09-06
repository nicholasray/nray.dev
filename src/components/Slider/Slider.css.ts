import { style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const slider = style({
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  "::-webkit-slider-runnable-track": {
    marginBlockStart: "calc(var(--handle-size)/2)",
    marginBlockEnd: "calc(var(--handle-size)/2)",
    borderRadius: t.borderRadius.lg,
    background: t.color.zinc[200],
    width: "calc(100% - var(--handle-size))",
    height: "var(--track-size)",
  },
  "::-webkit-slider-thumb": {
    WebkitAppearance: "none",
    appearance: "none",
    borderRadius: t.borderRadius.full,
    background: t.color.zinc[600],
    boxShadow: t.boxShadow["md"],
    height: "var(--handle-size)",
    width: "var(--handle-size)",
    transform: "translateY(calc((var(--track-size) / 2) - 50%))",
  },
  "::-moz-range-track": {
    marginBlockStart: "calc(var(--handle-size)/2)",
    marginBlockEnd: "calc(var(--handle-size)/2)",
    borderRadius: t.borderRadius.full,
    background: t.color.zinc["200"],
    width: "calc(100% - var(--handle-size))",
    height: "var(--track-size)",
  },
  "::-moz-range-thumb": {
    borderRadius: t.borderRadius.full,
    background: t.color.zinc[600],
    boxShadow: t.boxShadow["md"],
    border: "none",
    height: "var(--handle-size)",
    width: "var(--handle-size)",
  },
  vars: {
    "--handle-size": "1.5rem",
    "--track-size": "8px",
  },
  selectors: {
    "&:focus-visible::-webkit-slider-thumb": {
      background: t.color.zinc["500"],
    },
    "&:focus-visible::-moz-range-thumb": {
      background: t.color.zinc["500"],
    },
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      "::-webkit-slider-runnable-track": {
        background: "rgba(63, 63, 70, 0.75)",
      },
      "::-webkit-slider-thumb": {
        background: t.color.zinc[200],
      },
      "::-moz-range-track": {
        background: t.color.zinc["700"],
      },
      "::-moz-range-thumb": {
        background: t.color.zinc["200"],
      },
      selectors: {
        "&:focus-visible::-webkit-slider-thumb": {
          background: t.color.white,
        },
        "&:focus-visible::-moz-range-thumb": {
          background: t.color.white,
        },
      },
    },
  },
});
