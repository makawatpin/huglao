import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import HeroParallax from "@/components/HeroParallax";

const SERVICES = [
  {
    title: ["รถตู้ VIP", "ลาว"],
    tag: "จองรถตู้ลาว",
    image: "/assets/svc-van.webp",
  },
  {
    title: ["ตั๋วรถไฟ", "ลาว–จีน"],
    tag: "จองตั๋วรถไฟ",
    image: "/assets/svc-train.webp",
  },
  {
    title: ["ไกด์นำเที่ยว", "ลาว"],
    tag: "วางแผนทริป",
    image: "/assets/svc-guide.webp",
  },
];

const WHY_US = [
  { icon: "🛡️", title: "ปลอดภัย เชื่อถือได้", body: "จดทะเบียนบริษัทถูกต้อง คนขับและไกด์ผ่านการคัดเลือกอย่างดี" },
  { icon: "💬", title: "ทีมไทย–ลาว สื่อสารง่าย", body: "ปรึกษาเป็นภาษาไทยได้ตลอด ไม่ต้องกังวลเรื่องภาษา" },
  { icon: "💰", title: "ราคาคุ้มค่า โปร่งใส", body: "เสนอราคาชัดเจนก่อนเดินทาง ไม่มีค่าใช้จ่ายแอบแฝง" },
  { icon: "📞", title: "ดูแล 24 ชั่วโมง", body: "มีทีมงานพร้อมช่วยเหลือทุกสถานการณ์ตลอดทริป" },
];

