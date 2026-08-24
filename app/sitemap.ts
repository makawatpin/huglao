import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/contentful";
import { ROUTE_GROUPS, SERVICE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "",
  "/car-with-driver",
  "/services",
  "/travel-with-us",
  "/van-laos",
  "/articles",
  "/articles/nam-pien-yorla-pa",
  "/quote",
  "/about",
  "/faq",
  "/terms",
  "/privacy",
  "/image-credits",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const url = (path: string) => `${SITE.website}${path || ""}/`;

  return [
    ...STATIC_PATHS.map((path) => ({
      url: url(path),
    })),
    ...VEHICLE_GROUPS.filter((vehicle) => vehicle.slug !== "van").map((vehicle) => ({
      url: url(`/car-with-driver/${vehicle.slug}`),
    })),
    ...ROUTE_GROUPS.map((route) => ({
      url: url(`/routes/${route.slug}`),
    })),
    ...SERVICE_GROUPS.map((service) => ({
      url: url(`/services/${service.slug}`),
    })),
    ...articles.filter((article) => article.slug !== "nam-pien-yorla-pa").map((article) => ({
      url: url(`/articles/${article.slug}`),
      lastModified: article.publishDate ? new Date(article.publishDate) : new Date(),
    })),
  ];
}
