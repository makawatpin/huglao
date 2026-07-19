import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

const LINE_URL = "https://lin.ee/xudxWlE";

export const metadata: Metadata = {
  title: "เกี่ยวกับ HUGLAO | ผู้ช่วยวางแผนเที่ยวลาวด้วยตัวเอง พร้อมรถและคนขับ",
  description:
    "HUGLAO ช่วยคุณเที่ยวลาวด้วยตัวเองในแบบของคุณเอง วางแผน จัดหา และประสานรถเช่าพร้อมคนขับกับบริการจากพาร์ตเนอร์ในลาว ไม่ใช่กรุ๊ปทัวร์ ออกแบบทริปได้เอง เริ่มต้นผ่าน LINE",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "เกี่ยวกับ HUGLAO — เที่ยวลาวด้วยตัวเอง ให้คนท้องถิ่นพาไป",
    description:
      "ผู้ช่วยวางแผน จัดหา และประสานรถพร้อมคนขับกับบริการที่เกี่ยวข้องในลาว ออกแบบทริปได้เอง ไม่ใช่กรุ๊ปทัวร์",
    url: "/about",
    type: "website",
  },
};

const HELPS = [
  { title: "วางแผน", body: "ให้คำแนะนำเรื่องเส้นทาง ประเภทรถ และบริการที่เหมาะกับทริปของคุณ" },
  { title: "จัดหา", body: "ค้นหารถ คนขับ และบริการจากเครือข่ายพาร์ตเนอร์ในลาว" },
  { title: "ประสาน", body: "ติดต่อและจัดการรายละเอียดกับพาร์ตเนอร์แทนคุณ" },
  { title: "ตรวจสอบ", body: "ยืนยันความพร้อมของบริการก่อนเสนอให้คุณตัดสินใจ" },
];

const NOT_TOUR = [
  "คุณเป็นคนเลือกจุดหมายและเส้นทางเอง",
  "คุณกำหนดวัน เวลา และจังหวะการเดินทางเอง",
  "รถและคนขับดูแลเฉพาะกลุ่มของคุณ",
  "เราให้คำแนะนำ แต่ไม่ตัดสินใจแทนคุณ",
];

const WHO = [
  { title: "เดินทางคนเดียว", body: "อยากเที่ยวอิสระ แต่ต้องการคนช่วยเรื่องรถและเส้นทาง" },
  { title: "คู่รัก", body: "อยากได้ทริปส่วนตัว ยืดหยุ่น ปรับได้ตามใจ" },
  { title: "ครอบครัวและผู้สูงอายุ", body: "ต้องการความสะดวก ปลอดภัย และรถที่นั่งสบาย" },
  { title: "กลุ่มเพื่อน", body: "เที่ยวหลายวัน หลายเมือง ต้องการรถที่รองรับสัมภาระ" },
  { title: "กลุ่มองค์กรหรือคณะดูงาน", body: "เดินทางเป็นหมู่คณะ ต้องการการประสานงานที่เป็นระบบ" },
  { title: "คนที่มีแผนแล้วแต่ยังไม่มีรถ", body: "วางแผนเองเรียบร้อย แค่ต้องการรถพร้อมคนขับ" },
  { title: "คนที่ยังไม่รู้จะเริ่มยังไง", body: "แค่บอกความต้องการ เราช่วยแนะนำตั้งแต่ต้น" },
];

const SERVICES = [
  { name: "รถพร้อมคนขับ", body: "รถตู้ SUV MPV มินิบัส และรถบัส เลือกตามจำนวนคนและสัมภาระ" },
  { name: "ไกด์นำเที่ยว", body: "ประสานไกด์ตามเมือง ภาษา และรูปแบบทริป" },
  { name: "โรงแรมและร้านอาหาร", body: "ค้นหาและประสานที่พัก ร้านอาหารตามเส้นทางและงบประมาณ" },
  { name: "ตั๋วรถไฟลาว–จีน", body: "ประสานการจองตั๋วและวางแผนการเดินทางเชื่อมต่อ" },
  { name: "เจ้าหน้าที่รักษาความปลอดภัย", body: "จัดหาและประสานจากพาร์ตเนอร์ตามความต้องการและพื้นที่" },
];

