const { screens } = require("./src/constants.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
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
            h2: {
              "&:hover .heading-link": {
                display: "block",
              },
            },
            "picture > img": {
              marginTop: "0 !important",
              marginBottom: "0 !important",
            },
            "[data-rehype-pretty-code-title]": {
              backgroundColor: theme("colors.zinc.800"),
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
              borderRadius: theme("borderRadius.2xl"),
              overflow: "hidden",
              marginTop: theme("margin.8"),
              marginBottom: theme("margin.8"),

              pre: {
                background: "#0C0E13",
                borderRadius: 0,
                marginTop: 0,
                marginBottom: 0,

                ".line": {
                  paddingLeft: theme("padding.4"),
                  borderLeftWidth: theme("borderWidth.4"),
                  borderLeftColor: "transparent",
                },
                ".line--highlighted": {
                  background: "#191d29",
                  borderLeftColor: theme("colors.sky.400"),
                },
                code: {
                  display: "grid",
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
                  color: theme("colors.zinc.500"),
                },

                "code[data-line-numbers] > .line--highlighted::before": {
                  color: theme("colors.gray.100"),
                },
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
