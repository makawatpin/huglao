import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { cities, getCityBySlug } from "@/data/cities";
import { getArticleByCitySlug, getArticlesByCity } from "@/lib/contentful";

export async function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];
  for (const city of cities) {
    const articles = await getArticlesByCity(city.slug);
    for (const a of articles) {
      params.push({ city: city.slug, slug: a.slug });
    }
  }
  if (params.length === 0) {
    // output: "export" hard-fails the build if a dynamic route's generateStaticParams()
    // returns []. This placeholder keeps the build green until at least one Contentful
    // article has its `city` field set. The page component below returns notFound()
    // for this exact slug, so it never renders as real content.
    return [{ city: cities[0].slug, slug: "__no-city-articles-yet__" }];
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  const article = city ? await getArticleByCitySlug(citySlug, slug) : null;
  if (!city || !article) return {};
  return {
    title: `${article.title} | HUGLAO GROUP`,
    description: article.excerpt,
    robots: { index: !city.hidden },
    alternates: { canonical: `/${city.slug}/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.cover ? [article.cover] : undefined,
      type: "article",
    },
  };
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
      <h2 className="mt-9 mb-3 font-serif-th font-bold text-[1.5rem] text-deep-green-2">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: React.ReactNode) => (
      <h3 className="mt-7 mb-2.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
      <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ul className="mb-[18px] pl-6 list-disc text-[#3a3d33] text-[1.06rem] leading-[1.85]">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ol className="mb-[18px] pl-6 list-decimal text-[#3a3d33] text-[1.06rem] leading-[1.85]">{children}</ol>
    ),
    [BLOCKS.TABLE]: (_node: unknown, children: React.ReactNode) => (
      <div className="overflow-x-auto mb-[18px]">
        <table className="w-full border-collapse text-[.95rem]">
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_node: unknown, children: React.ReactNode) => (
      <tr className="border-b border-border-2">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (_node: unknown, children: React.ReactNode) => (
      <td className="px-3 py-2 align-top">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node: unknown, children: React.ReactNode) => (
      <th className="px-3 py-2 text-left font-semibold text-deep-green-2">{children}</th>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri} className="text-gold-dark font-semibold underline hover:text-gold">
        {children}
      </a>
    ),
  },
};

export default async function CityArticlePage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const article = await getArticleByCitySlug(citySlug, slug);
  if (!article) notFound();

  const cityArticles = await getArticlesByCity(citySlug);
  const related = cityArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const publishedIso = article.publishDate ? new Date(article.publishDate).toISOString() : undefined;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.cover ?? undefined,
            author: { "@type": "Organization", name: article.author || "HUGLAO GROUP" },
            publisher: {
              "@type": "Organization",
              name: "บริษัท ฮักลาว กรุ๊ป จำกัด",
              logo: { "@type": "ImageObject", url: "https://huglao.com/assets/huglao-emblem.png" },
            },
            datePublished: publishedIso,
            dateModified: publishedIso,
            mainEntityOfPage: `https://huglao.com/${city.slug}/${article.slug}`,
          }),
        }}
      />
      <div className="relative bg-deep-green-2" style={{ aspectRatio: "16/8" }}>
        {article.cover && (
          <Image src={article.cover} alt={article.title} fill sizes="100vw" className="object-cover" priority />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(8,18,11,.55),transparent 55%)" }} />
      </div>

      <div className="max-w-[760px] mx-auto px-[clamp(22px,5vw,56px)] pt-[clamp(26px,4vw,44px)] pb-[clamp(40px,5vw,60px)]">
        <nav aria-label="breadcrumb" className="text-[.85rem] mb-4 text-text-muted">
          <Link href="/" className="no-underline hover:text-gold-dark">หน้าแรก</Link>{" "}
          / <Link href={`/${city.slug}`} className="no-underline hover:text-gold-dark">{city.name}</Link>{" "}
          / <span className="text-gold-dark">{article.title}</span>
        </nav>
        <h1 className="m-0 font-serif-th font-bold text-deep-green-2 leading-[1.25]" style={{ fontSize: "clamp(1.6rem,3.6vw,2.4rem)" }}>
          {article.title}
        </h1>
        <div className="flex items-center gap-2.5 mt-4 pb-[22px] border-b border-border-2 text-[#8a8474] text-[.92rem]">
          <span className="text-gold-dark font-semibold">{article.author}</span>
          <span className="opacity-50">·</span>
          <span>{article.publishDate}</span>
        </div>

        <div className="mt-6">
          {article.content ? documentToReactComponents(article.content, richTextOptions) : null}
        </div>

        <div className="mt-[30px] pt-6 border-t border-border-2">
          <Link href={`/${city.slug}`} className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
            → ดูรถตู้{city.name}และโปรแกรมเที่ยวทั้งหมด
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-[30px] pt-6 border-t border-border-2">
            <p className="m-0 mb-3.5 font-bold text-deep-green-2 text-base">บทความอื่นเกี่ยวกับ{city.name}</p>
            <div className="flex flex-col gap-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/${city.slug}/${r.slug}`} className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
                  → {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <a
          href="https://lin.ee/xudxWlE"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 mt-[30px] px-7 py-3.5 rounded-full font-bold no-underline text-deep-green shadow-[0_12px_28px_rgba(168,120,21,.4)] hover:-translate-y-0.5 transition-transform"
          style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
        >
          วางแผนทริปลาวกับเรา →
        </a>
      </div>
    </article>
  );
}
