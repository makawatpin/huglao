import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LineCta from "@/components/LineCta";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getMedia } from "@/data/media";
import { getCurrentPriceRows } from "@/data/pricing";
import { SITE } from "@/data/site";

const ARTICLE_PATH = "/articles/nam-pien-yorla-pa";
const TITLE = "น้ำเปี่ยนยอละปา: วางแผนทริปป่าฝนและกิจกรรมผจญภัยจากเวียงจันทน์";
const DESCRIPTION =
  "คู่มือเที่ยวน้ำเปี่ยนยอละปาจากเวียงจันทน์ รวมกิจกรรมเด่น ช่วงเวลาน่าเที่ยว สิ่งที่ควรเตรียม และราคารถรับ–ส่ง";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ARTICLE_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    images: ["/assets/commons-waterfall-forest.webp"],
  },
};

const PREP_ITEMS = [
  "ตรวจเวลาเปิด–ปิด แพ็กเกจกิจกรรม และเงื่อนไขอายุ น้ำหนัก หรือสุขภาพกับผู้ให้บริการโดยตรง",
  "สวมรองเท้าที่ยึดเกาะดี เตรียมเสื้อผ้าที่แห้งเร็ว ยากันแมลง และถุงกันน้ำสำหรับโทรศัพท์",
  "แจ้งเวลานัดรับ จำนวนคน สัมภาระ และเวลาที่ต้องการเดินทางกลับให้ทีมรถทราบล่วงหน้า",
  "เผื่อเวลาเมื่อเดินทางช่วงฝน เพราะสภาพถนนและกิจกรรมกลางแจ้งอาจเปลี่ยนได้",
] as const;

const ACTIVITY_GROUPS = [
  {
    title: "ชมป่าจากมุมสูง",
    body: "เว็บไซต์ทางการระบุว่ามี canopy walk ซึ่งเป็นเครือข่ายสะพานและทางเดินเหนือเรือนยอดไม้ เหมาะกับผู้ที่อยากสัมผัสบรรยากาศป่าโดยไม่ต้องเร่งทำกิจกรรมหนักตลอดวัน",
  },
  {
    title: "กิจกรรมเหนือพื้นป่า",
    body: "ตัวเลือกที่เผยแพร่มีทั้ง zipline, roller coaster zipline และ bike zipline แต่ละกิจกรรมมีรูปแบบและข้อจำกัดต่างกัน จึงควรตรวจแพ็กเกจที่เปิดจริงในวันเดินทาง",
  },
  {
    title: "เดินป่าและพักกับธรรมชาติ",
    body: "มีข้อมูลเกี่ยวกับ trekking และ camping สำหรับผู้ที่ต้องการใช้เวลาในป่านานขึ้น ควรสอบถามเรื่องไกด์ อุปกรณ์ ระดับความยาก และสภาพอากาศก่อนจอง",
  },
] as const;

