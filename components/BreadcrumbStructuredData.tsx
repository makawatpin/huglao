import { SITE } from "@/data/site";

export interface BreadcrumbItem {
  name: string;
  /** absolute URL หรือ path ที่ขึ้นต้นด้วย "/" */
  href: string;
}

export default function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.href
              ? item.href.startsWith("http")
                ? item.href
                : `${SITE.website}${item.href.endsWith("/") ? item.href : `${item.href}/`}`
              : undefined,
          })),
        }),
      }}
    />
  );
}
