import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const LINE_URL = "https://lin.ee/xudxWlE";

export const metadata: Metadata = {
  title: "เช่ารถตู้เที่ยวลาว พร้อมคนขับ | รถตู้ VIP เที่ยวเวียงจันทน์ วังเวียง หลวงพระบาง | Huglao",
  description:
    "เช่ารถตู้เที่ยวลาว พร้อมคนขับมืออาชีพ รถตู้ VIP 7-10 ที่นั่ง เดินทางได้ทั่วลาว เวียงจันทน์ วังเวียง หลวงพระบาง บริการรับจากไทย จองง่าย ราคาคุ้มค่า",
  keywords: [
    "เช่ารถตู้เที่ยวลาว",
    "รถตู้เที่ยวลาว",
    "รถตู้พร้อมคนขับเที่ยวลาว",
    "รถตู้ VIP เที่ยวลาว",
    "รถตู้เช่าลาว",
    "รถตู้เวียงจันทน์",
    "เช่ารถตู้ไปลาว",
    "รถตู้ข้ามแดนลาว",
  ],
  alternates: { canonical: "/van-vip" },
  openGraph: {
    title: "เช่ารถตู้เที่ยวลาว พร้อมคนขับ | รถตู้ VIP เที่ยวลาว | Huglao",
    description: "รถตู้ VIP 7-10 ที่นั่ง พร้อมคนขับมืออาชีพ เดินทางทั่วลาว เวียงจันทน์ วังเวียง หลวงพระบาง ปากเซ",
    url: "/van-vip",
    type: "website",
  },
};

const WHY = [
  { icon: "🚐", title: "สะดวกกว่าเช่ารถขับเอง", body: "ไม่ต้องขับเอง ไม่ต้องหาที่จอด นั่งพักผ่อนได้เต็มที่ตลอดทริป" },
  { icon: "🗺️", title: "ไม่ต้องกังวลเส้นทาง", body: "คนขับชำนาญเส้นทางลาวทุกสาย ไม่หลงทาง ไม่เสียเวลา" },
  { icon: "💬", title: "คนขับพูดไทย", body: "สื่อสารง่าย ไม่ต้องกังวลเรื่องภาษา ปรึกษาได้ตลอดทาง" },
  { icon: "🍜", title: "แนะนำร้านอาหาร", body: "คนขับท้องถิ่นรู้ร้านอร่อย แนะนำได้ตรงใจนักเดินทาง" },
  { icon: "📍", title: "แนะนำสถานที่เที่ยว", body: "ช่วยวางแผนจุดแวะพัก มุมถ่ายรูป และเวลาที่เหมาะที่สุด" },
  { icon: "⏱️", title: "ประหยัดเวลา", body: "ไม่ต้องรอต่อรถสาธารณะ เดินทางตรงจุดหมายได้ทันที" },
];

const HIGHLIGHTS = [
  "🚐 รถใหม่",
  "✨ มาตรฐาน VIP",
  "🛋️ เบาะกว้างนั่งสบาย",
  "🔌 USB ชาร์จทุกที่นั่ง",
  "📶 WiFi บนรถ",
  "💧 น้ำดื่มบริการ",
  "❄️ แอร์เย็นฉ่ำ",
  "🛡️ ประกันภัยครบ",
  "👨‍✈️ คนขับมีประสบการณ์",
  "✈️ รับสนามบิน",
  "🛂 รับด่านหนองคาย",
  "🏛️ รับเวียงจันทน์",
];

