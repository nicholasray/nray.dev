/**
 * Adapted options from:
 * https://www.mediawiki.org/wiki/Manual:Coding_conventions/SVG#Exemplified_safe_configuration
 */
module.exports = {
  plugins: [
    {
      // Set of built-in plugins enabled by default.
      name: "preset-default",
      params: {
        overrides: {
          cleanupIds: false,
          removeDesc: false,
          removeTitle: false,
          removeViewBox: false,
          removeXMLProcInst: false,
        },
      },
    },
    "removeRasterImages",
    "sortAttrs",
  ],
  multipass: true,
};
