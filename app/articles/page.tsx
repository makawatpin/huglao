import type { Metadata } from "next";
import ArticleGrid from "@/components/ArticleGrid";
import PageHero from "@/components/PageHero";
import { mergeArticlePreviews } from "@/data/articles";
import { getAllArticles } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "บทความเตรียมเที่ยวลาว",
  description: "บทความเตรียมตัวเที่ยวลาว วิธีเดินทาง เส้นทางจากเวียงจันทน์ และการเลือกรถให้เหมาะกับทริปจาก HUGLAO",
  alternates: { canonical: "/articles/" },
};

export default async function ArticlesPage() {
  const articles = mergeArticlePreviews(await getAllArticles());

  return (
    <main>
      <PageHero
        eyebrow="บทความและคู่มือ"
        title="ข้อมูลที่ช่วยให้วางแผนทริปได้มั่นใจกว่าเดิม"
        description="รวมบทความจริงจาก HUGLAO เกี่ยวกับการเตรียมตัว เส้นทางจากเวียงจันทน์ และการเลือกรถ โดยไม่แสดงหัวข้อจำลองซ้ำกับบทความ"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ" }]}
      />

      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,110px)]">
        <div className="hl-shell">
          <div className="mb-10 max-w-[760px]">
            <span className="hl-kicker">บทความล่าสุด</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-[#071d13]">อ่านข้อมูลก่อนวางแผนเดินทาง</h2>
            <p className="mt-4 leading-8 text-[#59645d]">เลือกอ่านตามหมวดหมู่ เนื้อหาแต่ละรายการจะแสดงเพียงครั้งเดียว แม้ข้อมูลต้นทางจะมีรายการชื่อหรือ URL ซ้ำกัน</p>
          </div>
          <ArticleGrid articles={articles} />
        </div>
      </section>
    </main>
  );
}
