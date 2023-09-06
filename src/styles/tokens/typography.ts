export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  widest: "0.1em",
};

export type LetterSpacing = keyof typeof letterSpacing;

export const lineHeight = {
  "3": ".75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
};

export type LineHeight = keyof typeof lineHeight;

export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

export type FontWeight = keyof typeof fontWeight;

const fontSizeMap = {
  xs: { fontSize: "0.75rem", lineHeight: lineHeight[4] },
  sm: { fontSize: "0.875rem", lineHeight: lineHeight[5] },
  base: { fontSize: "1rem", lineHeight: lineHeight[6] },
  lg: { fontSize: "1.125rem", lineHeight: lineHeight[7] },
  xl: { fontSize: "1.25rem", lineHeight: lineHeight[7] },
  "2xl": { fontSize: "1.5rem", lineHeight: lineHeight[8] },
  "3xl": { fontSize: "1.875rem", lineHeight: lineHeight[9] },
  "4xl": { fontSize: "2.25rem", lineHeight: lineHeight[10] },
  "5xl": { fontSize: "3rem", lineHeight: lineHeight["none"] },
  "6xl": { fontSize: "3.75rem", lineHeight: lineHeight["none"] },
  "7xl": { fontSize: "4.5rem", lineHeight: lineHeight["none"] },
  "8xl": { fontSize: "6rem", lineHeight: lineHeight["none"] },
  "9xl": { fontSize: "8rem", lineHeight: lineHeight["none"] },
};

export type FontSize = keyof typeof fontSizeMap;

export const fontSize = (value: FontSize) => {
  return fontSizeMap[value];
};

export const fontFamily = {
  sans: `Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  serif: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
  mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
};

export type FontFamily = keyof typeof fontFamily;
