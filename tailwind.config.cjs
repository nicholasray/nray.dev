const { screens } = require("./src/constants.cjs");

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
  plugins: [require("@tailwindcss/typography")],
};
