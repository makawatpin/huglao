import type { Metadata } from "next";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import { HOME_FAQS, PICKUP_POINTS } from "@/data/site";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย",
  description: "คำตอบเรื่องรถพร้อมคนขับ จุดรับ ประเภทรถ ราคา และขั้นตอนขอราคากับ HUGLAO",
  alternates: { canonical: "/faq/" },
};

const FAQS = [
  ...HOME_FAQS,
  { question: "มีจุดรับใดบ้าง?", answer: `จุดรับที่กำหนดไว้ ได้แก่ ${PICKUP_POINTS.map((point) => point.name).join(", ")} โดยต้องยืนยันสถานีและตำแหน่งนัดพบอีกครั้งในข้อเสนอ` },
  { question: "รถที่ได้จะเป็นรุ่นเดียวกับภาพหรือไม่?", answer: "รุ่นรถและปีรถขึ้นอยู่กับรถที่ว่างในวันเดินทาง โดย HUGLAO จะแจ้งรายละเอียดก่อนลูกค้ายืนยัน" },
  { question: "เปลี่ยนแผนระหว่างทริปได้หรือไม่?", answer: "แจ้งความต้องการกับผู้ประสานงานก่อน การเปลี่ยนเส้นทาง เวลา หรือระยะทางอาจมีค่าใช้จ่ายเพิ่มเติมซึ่งต้องยืนยันก่อนดำเนินการ" },
] as const;

export default function FaqPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />
      <PageHero eyebrow="Frequently asked questions" title="คำถามที่พบบ่อย" description="ข้อมูลสำคัญก่อนส่งคำขอราคาและยืนยันการเดินทางกับ HUGLAO" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "คำถามที่พบบ่อย" }]} />
      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,110px)]">
        <div className="hl-shell max-w-[900px] divide-y divide-[#d8d0be] border-y border-[#d8d0be]">
          {FAQS.map((faq) => <details key={faq.question} className="py-1"><summary className="cursor-pointer py-5 font-semibold text-[#0a2d20]">{faq.question}</summary><p className="pb-6 leading-8 text-[#59645d]">{faq.answer}</p></details>)}
        </div>
      </section>
      <LineCta />
    </main>
  );
}
