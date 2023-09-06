import { globalStyle, style } from "@vanilla-extract/css";
import * as t from "@styles/tokens";

export const prose = style({
  ...t.fontSize("base"),
  lineHeight: 1.75,

  vars: {
    "--prose-headings": "#18181b",
    "--prose-links": "#18181b",
    "--prose-bold": "#18181b",
    "--prose-counters": "#71717a",
    "--prose-bullets": "#d4d4d8",
    "--prose-captions": "#71717a",
    "--prose-code": "#18181b",
    "--prose-th-borders": "#d4d4d8",
    "--prose-td-borders": "#e4e4e7",
    "--prose-invert-headings": "#fff",
    "--prose-invert-links": "#fff",
    "--prose-invert-bold": "#fff",
    "--prose-invert-counters": "#a1a1aa",
    "--prose-invert-bullets": "#52525b",
    "--prose-invert-captions": "#a1a1aa",
    "--prose-invert-code": "#fff",
    "--prose-invert-th-borders": "#52525b",
    "--prose-invert-td-borders": "#3f3f46",
  },
  "@media": {
    [t.mediaQuery("dark")]: {
      vars: {
        "--prose-headings": "var(--prose-invert-headings)",
        "--prose-links": "var(--prose-invert-links)",
        "--prose-bold": "var(--prose-invert-bold)",
        "--prose-counters": "var(--prose-invert-counters)",
        "--prose-bullets": "var(--prose-invert-bullets)",
        "--prose-code": "var(--prose-invert-code)",
        "--prose-th-borders": "var(--prose-invert-th-borders)",
        "--prose-td-borders": "var(--prose-invert-td-borders)",
      },
    },
    [t.mediaQuery("lg")]: {
      fontSize: "1.1875rem",
      lineHeight: 1.8,
    },
  },
});

globalStyle(
  `h1,h2,h3,h4,h5,h6,th`
    .split(",")
    .map((s) => `${prose} ${s}`)
    .join(","),
  {
    fontWeight: t.fontWeight.extrabold,
    letterSpacing: t.letterSpacing.tight,
    color: "var(--prose-headings)",
  },
);

globalStyle(
  `h2,h3,h4,h5,h6`
    .split(",")
    .map((s) => `${prose} ${s}`)
    .join(","),
  {
    marginInlineStart: "-" + t.space[8],
    paddingInlineStart: t.space[8],
  },
);

globalStyle(
  `h2,h3,h4,h5,h6`
    .split(",")
    .map((s) => `${prose} ${s}:hover .heading-link`)
    .join(","),
  {
    display: "block",
    opacity: t.opacity["100"],
  },
);

globalStyle(
  `h1,h2,h3,h4,h5,h6`
    .split(",")
    .map((s) => `${prose} ${s} + *`)
    .join(","),
  {
    marginBlockStart: 0,
  },
);

globalStyle(`${prose} h1`, {
  ...t.fontSize("4xl"),
  marginBlockStart: 0,
  marginBlockEnd: t.space["8"],
  lineHeight: 1.1111111,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("5xl"),
      marginBlockEnd: t.space["10"],
      lineHeight: t.lineHeight["none"],
    },
  },
});

globalStyle(`${prose} h2`, {
  ...t.fontSize("2xl"),
  marginBlockStart: t.space["12"],
  marginBlockEnd: t.space["6"],
  lineHeight: 1.3333333,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("3xl"),
      marginBlockStart: t.space["14"],
      marginBlockEnd: t.space["8"],
      lineHeight: 1.3333333,
    },
  },
});

globalStyle(`${prose} h3`, {
  ...t.fontSize("xl"),
  marginBlockEnd: t.space["3"],
  lineHeight: 1.6,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("2xl"),
      marginBlockStart: t.space["10"],
      marginBlockEnd: t.space["4"],
      lineHeight: t.lineHeight.normal,
    },
  },
});

