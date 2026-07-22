import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

const TITLE = "เมืองเฟือง 1 วัน 1 คืน: ตักบาตรริมน้ำที่แพเมืองเฟือง แล้วไปนอนอ่างน้ำตง";
const DESCRIPTION =
  "เล่าทริปเมืองเฟืองจากประสบการณ์ตรงของทีม HUGLAO GROUP เช้าตักบาตรพระที่แพเมืองเฟืองริมแม่น้ำ บ่ายนั่งรถไปพักบ้านพักลอยน้ำที่อ่างน้ำตง บรรยากาศเงียบสงบกลางหุบเขา พร้อมทริคเตรียมตัวและการเดินทาง";
const UPDATED = "2026-07-23";
const COVER = "/assets/muangfeuang-ang-namtong-panorama.webp";
const PATH = "/muangfeuang/ang-namtong-raft";

export const metadata: Metadata = {
  title: `${TITLE} | HUGLAO GROUP`,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [COVER],
    type: "article",
  },
};

export default function MuangFeuangAngNamTongArticle() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: DESCRIPTION,
            image: `https://huglao.com${COVER}`,
            author: { "@type": "Organization", name: "HUGLAO GROUP", url: "https://huglao.com/about" },
            reviewedBy: { "@type": "Person", name: "ทีมงานปฏิบัติการ HUGLAO GROUP" },
            publisher: {
              "@type": "Organization",
              name: "บริษัท ฮักลาว กรุ๊ป จำกัด",
              logo: { "@type": "ImageObject", url: "https://huglao.com/assets/huglao-emblem.png" },
            },
            datePublished: UPDATED,
            dateModified: UPDATED,
            mainEntityOfPage: `https://huglao.com${PATH}`,
          }),
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "เที่ยวลาว", href: "/laos-travel" },
          { name: "เมืองเฟือง", href: "/muangfeuang" },
          { name: TITLE, href: PATH },
        ]}
      />

      <div className="relative bg-deep-green-2" style={{ aspectRatio: "16/8" }}>
        <Image src={COVER} alt="วิวพาโนรามาบ้านพักลอยน้ำอ่างน้ำตง เมืองเฟือง ประเทศลาว" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(8,18,11,.55),transparent 55%)" }} />
        <span
          className="absolute bottom-[18px] left-[clamp(20px,5vw,44px)] text-[.72rem] tracking-[.16em] font-bold uppercase text-deep-green px-[14px] py-1.5 rounded-full"
          style={{ background: "linear-gradient(135deg,#e3bd63,#c8941f)" }}
        >
          เมืองเฟือง
        </span>
      </div>

      <div className="max-w-[760px] mx-auto px-[clamp(22px,5vw,56px)] pt-[clamp(26px,4vw,44px)] pb-[clamp(40px,5vw,60px)]">
        <nav aria-label="breadcrumb" className="text-[.85rem] mb-3 text-text-muted">
          <Link href="/" className="no-underline hover:text-gold-dark">หน้าแรก</Link>{" "}
          / <Link href="/laos-travel" className="no-underline hover:text-gold-dark">เที่ยวลาว</Link>{" "}
          / <Link href="/muangfeuang" className="no-underline hover:text-gold-dark">เมืองเฟือง</Link>
        </nav>

        <h1 className="m-0 font-serif-th font-bold text-deep-green-2 leading-[1.25]" style={{ fontSize: "clamp(1.6rem,3.6vw,2.4rem)" }}>
          {TITLE}
        </h1>
        <div className="flex flex-wrap items-center gap-2.5 mt-4 pb-[22px] border-b border-border-2 text-[#8a8474] text-[.92rem]">
          <span className="text-gold-dark font-semibold">เขียนโดยทีมงาน HUGLAO GROUP</span>
          <span className="opacity-50">·</span>
          <span>เล่าจากทริปพาแขกจริง</span>
          <span className="opacity-50">·</span>
          <span>อัปเดตล่าสุด 23 ก.ค. 2026</span>
        </div>

        <div className="mt-6">
          <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
            เมืองเฟืองเป็นเมืองเล็ก ๆ ที่หลายคนมักขับผ่านระหว่างทางไปวังเวียง ทั้งที่จริงแล้วเป็นจุดพักที่คุ้มค่าไม่แพ้กัน
            ทริปนี้ทีม HUGLAO GROUP พาแขกไปสัมผัสสองบรรยากาศในทริปเดียว เริ่มจากเช้ามืดตักบาตรริมแม่น้ำที่{" "}
            <strong>แพเมืองเฟือง</strong> ก่อนนั่งรถต่อไปพักผ่อนที่บ้านพักลอยน้ำริม <strong>อ่างน้ำตง</strong> อ่างเก็บน้ำกลางหุบเขาที่เงียบสงบมาก
          </p>

          <h2 className="mt-9 mb-3 font-serif-th font-bold text-[1.5rem] text-deep-green-2">
            เช้าที่แพเมืองเฟือง: ตักบาตรพระริมแม่น้ำ
          </h2>
          <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
            เช้าตรู่ที่แพเมืองเฟือง เป็นช่วงเวลาที่พลาดไม่ได้ถ้ามาพัก พระสงฆ์จากวัดใกล้เคียงจะพายเรือมารับบิณฑบาตกันตามริมน้ำ
            แขกที่พักแพสามารถเตรียมของทำบุญง่าย ๆ อย่างข้าวสวย นมกล่อง หรือขนม แล้วนั่งรอตักบาตรจากระเบียงแพได้เลย
            ไม่ต้องเดินทางไปไหน บรรยากาศเงียบสงบ มีหมอกบาง ๆ ลอยเหนือผิวน้ำ และภูเขาหินปูนเป็นฉากหลัง เป็นช่วงเวลาที่แขกหลายคนบอกว่าประทับใจที่สุดของทริป
          </p>
          <div className="my-6 rounded-2xl overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/assets/muangfeuang-raft-almsgiving.webp"
              alt="นักท่องเที่ยวใส่บาตรพระบนเรือที่แพเมืองเฟือง ยามเช้า"
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className="object-cover"
            />
          </div>

          <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
            หลังตักบาตรเสร็จ ยังพอมีเวลาเดินเล่นบนทางเดินไม้ของแพ กินอาหารเช้าแบบชิล ๆ มองสายน้ำที่ไหลผ่านหน้าห้องพัก
            หรือจะนั่งเรือหางยาวล่องแม่น้ำสั้น ๆ ชมภูเขาหินปูนรอบเมืองเฟืองก็ได้เช่นกัน เหมาะกับคนที่อยากได้จังหวะพักผ่อนแบบไม่รีบร้อน
          </p>
          <div className="my-6 rounded-2xl overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/assets/muangfeuang-raft-riverview.webp"
              alt="ระเบียงแพเมืองเฟืองมองเห็นแม่น้ำและภูเขาหินปูนยามเช้า"
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className="object-cover"
            />
          </div>

          <h2 className="mt-9 mb-3 font-serif-th font-bold text-[1.5rem] text-deep-green-2">
            บ่าย: นั่งรถต่อไปอ่างน้ำตง
          </h2>
          <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
            จากแพเมืองเฟือง ทีมขับรถพาแขกต่อไปยังอ่างน้ำตง อ่างเก็บน้ำขนาดใหญ่ที่ซ่อนตัวอยู่กลางหุบเขา ล้อมรอบด้วยเนินเขาสีเขียวและป่าไม้
            เส้นทางเป็นถนนลัดเลาะภูเขา ระหว่างทางจะเห็นวิวทุ่งนาและหมู่บ้านเล็ก ๆ ของคนท้องถิ่นเป็นระยะ
          </p>

          <h3 className="mt-7 mb-2.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">
            บรรยากาศที่อ่างน้ำตง
          </h3>
          <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
            จุดเด่นของอ่างน้ำตงคือบ้านพักหลังคาสังกะสีทรงจั่วที่ปลูกยื่นออกไปในน้ำเรียงรายกันเป็นแนวยาว เชื่อมด้วยสะพานไม้ไผ่ทอดยาวกลางอ่างเก็บน้ำ
            น้ำในอ่างนิ่งและใสจนสะท้อนภูเขาและท้องฟ้าได้ชัดเจน โดยเฉพาะช่วงเช้าที่ยังไม่มีลม ภาพสะท้อนจะสวยที่สุด
            บรรยากาศโดยรวมเงียบสงบมาก แทบไม่มีเสียงรบกวน เหมาะกับคนที่อยากหนีความวุ่นวายไปนั่งเฉย ๆ ฟังเสียงน้ำและเสียงนก
          </p>
          <div className="my-6 rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/10" }}>
            <Image
              src="/assets/muangfeuang-ang-namtong-cabins.webp"
              alt="บ้านพักหลังคาจั่วริมอ่างน้ำตง เมืองเฟือง ท่ามกลางแมกไม้และภูเขา"
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className="object-cover"
            />
          </div>
          <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
            ตอนเย็นแนะนำให้เดินออกไปสุดสะพานไม้ไผ่ที่ยื่นไกลที่สุด แล้วนั่งรอพระอาทิตย์ตกที่ค่อย ๆ ลับหลังแนวเขา แสงสีทองจะทาบลงบนผิวน้ำทั้งอ่าง
            เป็นมุมถ่ายรูปที่แขกของเรามักจะหยุดถ่ายนานที่สุดในทริป
          </p>
          <div className="my-6 rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/10" }}>
            <Image
              src="/assets/muangfeuang-ang-namtong-boardwalk.webp"
              alt="สะพานไม้ไผ่ทอดยาวเชื่อมบ้านพักลอยน้ำกลางอ่างน้ำตง เมืองเฟือง"
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className="object-cover"
            />
          </div>

          <h2 className="mt-9 mb-3 font-serif-th font-bold text-[1.5rem] text-deep-green-2">
            เตรียมตัวยังไงดี
          </h2>
          <ul className="mb-[18px] pl-6 list-disc text-[#3a3d33] text-[1.06rem] leading-[1.85]">
            <li>เตรียมของทำบุญง่าย ๆ ไปเองถ้าอยากตักบาตรที่แพเมืองเฟือง (ข้าวสวย นมกล่อง ขนมแห้ง)</li>
            <li>ช่วงเช้าที่อ่างน้ำตงค่อนข้างเย็น โดยเฉพาะเดือนพ.ย.–ก.พ. ควรมีเสื้อกันหนาวติดตัว</li>
            <li>ทางเดินไม้ริมน้ำอาจลื่นหลังฝนตก ควรใส่รองเท้าที่เกาะพื้นได้ดี</li>
            <li>สัญญาณโทรศัพท์ในพื้นที่อ่างน้ำตงค่อนข้างอ่อน เหมาะกับคนที่อยากพักจากหน้าจอจริง ๆ</li>
          </ul>

          <div className="mt-8 p-5 md:p-6 rounded-2xl border border-border-2 bg-[#f4f0e6]">
            <p className="m-0 mb-1.5 font-bold text-deep-green-2 text-[1rem]">เกี่ยวกับผู้เขียน</p>
            <p className="m-0 text-[#5e6258] text-[.92rem] leading-[1.7]">
              บทความนี้เรียบเรียงจากประสบการณ์ตรงของทีมปฏิบัติการ HUGLAO GROUP ที่พาแขกไปพักแพเมืองเฟืองและอ่างน้ำตงจริง
              ภาพประกอบทั้งหมดถ่ายโดยทีมงานระหว่างทริป ไม่ใช่ภาพสต็อก อ่านข้อมูลบริการรถตู้เมืองเฟืองเพิ่มเติมได้ที่หน้า{" "}
              <Link href="/muangfeuang" className="text-gold-dark font-semibold underline hover:text-gold">
                รถตู้เมืองเฟือง
              </Link>
              {" "}หรือดูจุดหมายเที่ยวลาวอื่น ๆ ได้ที่หน้า{" "}
              <Link href="/laos-travel" className="text-gold-dark font-semibold underline hover:text-gold">
                เที่ยวลาว
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-[30px] pt-6 border-t border-border-2">
          <p className="m-0 mb-3.5 font-bold text-deep-green-2 text-base">บริการที่เกี่ยวข้อง</p>
          <div className="flex flex-col gap-2">
            <Link href="/muangfeuang" className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
              → รถตู้เมืองเฟือง พร้อมคนขับ
            </Link>
            <Link href="/van-vip" className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
              → ดูรถตู้ VIP เที่ยวลาวทั้งหมด
            </Link>
          </div>
        </div>

        <a
          href="https://lin.ee/xudxWlE"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 mt-[30px] px-7 py-3.5 rounded-full font-bold no-underline text-deep-green shadow-[0_12px_28px_rgba(168,120,21,.4)] hover:-translate-y-0.5 transition-transform"
          style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
        >
          วางแผนทริปเมืองเฟืองกับเรา →
        </a>
      </div>
    </article>
  );
}