const STEPS = [
  { title: "แจ้งแผนผ่าน LINE", body: "บอกวันเดินทาง จำนวนคน จุดรับ จุดหมาย และรูปแบบที่ต้องการ" },
  { title: "รับคำแนะนำ", body: "เราช่วยแนะนำประเภทรถ เส้นทาง และบริการที่เหมาะกับทริป" },
  { title: "ตรวจสอบพาร์ตเนอร์", body: "เราตรวจสอบรถ คนขับ และบริการที่ว่างตามวันและพื้นที่" },
  { title: "พิจารณาข้อเสนอ", body: "คุณได้รับรายละเอียด ขอบเขตบริการ และราคาก่อนตัดสินใจ" },
];

const WHY = [
  { icon: "🗺️", title: "ออกแบบทริปตามความต้องการ", body: "เลือกสถานที่ เวลา และรูปแบบการเดินทางให้เหมาะกับไลฟ์สไตล์ของคุณ" },
  { icon: "🤝", title: "พาร์ตเนอร์ท้องถิ่น", body: "เชื่อมต่อรถ คนขับ และบริการจากเครือข่ายในลาว ที่รู้จักเส้นทางและพื้นที่จริง" },
  { icon: "🚐", title: "เลือกรถตามการใช้งานจริง", body: "พิจารณาจากจำนวนคน สัมภาระ เส้นทาง และระดับความสะดวก" },
  { icon: "🧩", title: "ประสานหลายบริการในที่เดียว", body: "รถ ไกด์ ที่พัก ร้านอาหาร รถไฟ จบในการพูดคุยครั้งเดียว" },
];

const FAQS = [
  {
    q: "HUGLAO เป็นบริษัททัวร์หรือไม่?",
    a: "HUGLAO ไม่ใช่กรุ๊ปทัวร์ เราทำหน้าที่ช่วยวางแผน จัดหา และประสานรถพร้อมคนขับกับบริการที่เกี่ยวข้อง เพื่อให้คุณออกแบบการเดินทางได้ตามความต้องการ",
  },
  {
    q: "สามารถออกแบบเส้นทางเองได้หรือไม่?",
    a: "ได้ คุณสามารถแจ้งเมือง สถานที่ เวลา และรูปแบบการเดินทางที่ต้องการ ทีมงานจะช่วยตรวจสอบความเหมาะสมและประสานบริการให้",
  },
  {
    q: "ควรเลือกรถแบบไหน?",
    a: "ควรพิจารณาจากจำนวนผู้เดินทาง จำนวนกระเป๋า ระยะทาง และระดับความสะดวก หากยังไม่แน่ใจ แจ้งข้อมูลให้ทีมงานช่วยแนะนำได้",
  },
  {
    q: "จองรถไฟ โรงแรม ไกด์ และรถพร้อมกันได้หรือไม่?",
    a: "สามารถแจ้งความต้องการให้ทีมงานช่วยตรวจสอบและประสานบริการแต่ละประเภทได้ ขึ้นอยู่กับความพร้อมและเงื่อนไขในวันเดินทาง",
  },
  {
    q: "การกด LINE ถือเป็นการยืนยันการจองหรือไม่?",
    a: "ยังไม่ถือเป็นการยืนยัน การเริ่มพูดคุยผ่าน LINE เป็นเพียงจุดเริ่มต้น คุณจะได้รับรายละเอียดและราคาครบก่อนตัดสินใจยืนยันเสมอ",
  },
];

