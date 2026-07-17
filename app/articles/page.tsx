import type { Metadata } from "next";
import { getAllArticles } from "@/lib/contentful";
import ArticleGrid from "@/components/ArticleGrid";

export const metadata: Metadata = {
  title: "บทความ & เรื่องเล่าเที่ยวลาว | HUGLAO GROUP",
  description:
    "รวมบทความ เคล็ดลับ และเรื่องเล่าการเที่ยวลาวจากทีม HUGLAO GROUP — เส้นทาง รถตู้ VIP ตั๋วรถไฟลาว-จีน และไกด์นำเที่ยว",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <section
        className="relative overflow-hidden py-[clamp(70px,11vw,120px)] px-[clamp(20px,5vw,48px)] pb-[clamp(56px,8vw,84px)] text-[#fbf7ec]"
        style={{ background: "linear-gradient(165deg,#0a1f14,#123524)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(200,148,31,.06) 0 2px,transparent 2px 16px),repeating-linear-gradient(-45deg,rgba(200,148,31,.045) 0 2px,transparent 2px 16px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div className="relative max-w-[1180px] mx-auto text-center">
          <span className="inline-block text-gold-light font-bold tracking-[.22em] text-[.82rem] uppercase">
            บทความ & เรื่องเล่า
          </span>
          <h1
            className="mt-4 font-serif-th font-bold leading-[1.16]"
            style={{ fontSize: "clamp(2.1rem,5.4vw,3.6rem)", letterSpacing: "-.01em" }}
          >
            เรื่องเล่าเที่ยวลาว จากทีมฮักลาว
          </h1>
          <p className="mt-[18px] mx-auto max-w-[52ch] text-[#cfc9b6]" style={{ fontSize: "clamp(1rem,2vw,1.18rem)", lineHeight: 1.7 }}>
            เคล็ดลับเส้นทาง รีวิวที่เที่ยว ข้อมูลรถตู้ VIP และตั๋วรถไฟลาว–จีน อัปเดตโดยทีมงานไทย–ลาวของเรา
          </p>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto py-[clamp(44px,6vw,72px)] px-[clamp(20px,5vw,48px)] pb-[clamp(80px,10vw,120px)]">
        <ArticleGrid articles={articles} />
      </section>
    </div>
  );
}
