import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/contentful";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://huglao.com";
  const articles = await getAllArticles();

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/articles`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.publishDate ? new Date(a.publishDate) : new Date(),
    })),
  ];
}
