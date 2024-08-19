import { defineMiddleware } from "astro:middleware";
import { createLoaders } from "./loaders/loaders";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  context.locals.runtime.env.DB;
  context.locals.loaders = createLoaders(context.locals.runtime.env.DB);

  return next();
});
