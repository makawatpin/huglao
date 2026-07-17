import { createClient } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export type Article = {
  title: string;
  slug: string;
  cover: string | null;
  author: string;
  publishDate: string;
  tags: string[];
  excerpt: string;
  content: Document;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(entry: any): Article {
  const fields = entry.fields;
  const coverFile = fields.cover?.fields?.file;
  return {
    title: fields.title ?? "",
    slug: fields.slug ?? "",
    cover: coverFile ? `https:${coverFile.url}` : null,
    author: fields.author ?? "",
    publishDate: fields.publishDate ?? "",
    tags: String(fields.category ?? "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    excerpt: fields.excerpt ?? "",
    content: fields.content,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const res = await client.getEntries({
    content_type: "article",
    order: ["-fields.publishDate"],
  });
  return res.items.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
    limit: 1,
  });
  if (!res.items.length) return null;
  return toArticle(res.items[0]);
}
