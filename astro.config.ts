import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./remark/remarkReadingTime";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
  ],
});
