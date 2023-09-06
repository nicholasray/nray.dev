import { space, type Space } from "./space";

export const mx = (value: Space) => {
  return {
    marginInlineStart: space[value],
    marginInlineEnd: space[value],
  };
};

export const _mx = (value: Exclude<Space, "auto" | "px">) => {
  return {
    marginInlineStart: "-" + space[value],
    marginInlineEnd: "-" + space[value],
  };
};

export const my = (value: Space) => {
  return {
    marginBlockStart: space[value],
    marginBlockEnd: space[value],
  };
};

export const px = (value: Space) => {
  return {
    paddingInlineStart: space[value],
    paddingInlineEnd: space[value],
  };
};

export const py = (value: Space) => {
  return {
    paddingBlockStart: space[value],
    paddingBlockEnd: space[value],
  };
};

// Adapted from Tailwind CSS 3.3.3
// https://github.com/tailwindlabs/tailwindcss/blob/9a52f90fe9b6814aa8c156ccc348ef5b129f6a4e/stubs/config.full.js

// Borders
export const borderWidth = {
  0: "0px",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
};

export type BorderWidth = keyof typeof borderWidth;

// Breakpoints
export const breakpoint = {
  sm: `${640 / 16}rem`,
  md: `${768 / 16}rem`,
  lg: `${1024 / 16}rem`,
  xl: `${1280 / 16}rem`,
  "2xl": `${1536 / 16}rem`,
};

// MediaFeature
const mediaFeature = {
  motionSafe: "(prefers-reduced-motion: no-preference)",
  motionReduce: "(prefers-reduced-motion)",
  dark: "(prefers-color-scheme: dark)",
};

export type Breakpoint = keyof typeof breakpoint;
export type MediaFeature = keyof typeof mediaFeature;

export const mediaQuery = (...args: (Breakpoint | MediaFeature)[]) => {
  return args
    .reduce((result, current) => {
      if (current in breakpoint) {
        result.push(
          `screen and (min-width: ${breakpoint[current as Breakpoint]})`,
        );
        return result;
      }

      result.push(mediaFeature[current as MediaFeature]);

      return result;
    }, [] as string[])
    .join(" and ");
};

interface TransformOpts {
  translateX?: string;
  translateY?: string;
  rotate?: string;
  skewX?: string;
  skewY?: string;
  scaleX?: number | string;
  scaleY?: number | string;
}

export const transform = (opts: TransformOpts) => {
  return {
    vars: Object.keys(opts).reduce<{ [key: string]: string }>(
      (result, current) => {
        if (current !== undefined) {
          result[`--${current}`] =
            opts[current as keyof TransformOpts]!.toString();
        }

        return result;
      },
      {},
    ),
    transform:
      "translate(var(--translateX, 0),var(--translateY, 0)) rotate(var(--rotate, 0)) skew(var(--skewX, 0)) skewY(var(--skewY, 0)) scaleX(var(--scaleX, 1)) scaleY(var(--scaleY, 1))",
  };
};

export const transition = () => {
  return {
    transitionProperty: "opacity,transform",
    transitionDuration: "0.3s",
    transitionTimingFunction: "cubic-bezier(0.4,0,.2,1)",
  };
};

// Ring
export const ringWidth = {
  base: "3px",
  0: "0px",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
};

export type RingWidth = keyof typeof ringWidth;

interface RingOpts {
  width: string;
  color: string;
}

export const ring = (opts: RingOpts) => {
  return { boxShadow: `0 0 0 ${opts.width} ${opts.color}` };
};

// Colors
export * from "./colors";

// Widths
export const width = {
  ...space,
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
  full: "100%",
  screen: "100vw",
  svw: "100svw",
  lvw: "100lvw",
  dvw: "100dvw",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
};

// Heights
export const height = {
  ...space,
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  full: "100%",
  screen: "100vh",
  svh: "100svh",
  lvh: "100lvh",
  dvh: "100dvh",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
};

export type Height = keyof typeof height;

// Max-heights
export const maxHeight = {
  none: "none",
  full: "100%",
  screen: "100vh",
  svh: "100svh",
  lvh: "100lvh",
  dvh: "100dvh",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
};

export type MaxHeight = keyof typeof maxHeight;

// Max-widths
export const maxWidth = {
  none: "none",
  0: "0rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "84rem",
  full: "100%",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
  prose: "65ch",
};

export type MaxWidth = keyof typeof maxWidth;

// Rounded
export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

export type BorderRadius = keyof typeof borderRadius;

// Spacings
export * from "./space";

// Shadows
export const boxShadow = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
};

export type BoxShadow = keyof typeof boxShadow;

// Typography
export * from "./typography";

// Z-index
export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto",
};

export type ZIndex = keyof typeof zIndex;

// Rotate
export const rotate = {
  0: "0deg",
  1: "1deg",
  2: "2deg",
  3: "3deg",
  6: "6deg",
  12: "12deg",
  45: "45deg",
  90: "90deg",
  180: "180deg",
};

export type Rotate = keyof typeof rotate;

// Opacity
export const opacity = {
  0: "0",
  5: "0.05",
  10: "0.1",
  15: "0.15",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  35: "0.35",
  40: "0.4",
  45: "0.45",
  50: "0.5",
  55: "0.55",
  60: "0.6",
  65: "0.65",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  85: "0.85",
  90: "0.9",
  95: "0.95",
  100: "1",
};

export type Opacity = keyof typeof opacity;
