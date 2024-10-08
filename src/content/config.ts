// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string().max(160),
        tags: z.array(z.string()).optional(),
        cover: z.object({
          src: image(),
          alt: z.string(),
          credit: z.string().optional(),
          position: z.string().optional(),
        }),
        featured: z.boolean().optional(),
        publishedAt: z
          .date()
          .optional()
          .transform((val) => {
            if (!val) {
              return undefined;
            }

            val.setUTCHours(12, 0, 0, 0);
            return val;
          }),
        updatedAt: z
          .date()
          .optional()
          .transform((val) => {
            if (!val) {
              return undefined;
            }

            val.setUTCHours(12, 0, 0, 0);
            return val;
          }),
      })
      .transform((values) => ({
        ...values,
        get updatedAt() {
          return values["updatedAt"] || values["publishedAt"];
        },
      })),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
};
