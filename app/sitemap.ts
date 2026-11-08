import { PICKUP_GUIDES } from "@/data/pickup-guides";
import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/contentful";
import { LOCAL_ARTICLES } from "@/data/articles";
import { ROUTE_GROUPS, SERVICE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "/articles/wat-sisaket-vientiane",
  "/articles/nem-nuong-sihom-vientiane",
  "/articles/pho-soumuntha-vientiane",
  "/articles/lao-art-museum-vientiane",
  "",
  "/vientiane",
  "/vang-vieng",
  "/luang-prabang",
  "/car-with-driver",
  "/services",
  "/travel-with-us",
  "/van-laos",
  "/articles",
  "/articles/farsai-mookata-vientiane",
  "/articles/patuxai-vientiane",
  "/articles/pha-that-luang-vientiane",
  "/articles/pho-zap-vientiane",
  "/articles/the-mini-cafe-vang-vieng",
  "/articles/bannam-cafe-vang-vieng",
  "/articles/tham-chang-cave-vang-vieng",
  "/articles/review-one-day-trip-vientiane-2500",
  "/articles/border-pass-vs-passport-laos",
  "/articles/nam-pien-yorla-pa",
  "/articles/wat-si-muang-vientiane",
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
    ...PICKUP_GUIDES.map(p => ({ url: url(`/articles/${p.slug}`) })),
    ...STATIC_PATHS.map((path) => ({
      url: url(path),
    })),
    // Exclude the van alias and the bus page while its metadata remains noindex.
    ...VEHICLE_GROUPS.filter((vehicle) => vehicle.slug !== "van" && vehicle.slug !== "minibus-bus").map((vehicle) => ({
      url: url(`/car-with-driver/${vehicle.slug}`),
    })),
    ...ROUTE_GROUPS.map((route) => ({
      url: url(`/routes/${route.slug}`),
    })),
    // The parking page retains its noindex review status; border-pass is searchable.
    ...SERVICE_GROUPS.filter((service) => service.slug !== "xl-parking").map((service) => ({
      url: url(`/services/${service.slug}`),
    })),
    ...articles.filter((article) => !LOCAL_ARTICLES.some((local) => local.slug === article.slug)).map((article) => ({
      url: url(`/articles/${article.slug}`),
      lastModified: article.publishDate ? new Date(article.publishDate) : new Date(),
    })),
  ];
}
