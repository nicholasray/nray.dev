module.exports = {
  proseWrap: "always",
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.mdx",
      options: {
        printWidth: 80,
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
