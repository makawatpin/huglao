import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "ขอราคารถพร้อมคนขับ",
  description: "ส่งวันเดินทาง จุดรับ เส้นทาง จำนวนผู้โดยสาร สัมภาระ และประเภทรถ เพื่อขอราคาจาก HUGLAO",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <main>
      <PageHero
        eyebrow="Request a quote"
        title="ส่งแผนการเดินทางเพื่อขอราคา"
        description="กรอกข้อมูลทริปเพื่อสร้างสรุป แล้วส่งให้ HUGLAO ทาง LINE OA การส่งแบบฟอร์มเป็นคำขอราคา ยังไม่ใช่การยืนยันจอง"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ขอราคา" }]}
      />
      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,110px)]">
        <div className="hl-shell"><QuoteForm /></div>
      </section>
    </main>
  );
}