const DESTINATIONS = [
  { name: "เวียงจันทน์", tag: "เมืองหลวง", desc: "พระธาตุหลวง · ประตูชัย · วัดสีเมือง · ตลาดกลางคืนริมโขง", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-vientiane.webp" },
  { name: "หลวงพระบาง", tag: "มรดกโลก", desc: "วัดเชียงทอง · ตักบาตรข้าวเหนียว · น้ำตกตาดกวางสี · พูสี", gradient: "linear-gradient(165deg,#a87815,#7a5510)", image: "/assets/dest-luangprabang.webp" },
  { name: "วังเวียง", tag: "ผจญภัย", desc: "บลูลากูน · ล่องเรือแม่น้ำซอง · บอลลูน · ถ้ำปูคำ", gradient: "linear-gradient(165deg,#1b4a32,#0a1f14)", image: "/assets/dest-vangvieng.webp" },
  { name: "ปากเซ · โบโลเวน", tag: null, desc: "ที่ราบสูงไร่กาแฟ · น้ำตกตาดฟาน · ปราสาทวัดพู", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-pakse.webp" },
  { name: "เชียงขวาง", tag: null, desc: "ทุ่งไหหิน · ประวัติศาสตร์ · ธรรมชาติบนที่สูง", gradient: "linear-gradient(165deg,#a87815,#7a5510)", image: "/assets/dest-xiengkhouang.webp" },
  { name: "บ่อเต็น (ชายแดนจีน)", tag: null, desc: "ปลายทางรถไฟลาว–จีน · เขตการค้าชายแดน", gradient: "linear-gradient(165deg,#1b4a32,#0a1f14)", image: "/assets/dest-boten.webp" },
];

const PROCESS_STEPS = [
  { n: 1, title: "ทักแชต / โทรปรึกษา", body: "บอกวันเดินทาง จุดหมาย และจำนวนคน ทีมเราตอบไว" },
  { n: 2, title: "รับใบเสนอราคา", body: "เราจัดแผนและราคาชัดเจน พร้อมคำแนะนำเส้นทาง" },
  { n: 3, title: "ยืนยัน & มัดจำ", body: "ยืนยันทริปและชำระมัดจำ เราล็อกรถและที่นั่งให้ทันที" },
  { n: 4, title: "ออกเดินทาง!", body: "รถตู้และไกด์พร้อมรับ ดูแลคุณตลอดทริปเที่ยวลาว" },
];

const FAQS = [
  { q: "จองรถตู้ลาวต้องจองล่วงหน้ากี่วัน?", a: "แนะนำจองล่วงหน้าอย่างน้อย 3–7 วัน โดยเฉพาะช่วงเทศกาลหรือวันหยุดยาว เพื่อให้ได้รถและคนขับที่ตรงใจที่สุด แต่หากเร่งด่วนก็สอบถามได้เสมอ" },
  { q: "ราคารถตู้ VIP รวมอะไรบ้าง?", a: "โดยทั่วไปรวมค่ารถ คนขับ และน้ำมันตามเส้นทางที่ตกลง ส่วนค่าทางด่วน ค่าเข้าสถานที่ ที่พักคนขับ (กรณีค้างคืน) จะแจ้งให้ทราบชัดเจนในใบเสนอราคา ไม่มีบวกเพิ่มภายหลัง" },
  { q: "รับตั๋วรถไฟลาว–จีนอย่างไร?", a: "เราสำรองที่นั่งและออกตั๋วให้ล่วงหน้า พร้อมส่งรายละเอียดการเดินทางให้คุณ และสามารถจัดรถตู้ VIP รับ-ส่งถึงสถานีได้ครบในที่เดียว" },
  { q: "มีไกด์พูดไทยไหม?", a: "มีครับ ไกด์ของเราเป็นคนท้องถิ่นที่สื่อสารภาษาไทยได้ดี เข้าใจวัฒนธรรมทั้งสองฝั่ง ช่วยให้ทริปเที่ยวลาวของคุณสนุกและไร้กังวล" },
];

export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      {/* ===== HERO ===== */}
      <section
        id="top"
        className="relative overflow-hidden flex items-center justify-center text-center"
        style={{
          height: "100vh",
          minHeight: 620,
          background: "linear-gradient(#bcd9ec,#dfeaf0)",
        }}
      >
        <HeroParallax>
        <div
          data-layer="sky"
          className="absolute will-change-transform"
          style={{ left: "-10%", right: "-10%", top: 0, bottom: 0, backgroundImage: "url(/assets/parallax-sky.webp)", backgroundSize: "cover", backgroundPosition: "center top" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom,rgba(10,31,20,.42),rgba(10,31,20,.05) 30%,rgba(10,31,20,0) 55%,rgba(8,22,13,.18))" }}
        />
        <div
          data-layer="hills"
          className="absolute will-change-transform"
          style={{ left: "-10%", right: "-10%", top: "-5%", bottom: "-5%", backgroundImage: "url(/assets/parallax-hills.webp)", backgroundSize: "cover", backgroundPosition: "center bottom" }}
        />
        <div
          data-layer="temple"
          className="absolute will-change-transform"
          style={{ left: 0, right: 0, top: "-5%", bottom: "-5%", backgroundImage: "url(/assets/parallax-temple.webp)", backgroundSize: "cover", backgroundPosition: "left bottom", backgroundRepeat: "no-repeat" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom,rgba(255,206,130,.5) 0%,rgba(196,180,120,.25) 38%,rgba(90,120,75,.22) 62%,rgba(20,52,34,.55) 100%)",
            mixBlendMode: "soft-light",
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 z-[6]"
          style={{
            height: 230,
            background: "linear-gradient(to bottom,rgba(250,248,243,0) 0%,rgba(250,248,243,0) 28%,rgba(250,248,243,.72) 78%,#faf8f3 100%)",
          }}
        />
        <div data-layer="text" className="relative z-[6] flex flex-col items-center px-6 pt-[clamp(118px,15vh,168px)] pb-24 will-change-transform">
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-[9px] mb-[22px] text-[clamp(.72rem,1.6vw,.9rem)] font-semibold tracking-wide"
            style={{
              background: "rgba(10,31,20,.42)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(227,189,99,.5)",
              color: "#f0e0b6",
            }}
          >
            <span className="w-[7px] h-[7px] rounded-full bg-gold-light shadow-[0_0_12px_#e3bd63]" />
            บริษัท ฮักลาว กรุ๊ป จำกัด · Connecting Thailand &amp; Laos
          </div>
          <h1
            className="m-0 font-serif-th font-bold leading-[1.06] text-[#fffaf0]"
            style={{
              fontSize: "clamp(2.5rem,7.4vw,6rem)",
              letterSpacing: "-.01em",
              textShadow: "0 4px 30px rgba(8,22,13,.55),0 2px 8px rgba(8,22,13,.5)",
            }}
          >
            เที่ยวลาว ครบ จบ
            <br />
            <span>ในที่เดียว</span>
          </h1>
          <p
            className="mt-[22px] font-normal text-[#f3efe2] max-w-[36ch]"
            style={{
              fontSize: "clamp(1.02rem,2.1vw,1.32rem)",
              lineHeight: 1.6,
              textShadow: "0 2px 12px rgba(8,22,13,.6)",
            }}
          >
            รถตู้ VIP ลาว · จองตั๋วรถไฟลาว–จีน · ไกด์นำเที่ยวมืออาชีพ
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center mt-[34px]">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 font-bold text-deep-green no-underline text-[1.05rem] shadow-[0_16px_40px_rgba(168,120,21,.5)] hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(168,120,21,.65)] transition-all"
              style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
            >
              จองรถตู้ลาว
            </Link>
            <Link
              href="#explore"
              className="inline-flex items-center gap-2 rounded-full px-[30px] py-4 font-semibold text-[#fffaf0] no-underline text-[1.05rem] border-[1.5px] border-white/70 bg-white/10 hover:bg-white/20 transition-colors"
              style={{ backdropFilter: "blur(6px)" }}
            >
              เส้นทางยอดนิยม →
            </Link>
          </div>
        </div>
        </HeroParallax>
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[7] flex flex-col items-center gap-2 text-[.72rem] tracking-[.3em]"
          style={{ color: "rgba(240,235,220,.8)" }}
        >
          เลื่อนลง
          <span className="w-px h-7" style={{ background: "linear-gradient(rgba(240,235,220,.7),transparent)" }} />
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="relative py-[clamp(70px,9vw,120px)] px-[clamp(20px,5vw,48px)] bg-bg">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center max-w-[680px] mx-auto mb-[60px]">
            <span className="inline-block text-gold-dark font-bold tracking-[.22em] text-[.82rem] uppercase">
              บริการของเรา
            </span>
            <h2 className="mt-3.5 font-serif-th font-bold text-deep-green-2 leading-tight" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)" }}>
              บริการเที่ยวลาวครบวงจร ในที่เดียว
            </h2>
            <p className="mt-4 text-text-muted text-[1.05rem] leading-[1.7]">
              ตั้งแต่ <strong>จองรถตู้ลาว</strong> ตั๋วรถไฟ ไปจนถึงไกด์นำเที่ยว เราดูแลให้ทุกขั้นตอนของทริปคุณราบรื่นและคุ้มค่า
            </p>
          </Reveal>
          <div className="flex gap-[clamp(16px,2.4vw,30px)] items-end justify-center flex-wrap">
            {SERVICES.map((svc) => (
              <Link
                key={svc.tag}
                href="#contact"
                className="group relative block flex-1 min-w-0 no-underline rounded-[18px] overflow-hidden shadow-[0_30px_60px_rgba(10,31,20,.22)] hover:shadow-[0_38px_80px_rgba(10,31,20,.34)] transition-shadow"
                style={{ flexBasis: 300, maxWidth: 380, aspectRatio: "3/4.4" }}
              >
                <Image src={svc.image} alt={svc.title.join(" ")} fill sizes="380px" className="object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(6,18,11,.92) 4%,rgba(6,18,11,.25) 46%,rgba(6,18,11,.42) 100%)" }}
                />
                <h3
                  className="absolute left-6 right-6 top-[30px] m-0 font-serif-th font-bold text-[#fffaf0] leading-[1.12]"
                  style={{ fontSize: "clamp(1.5rem,2.4vw,2.1rem)", textShadow: "0 2px 18px rgba(6,18,11,.5)" }}
                >
                  {svc.title[0]}
                  <br />
                  {svc.title[1]}
                </h3>
                <span className="absolute left-6 bottom-[26px] inline-flex items-center gap-2.5 text-[#f0e6cf] text-[.78rem] font-semibold tracking-[.2em] uppercase">
                  {svc.tag}
                  <span className="text-gold-light text-base">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="relative py-[clamp(60px,8vw,110px)] px-[clamp(20px,5vw,48px)] overflow-hidden" style={{ background: "linear-gradient(180deg,#0a1f14,#123524)" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(200,148,31,.05) 0 2px,transparent 2px 16px),repeating-linear-gradient(-45deg,rgba(200,148,31,.04) 0 2px,transparent 2px 16px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto">
          <Reveal className="text-center max-w-[640px] mx-auto mb-[54px]">
            <span className="inline-block text-gold-light font-bold tracking-[.22em] text-[.82rem] uppercase">
              ทำไมต้อง HUGLAO
            </span>
            <h2 className="mt-3.5 font-serif-th font-bold text-[#fbf7ec] leading-tight" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)" }}>
              เที่ยวลาวอย่างสบายใจ เหมือนมีเพื่อนคนลาวคอยดูแล
            </h2>
          </Reveal>
          <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} delay={0.1 * (i + 1)}>
                <div className="h-full bg-white/[.04] border border-gold-light/[.18] rounded-[18px] px-[26px] py-[30px] hover:bg-gold-light/[.08] hover:border-gold-light/40 transition-colors">
                  <div className="text-[1.6rem] mb-3.5">{item.icon}</div>
                  <h3 className="m-0 mb-2 text-[1.12rem] text-[#f4ecd7] font-semibold">{item.title}</h3>
                  <p className="m-0 text-[#c4bfae] text-[.93rem] leading-[1.65]">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE ===== */}
      <section id="explore" className="py-[clamp(70px,9vw,120px)] px-[clamp(20px,5vw,48px)] bg-bg">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-5 mb-[52px]">
            <div className="max-w-[620px]">
              <span className="inline-block text-gold-dark font-bold tracking-[.22em] text-[.82rem] uppercase">เที่ยวลาว</span>
              <h2 className="mt-3.5 font-serif-th font-bold text-deep-green-2 leading-tight" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)" }}>
                จุดหมายยอดนิยมที่เราพาคุณไป
              </h2>
              <p className="mt-3.5 text-text-muted text-[1.05rem] leading-[1.7]">
                รวมเส้นทางเที่ยวลาวสุดคลาสสิก พร้อมรถตู้ VIP และไกด์ดูแลตลอดทาง
              </p>
            </div>
            <Link href="#contact" className="whitespace-nowrap no-underline text-gold-dark font-bold border-b-2 border-gold pb-1 hover:text-deep-green-2 transition-colors">
              ออกแบบทริปของคุณ →
            </Link>
          </Reveal>
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
            {DESTINATIONS.map((dest, i) => (
              <Reveal key={dest.name} delay={0.1 * (i % 3 + 1)}>
                <article
                  className="relative rounded-[20px] overflow-hidden flex flex-col justify-end p-[26px] text-white shadow-[0_20px_44px_rgba(10,31,20,.16)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(10,31,20,.26)] transition-all"
                  style={{ minHeight: 340, background: dest.gradient }}
                >
                  {dest.image && (
                    <Image src={dest.image} alt={dest.name} fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover" />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: dest.image
                        ? "linear-gradient(to top,rgba(8,22,13,.9),rgba(8,22,13,.2) 58%,rgba(8,22,13,.4))"
                        : undefined,
                      backgroundImage: dest.image ? undefined : "repeating-linear-gradient(45deg,rgba(227,189,99,.1) 0 2px,transparent 2px 13px)",
                    }}
                  />
                  {dest.tag && (
                    <div
                      className="absolute top-5 left-5 z-[2] text-[.74rem] tracking-[.18em] rounded-full px-3 py-1.5"
                      style={{ color: "#e3bd63", background: "rgba(10,31,20,.5)", border: "1px solid rgba(227,189,99,.3)" }}
                    >
                      {dest.tag}
                    </div>
                  )}
                  <div className="relative">
                    <h3 className="m-0 font-serif-th font-semibold text-[1.5rem]">{dest.name}</h3>
                    <p className="mt-2 text-[#d8d2c0] text-[.94rem] leading-[1.6]">{dest.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VANS ===== */}
      <section id="vans" className="relative py-[clamp(70px,9vw,120px)] px-[clamp(20px,5vw,48px)] overflow-hidden" style={{ background: "linear-gradient(180deg,#123524,#0a1f14)" }}>
        <div className="relative max-w-[1200px] mx-auto grid gap-[50px] items-center" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
          <Reveal>
            <span className="inline-block text-gold-light font-bold tracking-[.22em] text-[.82rem] uppercase">รถตู้ VIP · จองรถตู้ลาว</span>
            <h2 className="mt-3.5 font-serif-th font-bold text-[#fbf7ec] leading-tight" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)" }}>
              รถตู้ลาวพร้อมคนขับ จองง่าย ราคาเป็นมิตร
            </h2>
            <p className="mt-[18px] text-[#cfc9b8] text-[1.05rem] leading-[1.75]">
              เราเป็น <strong className="text-[#f4ecd7]">นายหน้าจัดหารถตู้ VIP</strong> ทั่วประเทศลาว เหมาวัน รับ-ส่งสนามบิน
              รถไฟ หรือเที่ยวหลายเมือง คัดเฉพาะรถสภาพดีและคนขับที่ไว้ใจได้ เพื่อให้การ{" "}
              <strong className="text-[#f4ecd7]">จองรถตู้ลาว</strong> ของคุณคุ้มค่าทุกบาท
            </p>
            <div className="flex flex-wrap gap-3.5 mt-[30px]">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-4 font-bold text-deep-green no-underline text-[1.02rem] shadow-[0_14px_32px_rgba(200,148,31,.38)] hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(200,148,31,.52)] transition-all"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
              >
                ขอใบเสนอราคา
              </Link>
              <Link
                href="#process"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold no-underline text-[1.02rem] border-[1.5px] border-gold-light/50 text-[#f2e7c9] hover:bg-gold-light/[.12] transition-colors"
              >
                ขั้นตอนการจอง
              </Link>
            </div>
          </Reveal>
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full blur-[6px]"
              style={{
                width: "78%",
                height: "60%",
                background: "radial-gradient(closest-side,rgba(227,189,99,.28),rgba(227,189,99,0) 72%)",
              }}
            />
            <Image
              src="/assets/van-hero.webp"
              alt="รถตู้ VIP ลาว Toyota Commuter พร้อมคนขับ จองรถตู้ลาว"
              width={750}
              height={422}
              className="relative w-full h-auto"
              style={{ filter: "drop-shadow(0 28px 40px rgba(0,0,0,.45))" }}
            />
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="py-[clamp(70px,9vw,120px)] px-[clamp(20px,5vw,48px)] bg-bg">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="text-center max-w-[600px] mx-auto mb-[60px]">
            <span className="inline-block text-gold-dark font-bold tracking-[.22em] text-[.82rem] uppercase">ง่ายใน 4 ขั้นตอน</span>
            <h2 className="mt-3.5 font-serif-th font-bold text-deep-green-2 leading-tight" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)" }}>
              จองรถตู้ลาว–วางแผนทริป แบบไม่ยุ่งยาก
            </h2>
          </Reveal>
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={0.1 * (i + 1)} className="text-center p-[18px]">
                <div
                  className="w-[74px] h-[74px] mx-auto mb-[18px] rounded-full flex items-center justify-center font-bold text-[2rem]"
                  style={
                    i === PROCESS_STEPS.length - 1
                      ? { background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)", color: "#0a1f14", boxShadow: "0 12px 26px rgba(200,148,31,.35)" }
                      : {
                          background: "linear-gradient(135deg,#123524,#1b4a32)",
                          color: "#e3bd63",
                          boxShadow: "0 12px 26px rgba(18,53,36,.25)",
                          border: "2px solid rgba(200,148,31,.4)",
                        }
                  }
                >
                  {step.n}
                </div>
                <h3 className="m-0 mb-2 text-[1.14rem] text-deep-green-2 font-semibold">{step.title}</h3>
                <p className="m-0 text-text-muted text-[.93rem] leading-[1.65]">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-[clamp(70px,9vw,120px)] px-[clamp(20px,5vw,48px)]" style={{ background: "linear-gradient(180deg,#faf8f3,#f1ece0)" }}>
        <div className="max-w-[840px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-gold-dark font-bold tracking-[.22em] text-[.82rem] uppercase">คำถามที่พบบ่อย</span>
            <h2 className="mt-3.5 font-serif-th font-bold text-deep-green-2 leading-tight" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)" }}>
              เรื่องน่ารู้ก่อนเที่ยวลาว
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3.5">
            {FAQS.map((faq) => (
              <details key={faq.q} className="bg-white border border-deep-green-2/10 rounded-[14px] px-[22px] py-1.5 shadow-[0_8px_22px_rgba(10,31,20,.05)]">
                <summary className="cursor-pointer list-none py-4 font-semibold text-deep-green-2 text-[1.05rem] flex justify-between gap-3.5">
                  {faq.q}
                  <span className="text-gold">+</span>
                </summary>
                <p className="mb-4 text-text-muted leading-[1.7]">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== CTA + CONTACT ===== */}
      <section id="contact" className="relative py-[clamp(70px,9vw,130px)] px-[clamp(20px,5vw,48px)] overflow-hidden" style={{ background: "linear-gradient(160deg,#0a1f14,#123524 60%,#0f2c1d)" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(200,148,31,.05) 0 2px,transparent 2px 16px),repeating-linear-gradient(-45deg,rgba(200,148,31,.04) 0 2px,transparent 2px 16px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div className="relative max-w-[1100px] mx-auto grid gap-[46px] items-start" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
          <Reveal>
            <span className="inline-block text-gold-light font-bold tracking-[.22em] text-[.82rem] uppercase">ติดต่อ / จองทริป</span>
            <h2 className="mt-3.5 font-serif-th font-bold text-[#fbf7ec] leading-[1.18]" style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>
              พร้อมออกเดินทาง?
              <br />
              เริ่มต้นทริปเที่ยวลาวกับเรา
            </h2>
            <p className="mt-[18px] mb-[30px] text-[#cfc9b8] text-[1.05rem] leading-[1.75]">
              ทักหาทีม ฮักลาว กรุ๊ป เพื่อขอใบเสนอราคารถตู้ VIP ตั๋วรถไฟ หรือวางแผนทริปฟรี เราตอบไวทุกช่องทาง
            </p>
            <div className="flex flex-col gap-3.5">
              <a
                href="tel:0955962525"
                className="flex items-center gap-3.5 no-underline bg-white/5 border border-gold-light/20 rounded-[14px] px-[18px] py-4 hover:bg-gold-light/10 transition-colors"
              >
                <span className="flex-none w-[46px] h-[46px] rounded-xl bg-gold-light/[.14] flex items-center justify-center text-gold-light">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l2 5v3h-2A16 16 0 0 1 4 7V4z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[#9a9588] text-[.78rem]">โทร / WhatsApp</span>
                  <span className="text-[#f4ecd7] font-semibold">095-596-2525</span>
                </span>
              </a>
              <a
                href="mailto:huglao@gmail.com"
                className="flex items-center gap-3.5 no-underline bg-white/5 border border-gold-light/20 rounded-[14px] px-[18px] py-4 hover:bg-gold-light/10 transition-colors"
              >
                <span className="flex-none w-[46px] h-[46px] rounded-xl bg-gold-light/[.14] flex items-center justify-center text-gold-light">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[#9a9588] text-[.78rem]">อีเมล</span>
                  <span className="text-[#f4ecd7] font-semibold">huglao@gmail.com</span>
                </span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