const CITIES = [
  {
    title: "รถตู้เที่ยวเวียงจันทน์",
    image: "/assets/dest-vientiane.webp",
    paragraphs: [
      <>เวียงจันทน์คือด่านแรกของทริปเที่ยวลาวส่วนใหญ่ ด้วยระยะทางใกล้ด่านหนองคายเพียงข้ามสะพานมิตรภาพ รถตู้ VIP ของเราพาคุณชม <strong className="text-deep-green-2">ประตูชัย</strong> สัญลักษณ์แห่งเมือง <strong className="text-deep-green-2">พระธาตุหลวง</strong> เจดีย์ทองคำคู่บ้านคู่เมือง <strong className="text-deep-green-2">วัดสีสะเกด</strong> วัดเก่าแก่ที่รอดพ้นการทำลายจากสงคราม แวะเรียนรู้ประวัติศาสตร์ที่ศูนย์ <strong className="text-deep-green-2">COPE</strong> และปิดท้ายวันด้วยการช้อปที่ <strong className="text-deep-green-2">ตลาดกลางคืน</strong> ริมแม่น้ำโขง</>,
      <>โปรแกรมเวียงจันทน์เหมาะกับทริปวันเดียวหรือทริปแวะพักก่อนต่อไปเมืองอื่น คนขับของเราคุ้นเคยเส้นทางในตัวเมืองและจุดจอดรถแต่ละสถานที่เป็นอย่างดี ทำให้ไม่เสียเวลาหาที่จอดหรือหลงทาง</>,
    ],
  },
  {
    title: "รถตู้เที่ยววังเวียง",
    image: "/assets/dest-vangvieng.webp",
    reverse: true,
    paragraphs: [
      <>วังเวียงคือเมืองแห่งธรรมชาติและกิจกรรมผจญภัย รถตู้ VIP พาคุณไป <strong className="text-deep-green-2">Blue Lagoon</strong> น้ำสีฟ้าใสท่ามกลางภูเขาหินปูน ล่องเที่ยว <strong className="text-deep-green-2">ถ้ำนางฟ้า</strong> ที่ซ่อนตัวอยู่กลางหุบเขา พาย <strong className="text-deep-green-2">Kayak</strong> ล่องแม่น้ำซองยามเย็น ขึ้น <strong className="text-deep-green-2">บอลลูน</strong> ชมวิวเมืองยามเช้า และนั่งพักจิบกาแฟที่ <strong className="text-deep-green-2">คาเฟ่</strong> วิวภูเขาสวยงามหลายแห่งในเมือง</>,
      <>เนื่องจากกิจกรรมในวังเวียงกระจายตัวอยู่รอบเมือง การมีรถตู้ส่วนตัวพร้อมคนขับช่วยให้เดินทางระหว่างจุดต่าง ๆ ได้สะดวก ไม่ต้องรอรถรับส่งของทัวร์ ทำให้บริหารเวลาในแต่ละวันได้อย่างเต็มที่</>,
    ],
  },
  {
    title: "รถตู้เที่ยวหลวงพระบาง",
    image: "/assets/dest-luangprabang.webp",
    paragraphs: [
      <>หลวงพระบางเป็นเมืองมรดกโลกที่ควรมาสัมผัสอย่างน้อยครั้งหนึ่งในชีวิต รถตู้ VIP พาคุณไปชม <strong className="text-deep-green-2">น้ำตกกวางสี</strong> น้ำตกสีฟ้ามรกตกลางป่าเขียว ขึ้น <strong className="text-deep-green-2">พระธาตุพูสี</strong> ชมวิวพระอาทิตย์ตกทั้งเมือง เดินเลือกซื้อของที่ <strong className="text-deep-green-2">ตลาดมืด</strong> ยามค่ำคืน และตื่นเช้าร่วมพิธี <strong className="text-deep-green-2">ตักบาตรข้าวเหนียว</strong> ที่เป็นเอกลักษณ์เฉพาะของเมืองนี้</>,
      <>โปรแกรมหลวงพระบางมีทั้งแบบนั่งรถตู้ตรงจากเวียงจันทน์และแบบต่อรถไฟความเร็วสูงลาว-จีน ทีมงานช่วยวางแผนเส้นทางที่เหมาะกับเวลาและงบประมาณของคุณ</>,
    ],
  },
  {
    title: "รถตู้เที่ยวปากเซ",
    image: "/assets/dest-pakse.webp",
    reverse: true,
    paragraphs: [
      <>ปากเซคือประตูสู่ภาคใต้ของลาว เหมาะสำหรับสายธรรมชาติและน้ำตก รถตู้ VIP พาคุณขึ้นที่ราบสูง <strong className="text-deep-green-2">โบลาเวน</strong> ชมไร่กาแฟและน้ำตกหลายแห่ง ชม <strong className="text-deep-green-2">คอนพะเพ็ง</strong> น้ำตกแม่น้ำโขงที่ใหญ่ที่สุดในเอเชียตะวันออกเฉียงใต้ และเยี่ยมชม <strong className="text-deep-green-2">วัดพู</strong> ปราสาทหินโบราณมรดกโลกอายุกว่าพันปี</>,
      <>ระยะทางในปากเซค่อนข้างไกลระหว่างจุดท่องเที่ยว การเดินทางด้วยรถตู้ส่วนตัวจึงเหมาะที่สุด ลดเวลาต่อรถและเพิ่มเวลาเที่ยวชมสถานที่จริง</>,
    ],
  },
];

