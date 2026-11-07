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
        description="คู่มือและประสบการณ์จริงจากทีม HUGLAO ตั้งแต่เตรียมเอกสาร ข้ามด่าน ไปจนถึงเลือกเส้นทางและรถให้เหมาะกับทริปของคุณ"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ" }]}
      />

      <section className="bg-[#f7f3e9] py-[clamp(48px,8vw,110px)]">
        <div className="hl-shell">
          <div className="mb-6 max-w-[760px] sm:mb-8">
            <span className="hl-kicker">อ่านก่อนไปลาว</span>
            <h2 className="mt-3 font-serif-th text-[clamp(1.65rem,4vw,3.2rem)] font-bold leading-tight text-[#071d13] sm:mt-5">อ่านก่อนออกเดินทาง</h2>
            <p className="mt-2 text-[.95rem] leading-7 text-[#59645d] sm:mt-4 sm:text-base sm:leading-8">รีวิวทริปจริง เอกสารข้ามแดน และสถานที่น่าเที่ยวในลาว เลือกหมวดที่สนใจได้เลย</p>
          </div>
          <ArticleGrid articles={articles} />
        </div>
      </section>
    </main>
  );
}
