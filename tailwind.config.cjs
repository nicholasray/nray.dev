const defaultTheme = require("tailwindcss/defaultTheme");
const screens = {
  sm: `${640 / 16}rem`,
  md: `${768 / 16}rem`,
  lg: `${1024 / 16}rem`,
  xl: `${1280 / 16}rem`,
  "2xl": `${1536 / 16}rem`,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}",
    // Enable auto-link heading styles.
    "./astro.config.ts",
  ],
  darkMode: "media",
  theme: {
    extend: {
      maxWidth: {
        "8xl": "84rem",
      },
      opacity: {
        2.5: ".025",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        normal: "430",
      },
      transitionProperty: {
        performant: "opacity, transform",
      },
      screens: screens,
      keyframes: {
        "transform-zero": {
          "100%": { transform: "translate(0)", opacity: 1 },
        },
        "vertical-bounce-inefficient": {
          "0%, 100%": { top: 0 },
          "50%": { top: "286px" },
        },
        "vertical-bounce-efficient": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(286px)" },
        },
      },
    },
  },
  blocklist: ["container"],
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
