// vitest.workspace.ts
import react from "@vitejs/plugin-react";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      globals: true,
      // an example of file based convention,
      // you don't have to follow it
      include: [
        "src/**/*.test.ts",
      ],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
        "**/*.browser.test.ts",
      ],
      name: "unit",
      environment: "node",
    },
  },
  {
    plugins: [react()],
    test: {
      alias: {
        "@/": new URL("./src/", import.meta.url).pathname,
        "@src/": new URL("./src/", import.meta.url).pathname,
        "@components/": new URL("./src/components/", import.meta.url).pathname,
        "@pages/": new URL("./src/pages/", import.meta.url).pathname,
        "@blog/": new URL("./src/blog/", import.meta.url).pathname,
        "@layouts/": new URL("./src/layouts/", import.meta.url).pathname,
        "@assets/": new URL("./src/assets/", import.meta.url).pathname,
        "@styles/": new URL("./src/styles/", import.meta.url).pathname,
      },
      globals: true,
      // an example of file based convention,
      // you don't have to follow it
      include: [
        "src/**/*.browser.test.ts(x)",
      ],
      name: "browser",
      browser: {
        screenshotFailures: false,
        enabled: true,
        headless: true,
        name: "chromium",
        provider: "playwright",
        // https://playwright.dev
        providerOptions: {},
      },
    },
  },
]);
