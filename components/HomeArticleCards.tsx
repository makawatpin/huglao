import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import type { ArticlePreview } from "@/data/articles";

export default function HomeArticleCards({ articles }: { articles: ArticlePreview[] }) {
  if (!articles.length) return null;
  return <section id="home-articles" className="scroll-mt-24 bg-[#f7f3e9] py-14 sm:py-20"><div className="hl-shell">
    <div className="flex items-center justify-between gap-4"><h2 className="city-heading">อ่านก่อนไปลาว</h2><Link href="/articles/" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#ddd4c1] bg-white px-4 text-xs font-semibold text-[#86611a] transition hover:border-[#b18a2f] sm:text-sm">อ่านทั้งหมด <span aria-hidden="true">↗</span></Link></div>
    <p className="mt-2 text-sm leading-7 text-[#687169]">เอกสาร การเดินทาง และเรื่องเล่าระหว่างทาง</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">{articles.map(article => <ArticleCard key={article.slug} article={article} />)}</div>
  </div></section>;
}
