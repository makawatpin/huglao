import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { getAllArticles, getArticleBySlug } from "@/lib/contentful";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | HUGLAO GROUP`,
    description: article.excerpt,
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
        <table className="w-full border-collapse text-[.95rem]">{children}</table>
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

  return (
    <article>
      <div className="relative bg-deep-green-2" style={{ aspectRatio: "16/8" }}>
        {article.cover && (
          <Image src={article.cover} alt={article.title} fill sizes="100vw" className="object-cover" priority />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(8,18,11,.55),transparent 55%)" }} />
        {article.tags[0] && (
          <span
            className="absolute bottom-[18px] left-[clamp(20px,5vw,44px)] text-[.72rem] tracking-[.16em] font-bold uppercase text-deep-green px-[14px] py-1.5 rounded-full"
            style={{ background: "linear-gradient(135deg,#e3bd63,#c8941f)" }}
          >
            {article.tags[0]}
          </span>
        )}
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
