/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const constants = require("./src/constants");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/blog/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/contact.mdx",
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
        "vertical-bounce-inefficient": {
          "0%, 100%": { top: 0 },
          "50%": { top: "286px" },
        },
        "vertical-bounce-efficient": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(286px)" },
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h2,h3,h4,h5,h6": {
              "margin-left": `-${theme("margin.8")}`,
              "padding-left": theme("padding.8"),

              "&:hover .heading-link": {
                opacity: theme("opacity.100"),
              },
            },
            color: theme("colors.slate.400"),
            h2: {
              "&:hover .heading-link": {
                display: "block",
              },
            },

            "[data-rehype-pretty-code-title]": {
              backgroundColor: "#2a1c40",
              fontFamily: `${theme("fontFamily.mono").join(",")}`,
              fontSize: theme("fontSize.sm")[0],
              color: theme("colors.gray.400"),
              paddingTop: theme("padding[0.5]"),
              paddingRight: theme("padding[0.5]"),
              paddingBottom: theme("padding[0.5]"),
              paddingLeft: "calc(1rem + 4px)",
              borderTopLeftRadius: theme("borderRadius.DEFAULT"),
              borderTopRightRadius: theme("borderRadius.DEFAULT"),
            },

            "[data-rehype-pretty-code-title] ~ pre": {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },

            "[data-rehype-pretty-code-fragment]": {
              marginTop: theme("margin.8"),
              marginBottom: theme("margin.8"),

              pre: {
                background: theme("colors.gray.800"),
                marginTop: 0,
                marginBottom: 0,

                ".line": {
                  paddingLeft: theme("padding.4"),
                  borderLeftWidth: theme("borderWidth.4"),
                  borderLeftColor: "transparent",
                },
                ".line--highlighted": {
                  background: "#26173b",
                  borderLeftColor: theme("colors.purple.400"),
                },

                "code[data-line-numbers]": {
                  counterReset: "line",
                },

                "code[data-line-numbers] > .line::before": {
                  counterIncrement: "line",
                  content: "counter(line)",

                  /* Other styling */
                  display: "inline-block",
                  width: theme("width.4"),
                  marginRight: theme("margin.6"),
                  textAlign: "right",
                  color: theme("colors.gray.400"),
                },

                "code[data-line-numbers] > .line--highlighted::before": {
                  color: theme("colors.gray.100"),
                },
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
    plugin(function ({ addVariant }) {
      // Add your custom styles here
      addVariant("animation-safe", `@media ${constants.animations}`);
    }),
    require("@tailwindcss/typography"),
    // ...
  ],
};