globalStyle(`${prose} h4`, {
  ...t.fontSize("xl"),
  marginBlockStart: t.space["6"],
  marginBlockEnd: t.space["2"],
  lineHeight: t.lineHeight.normal,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("2xl"),
      marginBlockStart: t.space["8"],
      marginBlockEnd: t.space["2"],
      lineHeight: 1.5555556,
    },
  },
});

globalStyle(`${prose} figure`, {
  ...t.my(8),
});

globalStyle(`${prose} figcaption`, {
  ...t.fontSize("sm"),
  lineHeight: 1.4285714,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("base"),
      lineHeight: t.lineHeight.normal,
    },
  },
});

globalStyle(`${prose} ul, ${prose} ol`, {
  ...t.my(5),
  listStyleType: "disc",
  paddingInlineStart: "1.625rem",
  lineHeight: 1.4285714,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.my(6),
      paddingInlineStart: t.space["7"],
    },
  },
});

globalStyle(`${prose} ul li::marker`, {
  color: "var(--prose-bullets)",
});

globalStyle(`${prose} ol li::marker`, {
  color: "var(--prose-counters)",
});

globalStyle(`${prose} li`, {
  ...t.my(2),
  paddingInlineStart: t.space["1.5"],
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.my(3),
      paddingInlineStart: t.space["2"],
    },
  },
});

globalStyle(`${prose} pre`, {
  ...t.fontSize("sm"),
  ...t.py(3),
  overflowX: "auto",
  lineHeight: 1.7142857,
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.py(4),
      ...t.fontSize("base"),

      lineHeight: 1.5,
    },
  },
});

globalStyle(`${prose} code`, {
  ...t.fontSize("sm"),
  fontWeight: t.fontWeight["semibold"],
  lineHeight: "inherit",
  color: "var(--prose-code)",
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("base"),
      lineHeight: 1.5,
    },
  },
});

globalStyle(`${prose} code::before`, {
  content: "`",
});

globalStyle(`${prose} code::after`, {
  content: "`",
});

globalStyle(`${prose} pre code`, {
  fontWeight: "inherit",
});

globalStyle(`${prose} pre code::before, ${prose} pre code::after`, {
  content: "none",
});

globalStyle(`${prose} table`, {
  ...t.my(7),
  ...t.fontSize("sm"),
  lineHeight: 1.7142857,
  width: t.width.full,
  tableLayout: "auto",
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.fontSize("base"),
      lineHeight: 1.5,
    },
  },
});

globalStyle(`${prose} thead`, {
  borderBottomWidth: t.borderWidth[1],
  borderBottomColor: "var(--prose-th-borders)",
});

globalStyle(`${prose} th`, {
  ...t.px(2),
  paddingBlockEnd: t.space["2"],
  textAlign: "start",
  "@media": {
    [t.mediaQuery("lg")]: {
      ...t.px(3),
      paddingBlockEnd: t.space["3"],
    },
  },
});

globalStyle(`${prose} th:first-child`, {
  paddingInlineStart: t.space["0"],
});

globalStyle(`${prose} tr`, {
  borderBottomWidth: t.borderWidth[1],
  borderBottomColor: "var(--prose-td-borders)",
});

globalStyle(`${prose} tr:last-child`, {
  borderBottomWidth: t.borderWidth[0],
});

globalStyle(`${prose} td`, {
  padding: t.space["2"],
  "@media": {
    [t.mediaQuery("lg")]: {
      padding: t.space["3"],
    },
  },
});

globalStyle(`${prose} td:first-child`, {
  paddingInlineStart: t.space[0],
});

globalStyle(`${prose} img`, {
  ...t.my(8),
});

globalStyle(`${prose} figcaption`, {
  marginBlockStart: t.space["8"],
});

globalStyle(`${prose} p`, {
  marginBlockEnd: t.space["5"],
  "@media": {
    [t.mediaQuery("lg")]: {
      marginBlockEnd: t.space["6"],
    },
  },
});

globalStyle(`${prose} strong`, {
  fontWeight: t.fontWeight["semibold"],
  color: "var(--prose-bold)",
});

