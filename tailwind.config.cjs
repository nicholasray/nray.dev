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
  content: [],
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
    },
  },
  blocklist: ["container"],
};
