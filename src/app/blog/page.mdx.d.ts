declare module "*/page.mdx" {
  // eslint-disable-next-line import/no-unresolved
  export { default } from "*.mdx";

  export const title: string;
  export const description: string;
  export const publishedAt: string;
  export const publishedAtFormatted: string;
  export const readingTime: string;
}
