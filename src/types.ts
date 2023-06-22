import type { getPost } from "./api";

export type Post = Awaited<ReturnType<typeof getPost>>;
