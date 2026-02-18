import { getCollection } from "astro:content";
import { plainify } from "@lib/text-converter";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const searchIndex = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description || "",
    categories: post.data.categories,
    tags: post.data.tags,
    content: plainify(post.body || "").slice(0, 500),
    image: post.data.image || "",
    date: post.data.date.toISOString(),
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: { "Content-Type": "application/json" },
  });
};