const WHO = [
  { icon: "👨‍👩‍👧‍👦", label: "ครอบครัว" },
  { icon: "🏢", label: "บริษัท" },
  { icon: "📋", label: "ดูงาน" },
  { icon: "🚌", label: "คณะทัวร์" },
  { icon: "👵", label: "คนสูงอายุ" },
  { icon: "🧑‍🤝‍🧑", label: "กลุ่มเพื่อน" },
];

const FLEET = [
  { model: "Toyota Commuter", seats: "9 ที่นั่ง", fit: "กลุ่มเพื่อน / ครอบครัวใหญ่" },
  { model: "Toyota Majesty", seats: "7 ที่นั่ง", fit: "ครอบครัว / กลุ่มเล็ก เน้นความสบาย" },
  { model: "Hyundai H1", seats: "7 ที่นั่ง", fit: "คู่รัก / กลุ่มธุรกิจ" },
];

const PROGRAMS = [
  { title: "เวียงจันทน์ 1 วัน", body: "ทริปสั้น เหมาะแวะเที่ยวก่อนหรือหลังข้ามด่าน", gradient: "linear-gradient(165deg,#2c5a3c,#123524)" },
  { title: "วังเวียง 2 วัน", body: "เต็มอิ่มกิจกรรมธรรมชาติและผจญภัย", gradient: "linear-gradient(165deg,#1b4a32,#0a1f14)" },
  { title: "หลวงพระบาง 4 วัน", body: "ครบทุกไฮไลต์เมืองมรดกโลก", gradient: "linear-gradient(165deg,#a87815,#7a5510)" },
  { title: "เวียงจันทน์-วังเวียง 3 วัน", body: "คุ้มค่า เที่ยวสองเมืองในทริปเดียว", gradient: "linear-gradient(165deg,#2c5a3c,#123524)" },
];

const BOOKING_STEPS = ["แจ้งวันเดินทาง", "แจ้งจำนวนผู้โดยสาร", "แจ้งโปรแกรม", "รับใบเสนอราคา", "ชำระมัดจำ", "เดินทาง"];

const COMPARE = [
  { title: "รถตู้ VIP พร้อมคนขับ", body: "ยืดหยุ่นที่สุด แวะจุดไหนก็ได้ตามใจ เหมาะกลุ่ม 4-10 คน เดินทางหลายเมืองในทริปเดียว" },
  { title: "รถไฟลาว-จีน", body: "เร็วและสบายสำหรับเส้นทางเวียงจันทน์-หลวงพระบาง แต่ต้องต่อรถท้องถิ่นเข้าเมืองอีกช่วง" },
  { title: "รถโดยสารประจำทาง", body: "ประหยัดสุด แต่เวลาเดินทางไม่แน่นอนและไม่แวะจุดท่องเที่ยวระหว่างทาง" },
];

const REVIEWS = [
  { body: "คนขับใจดี ชำนาญเส้นทางมาก รถสะอาดสะดวกสบายตลอดทริปเวียงจันทน์-วังเวียง", source: "รีวิวจาก Google" },
  { body: "จัดโปรแกรมให้ตรงตามที่ต้องการ ราคาชัดเจนไม่มีแอบแฝง แนะนำเลยครับ", source: "รีวิวจาก Facebook" },
  { body: "พาครอบครัวไปหลวงพระบาง 4 วัน คนขับดูแลดีมาก ปลอดภัยสบายใจ", source: "รีวิวจาก Google" },
];

