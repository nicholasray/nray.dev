// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintPluginAstro from "eslint-plugin-astro";
// @ts-expect-error react-hooks
import hooksPlugin from "eslint-plugin-react-hooks";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/.github",
      "**/.changeset",
      "public/assets/js",
    ],
    plugins: {
      "react-hooks": hooksPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ImageMetadata: true,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      ...hooksPlugin.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-undef": 0,
    },
  },
];
