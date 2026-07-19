export interface BreadcrumbItem {
  name: string;
  /** absolute URL หรือ path ที่ขึ้นต้นด้วย "/" (จะเติม https://huglao.com ให้อัตโนมัติ) */
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
            item: item.href.startsWith("http") ? item.href : `https://huglao.com${item.href}`,
          })),
        }),
      }}
    />
  );
}
