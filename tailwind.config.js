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
            "[data-rehype-pretty-code-fragment]": {
              marginTop: theme("margin.8"),
              marginBottom: theme("margin.8"),

              "[data-rehype-pretty-code-title]": {
                backgroundColor: '#2a1c40',
                fontFamily: `${theme("fontFamily.mono").join(',')}`,
                color: theme('colors.gray.400'),
                fontSize: theme('fontSize.sm')[0],
                padding: `${theme('padding[0.5]')} ${theme('padding.2')}`,
                borderRadius: `${theme('borderRadius.DEFAULT')} ${theme('borderRadius.DEFAULT')} 0 0`
              },

              "[data-rehype-pretty-code-title] ~ pre": {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },

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
                  background: "rgba(200,200,255,0.1)",
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
    require("@tailwindcss/typography"),
    // ...
  ],
};
