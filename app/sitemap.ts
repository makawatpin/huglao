import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/contentful";
import { ROUTE_GROUPS, SERVICE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "",
  "/car-with-driver",
  "/routes",
  "/services",
  "/travel-with-us",
  "/laos-travel",
  "/articles",
  "/quote",
  "/van-vip",
  "/about",
  "/contact",
  "/faq",
  "/terms",
  "/privacy",
  "/image-credits",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  return [
    ...STATIC_PATHS.map((path) => ({
      url: `${SITE.website}${path}`,
      lastModified: new Date(),
    })),
    ...VEHICLE_GROUPS.map((vehicle) => ({
      url: `${SITE.website}/car-with-driver/${vehicle.slug}`,
      lastModified: new Date(),
    })),
    ...ROUTE_GROUPS.map((route) => ({
      url: `${SITE.website}/routes/${route.slug}`,
      lastModified: new Date(),
    })),
    ...SERVICE_GROUPS.map((service) => ({
      url: `${SITE.website}/services/${service.slug}`,
      lastModified: new Date(),
    })),
    ...articles.map((article) => ({
      url: `${SITE.website}/articles/${article.slug}`,
      lastModified: article.publishDate ? new Date(article.publishDate) : new Date(),
    })),
  ];
}
