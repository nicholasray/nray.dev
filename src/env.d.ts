// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.astro" {
  const Component: import("astro/runtime/server/index.js").AstroComponentFactory;
  export default Component;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    loaders: ReturnType<typeof import("./loaders/loaders").createLoaders>;
  }
}

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly DATABASE_TOKEN: string;
  readonly KIT_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
