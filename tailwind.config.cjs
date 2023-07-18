const { screens } = require("./src/constants.cjs");
const defaultTheme = require("tailwindcss/defaultTheme");

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
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
      },
      transitionProperty: {
        performant: "opacity, transform",
      },
      screens: screens,
      // boxShadow: {
      //   'input': `0 0 0 1px ${defaultTheme.colork}`
      // },
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
  plugins: [require("@tailwindcss/typography")],
};