export default function NamPienYorlaPaArticlePage() {
  const media = getMedia("namPienYorlaPa");
  const prices = getCurrentPriceRows({ routeSlug: "vientiane-nam-pien-yorla-pa" });
  const publishedIso = "2026-08-08";

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: DESCRIPTION,
            image: `${SITE.website}${media.src}`,
            author: { "@type": "Organization", name: SITE.name },
            publisher: { "@type": "Organization", name: SITE.legalName },
            datePublished: publishedIso,
            dateModified: publishedIso,
            mainEntityOfPage: `${SITE.website}${ARTICLE_PATH}`,
          }),
        }}
      />

      <header className="bg-[#071d13] pb-[clamp(56px,7vw,88px)] pt-[clamp(116px,14vw,170px)] text-white">
        <div className="hl-shell grid items-end gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-xs text-[#aebcb3]">
              <Link href="/" className="hover:text-white">หน้าแรก</Link><span>/</span>
              <Link href="/articles" className="hover:text-white">บทความ</Link><span>/</span>
              <span className="text-[#efd276]">น้ำเปี่ยนยอละปา</span>
            </nav>
            <span className="hl-kicker !text-[#efd276]">Nature guide from Vientiane</span>
            <h1 className="mt-5 font-serif-th text-[clamp(2.35rem,5.7vw,5rem)] font-bold leading-[1.08]">น้ำเปี่ยนยอละปา</h1>
            <p className="mt-6 max-w-[720px] text-lg leading-8 text-[#c8d3cc]">วางแผนวันพักกลางป่าฝน เลือกกิจกรรมตามสไตล์ของคุณ และจัดรถรับ–ส่งจากเวียงจันทน์ให้ลงตัว</p>
            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#aebcb3]"><span>HUGLAO</span><span>•</span><time dateTime={publishedIso}>8 สิงหาคม 2569</time><span>•</span><span>อ่านประมาณ 6 นาที</span></div>
          </div>
          <figure className="hl-mobile-media-card hl-detail-media-card overflow-hidden rounded-[28px] border border-white/10 bg-[#0a2d20] shadow-[0_28px_80px_rgba(0,0,0,.28)]">
            <div className="hl-mobile-media relative aspect-[16/9] max-h-[440px]">
              <Image src={media.src} alt={media.alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" priority />
            </div>
            <figcaption className="hl-mobile-content px-5 py-4 text-xs leading-6 text-[#afbeb5]">{media.alt} — ภาพ CC0 จาก Wikimedia Commons ไม่ใช่ภาพถ่ายสถานที่จริง</figcaption>
          </figure>
        </div>
      </header>

      <div className="hl-shell grid gap-12 py-[clamp(64px,8vw,105px)] lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-[820px]">
          <p className="font-serif-th text-[clamp(1.4rem,3vw,2rem)] font-bold leading-relaxed text-[#0a2d20]">
            น้ำเปี่ยนยอละปาเป็นจุดพักผ่อนและกิจกรรมกลางป่าในพื้นที่อนุรักษ์ภูเขาควาย เว็บไซต์ทางการระบุว่าเดินทางด้วยรถจากเวียงจันทน์ประมาณ 1.5 ชั่วโมง แต่เวลาจริงขึ้นกับจุดรับ สภาพถนน และสภาพอากาศ
          </p>

          <section className="mt-12">
            <span className="hl-kicker">รู้จักสถานที่ก่อนเดินทาง</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">ป่าฝน ลำน้ำ และกิจกรรมในวันเดียว</h2>
            <div className="mt-6 space-y-5 text-[1.04rem] leading-8 text-[#4f5d54]">
              <p>ชื่อ “ยอละปา” สื่อถึงการออกไปเดินในป่า พื้นที่นี้ตั้งอยู่ท่ามกลางป่าฝนริมแม่น้ำเปี่ยน และออกแบบประสบการณ์ให้เลือกได้ทั้งการพักผ่อนกับธรรมชาติและกิจกรรมที่ใช้ความตื่นเต้นมากขึ้น</p>
              <p>ผู้เดินทางไม่จำเป็นต้องเล่นทุกกิจกรรมในครั้งเดียว ควรเลือกตามเวลา ความพร้อมของร่างกาย และเงื่อนไขของผู้ให้บริการ โดยเฉพาะกิจกรรมบนที่สูงหรือกิจกรรมที่ใช้อุปกรณ์นิรภัย</p>
            </div>
          </section>

          <section className="mt-14">
            <span className="hl-kicker">กิจกรรมที่เว็บไซต์ทางการแนะนำ</span>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {ACTIVITY_GROUPS.map((item, index) => (
                <article key={item.title} className="rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] p-6">
                  <span className="text-xs font-bold text-[#9b711c]">0{index + 1}</span>
                  <h3 className="mt-4 font-serif-th text-xl font-bold text-[#0a2d20]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#59645d]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-[28px] bg-[#0a2d20] p-[clamp(26px,5vw,46px)] text-white">
            <span className="hl-kicker !text-[#efd276]">ช่วงเวลาเดินทาง</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.1rem)] font-bold">ฤดูแล้งหรือฤดูเขียว เลือกบรรยากาศที่ชอบ</h2>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div><h3 className="font-bold text-[#efd276]">ตุลาคม–กุมภาพันธ์</h3><p className="mt-3 leading-8 text-[#c8d3cc]">เว็บไซต์ทางการจัดเป็นช่วงฤดูแล้ง อากาศโดยทั่วไปเย็นลงและเหมาะกับกิจกรรมกลางแจ้ง แต่ควรตรวจพยากรณ์ก่อนออกเดินทางเสมอ</p></div>
              <div><h3 className="font-bold text-[#efd276]">มีนาคม–กันยายน</h3><p className="mt-3 leading-8 text-[#c8d3cc]">เป็นช่วงที่ป่าเขียวชุ่มและน้ำตกมีชีวิตชีวา ฝนอาจทำให้บางกิจกรรมปรับเวลา หยุดให้บริการ หรือจำเป็นต้องเปลี่ยนแผน</p></div>
            </div>
          </section>

          <section className="mt-14">
            <span className="hl-kicker">เตรียมตัวให้พร้อม</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">เช็กลิสต์ก่อนออกจากเวียงจันทน์</h2>
            <ol className="mt-7 divide-y divide-[#e5dece] overflow-hidden rounded-[24px] border border-[#ddd4c1]">
              {PREP_ITEMS.map((item, index) => (
                <li key={item} className="flex gap-4 bg-white px-5 py-5 even:bg-[#fcfaf5]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{index + 1}</span>
                  <p className="leading-7 text-[#59645d]">{item}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="h-fit rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] p-6 lg:sticky lg:top-28">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#9b711c]">ข้อมูลที่ควรยืนยัน</span>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#59645d]"><li>• วันและเวลาเปิดบริการ</li><li>• กิจกรรมที่เปิดในวันเดินทาง</li><li>• เงื่อนไขผู้เล่นและอุปกรณ์</li><li>• ค่าเข้าและค่าแพ็กเกจ</li><li>• เวลานัดรถเที่ยวกลับ</li></ul>
          <a href="https://nampienyorlapa.com/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-bold text-[#9b711c] hover:text-[#0a2d20]">ตรวจข้อมูลเว็บไซต์ทางการ →</a>
          <Link href="/routes/vientiane-nam-pien-yorla-pa" className="mt-4 block font-bold text-[#0a2d20] hover:text-[#9b711c]">ดูหน้าเส้นทางและราคารถ →</Link>
        </aside>
      </div>

      <section className="bg-[#efe8d9] py-[clamp(64px,8vw,100px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ราคารถรับ–ส่งที่เผยแพร่</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2.1rem,4.5vw,3.6rem)] font-bold text-[#071d13]">เวียงจันทน์ → น้ำเปี่ยนยอละปา</h2>
          <p className="mb-8 mt-5 max-w-[820px] leading-8 text-[#59645d]">ราคาต่อคันต่อเที่ยว รวมคนขับและน้ำมัน ไม่รวมค่าเข้า กิจกรรม อาหาร ที่พัก หรือค่าใช้จ่ายของสถานที่ เว้นแต่ระบุไว้ในข้อเสนอ</p>
          <PublishedPriceTable rows={prices} showCategoryHeadings={false} showCrossBorderNote={false} />
        </div>
      </section>

      <section className="bg-white py-[clamp(56px,7vw,84px)]">
        <div className="hl-shell max-w-[900px] text-sm leading-7 text-[#687169]">
          <strong className="text-[#0a2d20]">แหล่งข้อมูล:</strong>{" "}
          <a href="https://nampienyorlapa.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#9b711c] hover:underline">Nam Pien Yorla Pa — เว็บไซต์ทางการ</a>{" "}
          และ <a href="https://nampienyorlapa.com/adventure/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#9b711c] hover:underline">หน้ารวมกิจกรรม Adventure</a> ตรวจข้อมูลเมื่อ 8 สิงหาคม 2569 รายละเอียดกิจกรรม ราคา และเงื่อนไขอาจเปลี่ยนแปลงได้
        </div>
      </section>

      <LineCta title="วางแผนรถไปน้ำเปี่ยนยอละปา" description="ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับในเวียงจันทน์ และเวลาที่ต้องการเดินทางกลับ เพื่อให้ทีมตรวจรถและยืนยันราคา" />
    </article>
  );
}