const FAQS = [
  { q: "ราคาเช่ารถตู้เที่ยวลาวเท่าไร", a: "ราคาขึ้นอยู่กับรุ่นรถ จำนวนวัน และเส้นทาง เริ่มต้นหลักพันบาทต่อวัน ทักแชทเพื่อรับใบเสนอราคาที่ตรงกับแผนเดินทางของคุณ" },
  { q: "มีคนขับให้ไหม", a: "มีคนขับมืออาชีพประจำรถทุกคัน ชำนาญเส้นทางและพูดไทยได้" },
  { q: "ข้ามแดนจากไทยไปลาวได้ไหม", a: "ได้ รับส่งได้ทั้งฝั่งไทยและข้ามด่านไปฝั่งลาว ทีมงานช่วยเตรียมเอกสารที่จำเป็น" },
  { q: "รับสนามบินเวียงจันทน์ไหม", a: "รับได้ทั้งสนามบินนานาชาติวัตไต และด่านหนองคาย-ท่านาแล้ง" },
  { q: "ไปหลวงพระบางได้ไหม", a: "ได้ มีทั้งโปรแกรมนั่งรถตู้ตรงและต่อรถไฟลาว-จีนจากเวียงจันทน์" },
  { q: "มีรถสำหรับเด็กหรือคาร์ซีทไหม", a: "แจ้งความต้องการล่วงหน้าได้ ทีมงานจัดเตรียมให้ตามความเหมาะสม" },
  { q: "รถมีประกันภัยไหม", a: "รถทุกคันทำประกันภัยตามกฎหมาย และผ่านการตรวจสภาพก่อนออกเดินทางทุกครั้ง" },
  { q: "ชำระเงินอย่างไร", a: "โอนมัดจำล่วงหน้า ส่วนที่เหลือชำระก่อนหรือระหว่างเดินทางตามตกลง" },
  { q: "ยกเลิกทริปได้ไหม", a: "แจ้งยกเลิกล่วงหน้าตามเงื่อนไขที่ตกลงกันตอนจอง เงื่อนไขคืนมัดจำขึ้นกับระยะเวลาแจ้ง" },
  { q: "ต้องจองล่วงหน้ากี่วัน", a: "แนะนำจองล่วงหน้าอย่างน้อย 5-7 วัน ช่วงเทศกาลควรจองล่วงหน้า 2-3 สัปดาห์" },
  { q: "รับกี่ที่นั่งสูงสุด", a: "รถตู้ VIP รองรับได้สูงสุด 10 ที่นั่ง หากกลุ่มใหญ่กว่านี้จัดรถหลายคันให้ได้" },
  { q: "มีค่าใช้จ่ายแอบแฝงไหม", a: "ไม่มี ราคาที่เสนอครอบคลุมค่าน้ำมัน ค่าคนขับ และค่าทางด่วนตามเส้นทางที่ตกลงไว้แล้ว" },
  { q: "เดินทางข้ามคืนได้ไหม", a: "ได้ สามารถจัดโปรแกรมค้างคืนต่างเมืองได้ คนขับพักแยกจากที่พักลูกค้า" },
  { q: "ใช้เวลาเดินทางจากหนองคายถึงเวียงจันทน์นานแค่ไหน", a: "ใช้เวลาประมาณ 30-45 นาทีรวมขั้นตอนตรวจคนเข้าเมืองที่ด่าน" },
];