globalStyle(`${prose} figcaption`, {
  display: "flex",
  justifyContent: "center",
  color: "var(--prose-captions)",
});

globalStyle(`${prose} figcaption p`, {
  color: "var(--prose-captions)",
});

globalStyle(`${prose} a`, {
  fontWeight: t.fontWeight.medium,
  color: "var(--prose-links)",
  textDecoration: "underline",
});

globalStyle(`${prose} > :last-child`, {
  marginBlockEnd: `${t.space["0"]} !important`,
});

globalStyle(`${prose} .figure-item`, {
  ...t.my(8),
});

globalStyle(`${prose} .aside`, {
  ...t.my(8),
  "@media": {
    [t.mediaQuery("md")]: {
      ...t._mx(6),
    },
  },
});

globalStyle(`${prose} [data-rehype-pretty-code-title]`, {
  ...t.fontSize("sm"),
  ...t.py(1.5),
  color: t.color.zinc["300"],
  paddingBlockStart: t.space[1.5],
  paddingInlineStart: "calc(1rem + 4px)",
  paddingInlineEnd: t.space[0.5],
  fontFamily: t.fontFamily.mono,
  display: "flex",
  minHeight: "2.5rem",
  alignItems: "center",
});

globalStyle(`${prose} [data-rehype-pretty-code-fragment]`, {
  ...t._mx(4),
  ...t.my(8),
  background: "#0f172af2",
  "@media": {
    [t.mediaQuery("dark")]: {
      background: "#0C0E12",
    },
    [t.mediaQuery("md")]: {
      ...t._mx(6),
      overflow: "hidden",
      borderRadius: t.borderRadius.lg,
    },
  },
});

globalStyle(`${prose} [data-rehype-pretty-code-fragment] code`, {
  display: "grid",
});

globalStyle(`${prose} [data-line-numbers]`, {
  counterReset: "line",
});

globalStyle(`${prose} [data-line-numbers] > [data-line]::before`, {
  counterIncrement: "line",
  content: "counter(line)",
  marginInlineEnd: t.space["4"],
  display: "inline-block",
  width: t.width["4"],
  textAlign: "center",
  color: t.color.zinc["500"],
});

globalStyle(
  `${prose} [data-line-numbers-max-digits="2"] > [data-line]::before`,
  {
    width: t.width["6"],
  },
);

globalStyle(
  `${prose} [data-line-numbers-max-digits="3"] > [data-line]::before`,
  {
    width: t.width["8"],
  },
);

globalStyle(`${prose} [data-line]`, {
  borderLeftWidth: t.borderWidth[4],
  borderLeftColor: t.color.transparent,
  paddingInlineStart: "calc(1rem - 4px)",
  paddingInlineEnd: "calc(1rem - 4px)",
  "@media": {
    [t.mediaQuery("md")]: {
      paddingInlineStart: "calc(1.5rem - 4px)",
      paddingInlineEnd: "calc(1.5rem - 4px)",
    },
  },
});

globalStyle(`${prose} [data-highlighted-chars]`, {
  borderRadius: t.borderRadius.md,
  borderBottomWidth: t.borderWidth[2],
  borderBottomColor: t.color.emerald["300"],
  background: "#324062",
  padding: t.space["1"],
  "@media": {
    [t.mediaQuery("dark")]: {
      background: "181c25",
    },
  },
});

globalStyle(`${prose} [data-highlighted-line]`, {
  borderLeftColor: "#3bbae5",
  background: "#64748b33",
  "@media": {
    [t.mediaQuery("dark")]: {
      borderLeftColor: "#428fa9",
      background: "#181c25",
    },
  },
});

globalStyle(`${prose} .heading-link`, {
  opacity: 0,
  textDecorationLine: "none",
  position: "absolute",
  marginInlineStart: "-" + t.space["8"],
});

globalStyle(`${prose} .heading-link::before`, {
  content: "#",
});
