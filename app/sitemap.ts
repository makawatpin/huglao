import type { MetadataRoute } from "next";
import { getAllArticles, getArticlesByCity } from "@/lib/contentful";
import { cities } from "@/data/cities";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://huglao.com";
  const articles = await getAllArticles();
  const visibleCities = cities.filter((c) => !c.hidden);

  const cityArticleEntries: MetadataRoute.Sitemap = [];
  for (const city of visibleCities) {
    const cityArticles = await getArticlesByCity(city.slug);
    for (const a of cityArticles) {
      cityArticleEntries.push({
        url: `${base}/${city.slug}/${a.slug}`,
        lastModified: a.publishDate ? new Date(a.publishDate) : new Date(),
      });
    }
  }

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/van-vip`, lastModified: new Date() },
    { url: `${base}/laos-travel`, lastModified: new Date() },
    ...visibleCities.map((c) => ({
      url: `${base}/${c.slug}`,
      lastModified: new Date(),
    })),
    ...cityArticleEntries,
    { url: `${base}/articles`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.publishDate ? new Date(a.publishDate) : new Date(),
    })),
  ];
}