export default function VanVipPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://huglao.com/" },
              { "@type": "ListItem", position: 2, name: "รถตู้ VIP เที่ยวลาว", item: "https://huglao.com/van-vip" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "เช่ารถตู้เที่ยวลาวพร้อมคนขับ",
            provider: { "@type": "TravelAgency", name: "บริษัท ฮักลาว กรุ๊ป จำกัด" },
            areaServed: ["Laos", "Thailand"],
            description: "บริการเช่ารถตู้ VIP พร้อมคนขับมืออาชีพ เดินทางทั่วประเทศลาว เวียงจันทน์ วังเวียง หลวงพระบาง ปากเซ",
          }),
        }}
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
        className="relative overflow-hidden py-[clamp(112px,15vw,152px)] px-[clamp(20px,5vw,48px)] pb-[clamp(48px,7vw,72px)]"
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
            / <span className="text-gold-light">รถตู้ VIP เที่ยวลาว</span>
          </nav>
          <div className="max-w-[820px]">
            <span className="inline-block text-gold-light font-bold tracking-[.2em] text-[.8rem] uppercase">
              รถตู้ VIP · พร้อมคนขับ
            </span>
            <h1
              className="mt-4 font-serif-th font-bold leading-[1.2]"
              style={{ fontSize: "clamp(2rem,5.6vw,3.4rem)", letterSpacing: "-.01em" }}
            >
              เช่ารถตู้เที่ยวลาว พร้อมคนขับ รถตู้ VIP เที่ยวได้ทั่วประเทศลาว
            </h1>
            <p className="mt-5 max-w-[64ch]" style={{ color: "#cfc9b6", fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75 }}>
              รถตู้ VIP 7-10 ที่นั่ง พร้อมคนขับมืออาชีพ พาคุณเที่ยวเวียงจันทน์ วังเวียง หลวงพระบาง ปากเซ และทั่วประเทศลาว รับ-ส่งได้ทั้งฝั่งไทยและลาว จองง่าย ราคาคุ้มค่า
            </p>
            <div className="flex flex-wrap gap-3.5 mt-[30px]">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-[15px] font-bold text-deep-green no-underline text-[1rem] hover:-translate-y-1 transition-transform"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)", boxShadow: "0 16px 36px rgba(168,120,21,.45)" }}
              >
                ติดต่อจองรถ
              </a>
              <Link
                href="#faq"
                className="inline-flex items-center rounded-full px-7 py-[15px] font-semibold no-underline text-[1rem] border-[1.5px] hover:bg-white/20 transition-colors"
                style={{ background: "rgba(255,255,255,.1)", borderColor: "rgba(255,255,255,.5)", color: "#fffaf0" }}
              >
                คำถามที่พบบ่อย ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(48px,7vw,72px)]">
        <p className="text-[1.08rem] leading-[1.9] text-[#3c3e33] mb-5">
          หากคุณกำลังวางแผนเดินทางไปประเทศลาว ไม่ว่าจะเที่ยวกับครอบครัว กลุ่มเพื่อน บริษัท หรือคณะทัวร์ การเลือกใช้บริการ <strong>เช่ารถตู้เที่ยวลาว</strong> พร้อมคนขับ ถือเป็นทางเลือกที่สะดวก ปลอดภัย และคุ้มค่าที่สุด เพราะเดินทางได้อย่างอิสระ ไม่ต้องกังวลเรื่องเส้นทาง ภาษา หรือการต่อรถสาธารณะ
        </p>
        <p className="text-[1.08rem] leading-[1.9] text-[#3c3e33]">
          ฮักลาว กรุ๊ป ให้บริการ <strong>รถตู้พร้อมคนขับเที่ยวลาว</strong> ระดับ VIP พร้อมคนขับมืออาชีพ ชำนาญเส้นทาง สามารถรับ-ส่งได้ทั้งฝั่งไทยและลาว ครอบคลุมเมืองท่องเที่ยวสำคัญ เช่น เวียงจันทน์ วังเวียง หลวงพระบาง ปากเซ และเมืองอื่น ๆ ตามแผนการเดินทางของลูกค้า ไม่ว่าจะเป็นทริปสั้น 1 วัน หรือทริปยาวหลายวันข้ามหลายเมือง
        </p>
      </section>

      {/* ===== CTA STRIP ===== */}
      <div className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-deep-green-2 rounded-2xl px-7 py-[22px] text-[#f4ecd7]">
          <span className="text-[1.02rem] font-semibold">พร้อมออกแบบทริปของคุณแล้วหรือยัง?</span>
          <div className="flex gap-3 flex-wrap">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener"
              className="no-underline rounded-full px-[22px] py-[11px] font-bold text-deep-green text-[.92rem]"
              style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
            >
              ติดต่อจองรถ
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener"
              className="no-underline rounded-full px-[22px] py-[11px] font-bold text-[.92rem] border-[1.5px] border-gold-light text-gold-light"
            >
              สอบถามผ่าน LINE
            </a>
          </div>
        </div>
      </div>

      {/* ===== WHY ===== */}
      <section id="why" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">ทำไมต้องเลือกเรา</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          ทำไมต้องเช่ารถตู้เที่ยวลาว
        </h2>
        <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {WHY.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * (i + 1)}>
              <div className="h-full bg-white border border-border rounded-2xl p-[26px]">
                <div className="text-[1.4rem] mb-2.5">{item.icon}</div>
                <h3 className="m-0 mb-2 text-[1.05rem] text-deep-green-2">{item.title}</h3>
                <p className="m-0 text-text-muted text-[.94rem] leading-[1.7]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== HIGHLIGHTS ===== */}
      <section id="highlights" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">รถตู้ VIP</span>
        <h2 className="mt-3 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          จุดเด่นบริการรถตู้ VIP ของ Huglao
        </h2>
        <p className="mb-[30px] text-text-muted text-[1.02rem] leading-[1.8] max-w-[70ch]">
          รถทุกคันผ่านการตรวจสภาพก่อนออกเดินทางทุกครั้ง คัดสรรมาเพื่อความสบายและปลอดภัยตลอดทริปเที่ยวลาว
        </p>
        <div className="grid gap-[18px] mb-9" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          {HIGHLIGHTS.map((h) => (
            <div key={h} className="flex items-center gap-2.5 bg-[#f4f0e6] rounded-xl px-4 py-3.5 text-[.92rem] text-[#3c3e33]">
              {h}
            </div>
          ))}
        </div>
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_44px_rgba(10,31,20,.16)]" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/assets/van-vip-fleet.jpg"
                alt="รถตู้ VIP Toyota Commuter สองคัน จอดรอบริการเที่ยวลาว"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_44px_rgba(10,31,20,.16)]" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/assets/van-vip-interior.jpg"
                alt="เบาะหนัง VIP กว้างขวางภายในรถตู้ Huglao"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CITIES ===== */}
      <section id="cities" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">เส้นทางบริการ</span>
        <h2 className="mt-3 mb-10 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          ให้บริการเที่ยวเมืองไหนบ้าง
        </h2>
        <div className="flex flex-col gap-14">
          {CITIES.map((city) => (
            <Reveal key={city.title}>
              <article
                className="grid gap-7 items-center"
                style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
              >
                <div style={{ order: city.reverse ? 2 : 1 }}>
                  <h3 className="mt-0 mb-3 font-serif-th font-bold text-deep-green-2 text-[1.5rem]">{city.title}</h3>
                  {city.paragraphs.map((p, i) => (
                    <p key={i} className="text-[#3c3e33] text-[1rem] leading-[1.85] mb-3.5 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", order: city.reverse ? 1 : 2 }}>
                  <Image src={city.image} alt={city.title} fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== WHO ===== */}
      <section id="who" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">เหมาะกับใคร</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          เหมาะกับใครบ้าง
        </h2>
        <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))" }}>
          {WHO.map((w) => (
            <div key={w.label} className="text-center bg-white border border-border rounded-2xl py-7 px-5">
              <div className="text-[1.8rem] mb-2.5">{w.icon}</div>
              <h3 className="m-0 text-[1rem] text-deep-green-2">{w.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FLEET ===== */}
      <section id="fleet" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">เลือกรถ</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          มีรถอะไรให้เลือก
        </h2>
        <div className="overflow-x-auto rounded-2xl" style={{ boxShadow: "0 14px 34px rgba(10,31,20,.08)" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">รุ่นรถ</th>
                <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">จำนวนที่นั่ง</th>
                <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">เหมาะสำหรับ</th>
              </tr>
            </thead>
            <tbody>
              {FLEET.map((v, i) => (
                <tr key={v.model} className={i % 2 === 1 ? "bg-[#f4f0e6]" : undefined}>
                  <td className="border border-border px-4 py-3.5 text-[.96rem]">{v.model}</td>
                  <td className="border border-border px-4 py-3.5 text-[.96rem]">{v.seats}</td>
                  <td className="border border-border px-4 py-3.5 text-[.96rem]">{v.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section id="programs" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">โปรแกรมทัวร์</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          โปรแกรมยอดนิยม
        </h2>
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          {PROGRAMS.map((p) => (
            <div key={p.title} className="rounded-2xl p-[26px] text-white" style={{ background: p.gradient }}>
              <h3 className="mt-0 mb-2 font-serif-th text-[1.15rem]">{p.title}</h3>
              <p className="m-0 text-[#d8d2c0] text-[.88rem] leading-[1.6]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOOKING STEPS ===== */}
      <section id="booking" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">จองง่าย</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          ขั้นตอนการจอง
        </h2>
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }}>
          {BOOKING_STEPS.map((label, i) => (
            <div key={label} className="bg-white border border-border rounded-2xl px-[18px] py-[22px] text-center">
              <div className="w-9 h-9 rounded-full bg-deep-green-2 text-gold-light font-bold flex items-center justify-center mx-auto mb-3">
                {i + 1}
              </div>
              <p className="m-0 text-[.92rem] text-[#3c3e33] leading-[1.5]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COMPARE ===== */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">ก่อนตัดสินใจ</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          รถตู้ vs รถไฟ vs รถโดยสาร แบบไหนเหมาะกับคุณ
        </h2>
        <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {COMPARE.map((c) => (
            <div key={c.title} className="bg-white border border-border rounded-2xl p-[26px]">
              <h3 className="mt-0 mb-2.5 text-[1.05rem] text-deep-green-2">{c.title}</h3>
              <p className="m-0 text-text-muted text-[.92rem] leading-[1.7]">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[#3c3e33] text-[.98rem] leading-[1.8]">
          สำหรับผู้ที่ต้องการรับ-ส่งจากฝั่งไทยข้ามด่านหนองคาย เอกสารหลักที่ควรเตรียมคือ พาสปอร์ตอายุเหลือมากกว่า 6 เดือน ทีมงานของเราช่วยตรวจสอบและแนะนำเอกสารให้ครบก่อนวันเดินทางจริง
        </p>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">เสียงจากลูกค้า</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          รีวิวลูกค้า
        </h2>
        <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {REVIEWS.map((r) => (
            <div key={r.source + r.body.slice(0, 8)} className="bg-white border border-border rounded-2xl p-6">
              <div className="text-gold mb-2.5">★★★★★</div>
              <p className="m-0 mb-3.5 text-[#3c3e33] text-[.94rem] leading-[1.7]">{r.body}</p>
              <span className="text-[.85rem] text-[#8a8474]">— {r.source}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ARTICLES ===== */}
      <section id="articles" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">อ่านเพิ่มเติม</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          บทความแนะนำ
        </h2>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
        >
          อ่านบทความเที่ยวลาวทั้งหมด →
        </Link>
        <p className="mt-6 text-[#8a8474] text-[.86rem] leading-[1.7]">
          ข้อมูลอ้างอิงเพิ่มเติม:{" "}
          <a href="https://tourismlaos.org/" target="_blank" rel="noopener" className="text-gold-dark">
            การท่องเที่ยวลาว
          </a>{" "}
          ·{" "}
          <a href="https://www.mfa.go.th/" target="_blank" rel="noopener" className="text-gold-dark">
            กระทรวงการต่างประเทศไทย
          </a>{" "}
          ·{" "}
          <a href="https://www.google.com/maps" target="_blank" rel="noopener" className="text-gold-dark">
            Google Maps
          </a>
        </p>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="max-w-[840px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">คำถามที่พบบ่อย</span>
        <h2 className="mt-3 mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
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
      <section id="contact" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] mt-[clamp(64px,8vw,96px)] pb-[clamp(80px,10vw,120px)]">
        <div
          className="rounded-[24px] p-[clamp(36px,6vw,60px)] flex flex-wrap gap-9 items-center justify-between"
          style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
        >
          <div className="max-w-[520px]">
            <h2 className="mt-0 mb-3.5 font-serif-th font-bold" style={{ fontSize: "clamp(1.6rem,3.2vw,2.2rem)" }}>
              พร้อมพาคุณเที่ยวลาวแล้ววันนี้
            </h2>
            <p className="m-0 text-[#cfc9b6] text-[1rem] leading-[1.8]">
              แจ้งวันเดินทาง จำนวนผู้โดยสาร และเมืองที่ต้องการไป ทีมงานจะจัดรถตู้ VIP และเสนอราคาให้ภายในไม่กี่ชั่วโมง
            </p>
            <div className="flex gap-3.5 mt-[26px] flex-wrap">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="no-underline rounded-full px-7 py-3.5 font-bold text-deep-green text-[.98rem]"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
              >
                ติดต่อจองรถ
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="no-underline rounded-full px-7 py-3.5 font-bold text-gold-light text-[.98rem] border-[1.5px] border-gold-light"
              >
                แชท LINE
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
