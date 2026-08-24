import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { getAllArticles, getArticleBySlug } from "@/lib/contentful";

const ARTICLE_SEO_TITLES: Record<string, string> = {
  "car-rental-laos": "เช่ารถพร้อมคนขับเที่ยวลาว: วิธีเลือกและเช็กราคา",
};

/** จับคู่แท็กหมวดหมู่บทความกับหน้าบริการที่เกี่ยวข้อง สำหรับ internal link */
function getRelatedServices(tags: string[]): { label: string; href: string }[] {
  if (tags.some((t) => t.includes("รถไฟ"))) {
    return [
      { label: "บริการประสานตั๋วรถไฟ", href: "/services/train-ticket" },
      { label: "เส้นทางเวียงจันทน์–วังเวียง", href: "/routes/vientiane-vang-vieng" },
    ];
  }
  if (tags.some((t) => t.includes("รถตู้"))) {
    return [
      { label: "รถตู้เที่ยวลาวพร้อมคนขับ", href: "/van-laos" },
    ];
  }
  return [{ label: "ดูรถพร้อมคนขับทุกประเภท", href: "/car-with-driver" }];
}

function normalizeArticleHref(value: unknown): string {
  const href = typeof value === "string" ? value : "#";
  const path = href.replace(/^https:\/\/(?:www\.)?huglao\.com/i, "");
  if (path === "/van-vip/" || path === "/car-with-driver/van/" || path === "/#vans") {
    return "/van-laos/";
  }
  if (path === "/articles.html#a/van-rental-laos") {
    return "/articles/van-rental-laos/";
  }
  return href.replace(/^https:\/\/huglao\.com/i, "https://www.huglao.com");
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  const params = articles.map((a) => ({ slug: a.slug }));

  if (params.length === 0) {
    // Static exports require at least one generated value for a dynamic route.
    // The page returns notFound() for this placeholder, so it is never content.
    return [{ slug: "__no-articles-yet__" }];
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const seoTitle = ARTICLE_SEO_TITLES[article.slug] ?? article.title;
  return {
    title: seoTitle,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}/` },
    openGraph: {
      title: `${seoTitle} | HUGLAO`,
      description: article.excerpt,
      url: `/articles/${article.slug}/`,
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
      <a href={normalizeArticleHref(node.data.uri)} className="text-gold-dark font-semibold underline hover:text-gold">
        {children}
      </a>
    ),
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);
  const relatedServices = getRelatedServices(article.tags);
  const publishedIso = article.publishDate ? new Date(article.publishDate).toISOString() : undefined;
  const isVehicleCover = Boolean(article.cover?.includes("vehicle-") || article.cover?.includes("/van-"));

  return (
    <article>
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "บทความ", href: "/articles/" },
          { name: article.title, href: `/articles/${article.slug}/` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.cover ?? undefined,
            author: { "@type": "Organization", name: article.author || "HUGLAO" },
            publisher: {
              "@type": "Organization",
              name: "บริษัท ฮักลาว กรุ๊ป จำกัด",
              logo: { "@type": "ImageObject", url: "https://www.huglao.com/assets/huglao-emblem.png" },
            },
            datePublished: publishedIso,
            dateModified: publishedIso,
            mainEntityOfPage: `https://www.huglao.com/articles/${article.slug}/`,
          }),
        }}
      />
      <div className="mt-[72px] bg-[#071d13]">
        <div className={`relative aspect-[16/9] max-h-[520px] sm:aspect-[16/8] lg:aspect-[16/7] ${isVehicleCover ? "bg-[#eee9de]" : "bg-deep-green-2"}`}>
          {article.cover && (
            <Image src={article.cover} alt={article.title} fill sizes="100vw" className={isVehicleCover ? "object-contain p-3 sm:p-5" : "object-cover"} preload />
          )}
        </div>
        <div className="hl-shell flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4">
          {article.tags[0] ? (
            <span
              className="rounded-full px-[14px] py-1.5 text-[.7rem] font-bold uppercase tracking-[.12em] text-deep-green sm:text-[.72rem] sm:tracking-[.16em]"
              style={{ background: "linear-gradient(135deg,#e3bd63,#c8941f)" }}
            >
              {article.tags[0]}
            </span>
          ) : <span />}
          <Link href="/image-credits" className="rounded-full border border-white/15 px-3 py-1.5 text-[.68rem] font-semibold text-white hover:border-[#d8af4a]">เครดิตภาพ</Link>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-[clamp(22px,5vw,56px)] pt-[clamp(26px,4vw,44px)] pb-[clamp(40px,5vw,60px)]">
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

        <div className="flex flex-wrap gap-2 mt-[26px] pt-6 border-t border-border-2">
          {article.tags.map((t) => (
            <span key={t} className="text-[.82rem] text-[#7a7565] bg-[#f1ece0] border border-border-2 px-[14px] py-1.5 rounded-full">
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-[30px] pt-6 border-t border-border-2">
          <p className="m-0 mb-3.5 font-bold text-deep-green-2 text-base">บริการที่เกี่ยวข้อง</p>
          <div className="flex flex-col gap-2">
            {relatedServices.map((s) => (
              <Link key={s.href} href={s.href} className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
                → {s.label}
              </Link>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-[30px] pt-6 border-t border-border-2">
            <p className="m-0 mb-3.5 font-bold text-deep-green-2 text-base">บทความที่เกี่ยวข้อง</p>
            <div className="flex flex-col gap-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/articles/${r.slug}`} className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
                  → {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          href="/travel-with-us"
          className="inline-flex items-center gap-2 mt-[30px] px-7 py-3.5 rounded-full font-bold no-underline text-deep-green shadow-[0_12px_28px_rgba(168,120,21,.4)] hover:-translate-y-0.5 transition-transform"
          style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
        >
          เที่ยวลาวกับเรา →
        </Link>
      </div>
    </article>
  );
}
