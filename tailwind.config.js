/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");
const constants = require("./src/constants");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
    "./contentlayer.config.js",
  ],
  theme: {
    screens: constants.screens,
    extend: {
      transitionProperty: {
        performant: "opacity, transform",
      },
      keyframes: {
        "transform-zero": {
          "100%": { transform: "translate(0)", opacity: 1 },
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.slate.400"),
            h2: {
              "&:hover .heading-link": {
                display: "block",
              },
            },
          },
        },
      }),
      colors: {
        gray: {
          50: "#F6F0FF",
          100: "#EDE5FB",
          200: "#D7C9EE",
          300: "#CBBCE6",
          400: "#AA9EBD",
          500: "#8C80A1",
          600: "#685E79",
          700: "#4B4259",
          800: "#1B102D",
          900: "#11081F",
        },
        purple: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        pink: {
          400: "#D166FF",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