export default function AboutPage() {
  return (
    <div>
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "เกี่ยวกับเรา", href: "/about" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <section
        id="top"
        className="relative overflow-hidden py-16 md:py-[clamp(112px,15vw,152px)] px-[clamp(20px,5vw,48px)] pb-6 md:pb-[clamp(48px,7vw,72px)]"
        style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(200,148,31,.06) 0 2px,transparent 2px 16px),repeating-linear-gradient(-45deg,rgba(200,148,31,.045) 0 2px,transparent 2px 16px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div className="relative max-w-[1180px] mx-auto">
          <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px]" style={{ color: "#b7b29d" }}>
            <Link href="/" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              หน้าแรก
            </Link>{" "}
            / <span className="text-gold-light">เกี่ยวกับเรา</span>
          </nav>
          <div className="max-w-[820px]">
            <span className="inline-block text-gold-light font-bold tracking-[.2em] text-[.8rem] uppercase">
              เกี่ยวกับ HUGLAO
            </span>
            <h1
              className="mt-4 font-serif-th font-bold leading-[1.2]"
              style={{ fontSize: "clamp(2rem,5.6vw,3.4rem)", letterSpacing: "-.01em" }}
            >
              ผู้ช่วยวางแผนเที่ยวลาวด้วยตัวเอง พร้อมรถและคนขับ
            </h1>
            <p className="mt-5 max-w-[64ch]" style={{ color: "#cfc9b6", fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75 }}>
              <strong className="text-[#f4ecd7]">HUGLAO (ฮักลาว)</strong> คือผู้ช่วยวางแผน จัดหา และประสานรถพร้อมคนขับกับบริการที่เกี่ยวข้อง สำหรับคนที่อยากเที่ยวลาวด้วยตัวเอง โดยไม่ต้องจัดการทุกอย่างคนเดียว คุณเลือกจุดหมาย วัน เวลา และจังหวะการเดินทางได้เอง แล้วให้ทีมงานช่วยดูแลเรื่องรถและการประสานงานให้
            </p>
            <p className="mt-3.5 max-w-[64ch]" style={{ color: "#a29c8c", fontSize: "1rem", lineHeight: 1.75 }}>
              เราไม่ใช่กรุ๊ปทัวร์ และไม่มีตารางที่บังคับให้คุณต้องเดินตาม ทริปเป็นของคุณ — เราแค่ทำให้มันง่ายขึ้น
            </p>
            <p className="mt-5 italic text-gold-light text-[1.02rem]">Connecting Thailand &amp; Laos</p>
            <div className="flex flex-wrap gap-3.5 mt-[26px]">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-[15px] font-bold text-deep-green no-underline text-[1rem] hover:-translate-y-1 transition-transform"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)", boxShadow: "0 16px 36px rgba(168,120,21,.45)" }}
              >
                เริ่มวางแผนทริปผ่าน LINE →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT IS HUGLAO ===== */}
      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-8 md:pt-[clamp(48px,7vw,72px)]">
        <h2 className="mt-0 mb-4 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
          HUGLAO คืออะไร?
        </h2>
        <p className="text-[1.08rem] leading-[1.9] text-[#3c3e33]">
          HUGLAO เป็นบริการภายใต้ <strong>บริษัท ฮักลาว กรุ๊ป จำกัด (HUGLAO GROUP CO., LTD.)</strong> ที่ทำหน้าที่เป็นตัวกลางเชื่อมนักเดินทางกับเครือข่ายพาร์ตเนอร์ในลาว พูดง่าย ๆ คือ ถ้าคุณอยากไปเที่ยวเวียงจันทน์ วังเวียง หลวงพระบาง หรือเมืองอื่น ๆ ในลาวด้วยตัวเอง แต่ไม่อยากปวดหัวกับการหารถ หาคนขับที่รู้เส้นทาง หรือประสานบริการต่าง ๆ เอง — HUGLAO เข้ามาช่วยตรงนี้
        </p>
        <div className="grid grid-cols-2 gap-3 mt-6 md:mt-8 md:gap-[18px] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {HELPS.map((h, i) => (
            <Reveal key={h.title} delay={0.06 * (i + 1)}>
              <div className="h-full bg-white border border-border rounded-2xl p-3.5 md:p-[22px]">
                <h3 className="m-0 mb-2 text-[.94rem] md:text-[1.02rem] text-deep-green-2">{h.title}</h3>
                <p className="m-0 text-text-muted text-[.84rem] md:text-[.9rem] leading-[1.55] md:leading-[1.6]">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== NOT A TOUR ===== */}
      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <h2 className="mt-0 mb-4 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
          HUGLAO ไม่ใช่กรุ๊ปทัวร์
        </h2>
        <p className="text-[1.08rem] leading-[1.9] text-[#3c3e33] mb-5">
          กรุ๊ปทัวร์มักมาพร้อมตารางที่กำหนดไว้แล้ว ต้องเที่ยวตามเวลาที่เขาจัด ไปกับคนที่ไม่รู้จัก และเปลี่ยนแปลงอะไรได้ยาก HUGLAO ต่างออกไป:
        </p>
        <ul className="flex flex-col gap-2.5">
          {NOT_TOUR.map((t) => (
            <li key={t} className="flex gap-2.5 text-[#3c3e33] text-[1rem] leading-[1.7]">
              <span className="text-gold-dark shrink-0">✓</span>
              {t}
            </li>
          ))}
        </ul>
        <p className="text-[1.08rem] leading-[1.9] text-[#3c3e33] mt-5">
          เราออกแบบบริการให้เหมาะกับคนที่ <strong>อยากมีอิสระในการเที่ยว แต่ก็อยากมีคนช่วยดูแลเรื่องยุ่งยาก</strong> ไปพร้อมกัน
        </p>
      </section>

      {/* ===== WHO ===== */}
      <section id="who" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">เหมาะกับใคร</span>
        <h2 className="mt-3 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          HUGLAO เหมาะกับใคร?
        </h2>
        <p className="mb-4 md:mb-[30px] text-text-muted text-[1.02rem] leading-[1.8] max-w-[70ch]">
          เราไม่ได้แบ่งลูกค้าตามอายุ แต่แบ่งตามรูปแบบและความต้องการในการเดินทาง ไม่ว่าคุณจะเป็นใคร ถ้าคุณอยากเที่ยวลาวด้วยตัวเอง เราช่วยได้
        </p>
        <div className="grid gap-3 md:gap-[18px] md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {WHO.map((w, i) => (
            <Reveal key={w.title} delay={0.05 * (i + 1)}>
              <div className="h-full bg-white border border-border rounded-2xl p-3.5 md:p-[22px]">
                <h3 className="m-0 mb-2 text-[.94rem] md:text-[1rem] text-deep-green-2">{w.title}</h3>
                <p className="m-0 text-text-muted text-[.84rem] md:text-[.9rem] leading-[1.55] md:leading-[1.6]">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services-detail" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">บริการ</span>
        <h2 className="mt-3 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          ใช้บริการอะไรกับ HUGLAO ได้บ้าง?
        </h2>
        <p className="mb-4 md:mb-[30px] text-text-muted text-[1.02rem] leading-[1.8] max-w-[80ch]">
          นอกจากรถเช่าพร้อมคนขับในลาวซึ่งเป็นบริการหลัก เรายังช่วยประสานบริการอื่น ๆ ที่เกี่ยวข้องกับการเดินทาง เพื่อให้คุณวางแผนได้ครบในที่เดียว
        </p>
        <div className="overflow-x-auto rounded-2xl" style={{ boxShadow: "0 14px 34px rgba(10,31,20,.08)" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">บริการ</th>
                <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">ช่วยเรื่องอะไร</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s, i) => (
                <tr key={s.name} className={i % 2 === 1 ? "bg-[#f4f0e6]" : undefined}>
                  <td className="border border-border px-4 py-3.5 text-[.96rem] font-semibold text-deep-green-2 whitespace-nowrap">{s.name}</td>
                  <td className="border border-border px-4 py-3.5 text-[.94rem] text-text-muted">{s.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-text-muted text-[.9rem] leading-[1.8] max-w-[80ch]">
          <strong className="text-deep-green-2">หมายเหตุ:</strong> รถ คนขับ และบริการส่วนหนึ่งมาจากเครือข่ายพาร์ตเนอร์ในลาว HUGLAO ไม่ได้เป็นเจ้าของรถหรือบริการทั้งหมด ทุกบริการจะตรวจสอบความพร้อม เอกสาร ราคา และเงื่อนไขล่าสุดก่อนเสนอให้คุณยืนยัน
        </p>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="process" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">ทำงานกับเราอย่างไร</span>
        <h2 className="mt-3 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          ทำงานกับ HUGLAO อย่างไร?
        </h2>
        <p className="mb-4 md:mb-[30px] text-text-muted text-[1.02rem] leading-[1.8] max-w-[80ch]">
          เราเริ่มต้นทุกอย่างผ่าน LINE เว็บไซต์ของเราไม่มีแบบฟอร์มให้กรอก เพราะเราเชื่อว่าการพูดคุยโดยตรงช่วยให้เข้าใจความต้องการของคุณได้ดีกว่า
        </p>
        <div className="grid grid-cols-2 gap-3 md:gap-[18px] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {STEPS.map((step, i) => (
            <div key={step.title} className="bg-white border border-border rounded-2xl px-3.5 py-4 md:px-[18px] md:py-[22px]">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-deep-green-2 text-gold-light font-bold text-[.85rem] md:text-base flex items-center justify-center mb-2.5 md:mb-3">
                {i + 1}
              </div>
              <h3 className="m-0 mb-1.5 text-[.9rem] md:text-[.98rem] text-deep-green-2">{step.title}</h3>
              <p className="m-0 text-text-muted text-[.8rem] md:text-[.88rem] leading-[1.5] md:leading-[1.6]">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-text-muted text-[.9rem] leading-[1.8] max-w-[80ch]">
          <strong className="text-deep-green-2">สำคัญ:</strong> การเริ่มพูดคุยผ่าน LINE ยังไม่ถือเป็นการยืนยันการจอง คุณพิจารณาได้เต็มที่ก่อนตัดสินใจ
        </p>
      </section>

      {/* ===== WHY ===== */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">ทำไมต้อง HUGLAO</span>
        <h2 className="mt-3 mb-5 md:mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          เที่ยวอย่างอิสระ โดยไม่ต้องจัดการทุกอย่างคนเดียว
        </h2>
        <div className="grid gap-3 md:gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {WHY.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * (i + 1)}>
              <div className="h-full bg-white border border-border rounded-2xl p-4 md:p-[26px]">
                <div className="text-[1.2rem] md:text-[1.4rem] mb-2 md:mb-2.5">{item.icon}</div>
                <h3 className="m-0 mb-1.5 md:mb-2 text-[.96rem] md:text-[1.05rem] text-deep-green-2">{item.title}</h3>
                <p className="m-0 text-text-muted text-[.86rem] md:text-[.94rem] leading-[1.6] md:leading-[1.7]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="max-w-[840px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">คำถามที่พบบ่อย</span>
        <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          FAQ
        </h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq) => (
            <details key={faq.q} className="bg-white border border-border rounded-2xl px-[22px] py-1.5">
              <summary className="cursor-pointer list-none py-4 font-semibold text-deep-green-2 text-[1rem] flex justify-between gap-3.5">
                {faq.q}
                <span className="text-gold-dark">+</span>
              </summary>
              <p className="mb-4 text-text-muted leading-[1.75] text-[.94rem]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] mt-10 md:mt-[clamp(64px,8vw,96px)] pb-14 md:pb-[clamp(80px,10vw,120px)]">
        <div
          className="rounded-[24px] p-[clamp(36px,6vw,60px)] flex flex-wrap gap-9 items-center justify-between"
          style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
        >
          <div className="max-w-[520px]">
            <h2 className="mt-0 mb-3.5 font-serif-th font-bold" style={{ fontSize: "clamp(1.6rem,3.2vw,2.2rem)" }}>
              พร้อมเริ่มวางแผนทริปลาวของคุณแล้วหรือยัง?
            </h2>
            <p className="m-0 text-[#cfc9b6] text-[1rem] leading-[1.8]">
              ไม่ว่าคุณจะมีแผนอยู่แล้ว หรือยังไม่รู้ว่าจะเริ่มตรงไหน แค่ทักมาคุยกับเรา แล้วให้ HUGLAO ช่วยดูแลการเดินทางของคุณ
            </p>
            <div className="flex gap-3.5 mt-[26px] flex-wrap">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="no-underline rounded-full px-7 py-3.5 font-bold text-deep-green text-[.98rem]"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
              >
                วางแผนทริปผ่าน LINE →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
