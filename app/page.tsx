import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getAllArticles } from "@/lib/contentful";
import {
  BOOKING_STEPS,
  HOME_FAQS,
  PICKUP_POINTS,
  READY_SERVICES,
  ROUTE_GROUPS,
  SITE,
  VEHICLE_GROUPS,
} from "@/data/site";
import { getMedia } from "@/data/media";
import { CURRENT_PRICE_ROWS } from "@/data/pricing";
import { mergeArticlePreviews } from "@/data/articles";

const HOME_PRICE_ROWS = CURRENT_PRICE_ROWS.filter((row) =>
  ["thanaleng-city", "vientiane-city-1d", "vientiane-vang-vieng-1d"].includes(row.id),
);

const TRUST_POINTS = [
  {
    title: "เที่ยวตามแผนของคุณ",
    description: "เลือกปลายทาง เวลา จุดแวะ และจังหวะการเดินทางเอง ไม่ต้องตามตารางกรุ๊ปทัวร์",
  },
  {
    title: "คนท้องถิ่นพาไป",
    description: "ประสานรถพร้อมคนขับจากพาร์ตเนอร์ในพื้นที่ให้เหมาะกับรูปแบบการเดินทาง",
  },
  {
    title: "มีผู้ช่วยประสานงาน",
    description: "ทีม HUGLAO ช่วยรวบรวมรายละเอียด ตรวจข้อเสนอ และยืนยันนัดหมายก่อนเดินทาง",
  },
] as const;

export default async function Home() {
  const articles = mergeArticlePreviews(await getAllArticles()).slice(0, 3);

  return (
    <main>
      <section className="relative isolate min-h-[700px] overflow-hidden bg-[#071d13] pt-[72px] text-white md:min-h-[800px]">
        <Image
          src={getMedia("vehicleVan").src}
          alt={getMedia("vehicleVan").alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,20,13,.97)_0%,rgba(4,20,13,.86)_44%,rgba(4,20,13,.28)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_55%,#071d13_100%)]" />

        <div className="hl-shell flex min-h-[628px] items-center py-16 md:min-h-[728px] md:py-20">
          <div className="max-w-[790px]">
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#efd276]/35 bg-[#071d13]/55 px-4 py-2 text-xs font-semibold tracking-[.12em] text-[#efd276] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#efd276]" />
              {SITE.slogan}
            </p>
            <h1 className="font-serif-th text-[clamp(3rem,7vw,6.7rem)] font-bold leading-[1.04] tracking-[-.035em] text-[#fffaf0]">
              รถพร้อมคนขับ
              <span className="block text-[#efd276]">เที่ยวลาวแบบส่วนตัว</span>
            </h1>
            <p className="mt-7 max-w-[650px] text-[clamp(1.05rem,2vw,1.35rem)] leading-8 text-[#e5e7df]">
              เลือกปลายทาง เวลา และจังหวะการเดินทางเอง ให้คนท้องถิ่นพาไป โดยมี HUGLAO ช่วยประสานทุกขั้นตอน
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#d8af4a] px-7 font-bold text-[#092217] shadow-[0_16px_42px_rgba(216,175,74,.25)] transition hover:-translate-y-1 hover:bg-[#efd276]"
              >
                ส่งรายละเอียดทริปผ่าน LINE
              </a>
              <Link
                href="/car-with-driver"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                ดูประเภทรถที่ให้บริการ
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#cbd2cc]">
              <span>เริ่มจากเวียงจันทน์</span><span className="text-[#d8af4a]">•</span><span>เลือกแผนเอง</span><span className="text-[#d8af4a]">•</span><span>ยืนยันราคาก่อนจอง</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071d13] pb-24 text-white">
        <div className="hl-shell grid gap-8 rounded-[32px] border border-white/10 bg-white/[.045] p-[clamp(28px,5vw,60px)] lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <span className="hl-kicker !text-[#efd276]">HUGLAO คือใคร</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight">
              ไม่ใช่กรุ๊ปทัวร์
              <br />แต่เป็นผู้ช่วยให้คุณเที่ยวลาวในแบบของตัวเอง
            </h2>
          </div>
          <div className="grid content-center gap-5 text-[1.02rem] leading-8 text-[#cbd2cc]">
            <p>
              HUGLAO เป็นบริษัทตัวกลางจัดหาและประสานรถจากพาร์ตเนอร์ เราช่วยเปลี่ยนรายละเอียดทริปของคุณ
              ให้เป็นข้อเสนอรถพร้อมคนขับที่ตรวจสอบได้ก่อนตัดสินใจ
            </p>
            <p>
              คุณยังเป็นคนเลือกว่าจะไปไหน ออกกี่โมง แวะตรงไหน และใช้เวลากับแต่ละสถานที่เท่าไร
              เพราะทริปที่ดีไม่ควรถูกเร่งด้วยตารางของคนอื่น
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <Reveal className="max-w-[760px]">
            <span className="hl-kicker">จุดรับฝั่งเวียงจันทน์</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">เลือกจุดนัดหมายที่เข้ากับการเดินทางของคุณ</h2>
            <p className="mt-5 leading-8 text-[#59645d]">จุดรับและตำแหน่งนัดพบจะถูกยืนยันอีกครั้งในข้อเสนอก่อนจอง</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PICKUP_POINTS.map((point, index) => {
              const media = getMedia(point.mediaId);
              return (
                <Reveal key={point.slug} delay={index * 0.07} className="hl-mobile-media-card overflow-hidden rounded-[26px] border border-[#ddd4c1] bg-[#f7f3e9]">
                  <div className="hl-mobile-media relative aspect-[16/10] overflow-hidden bg-[#e8e1d2]">
                    <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 112px, 33vw" className="object-cover" />
                  </div>
                  <div className="hl-mobile-content p-7">
                    <span className="text-xs font-bold text-[#9b711c]">0{index + 1}</span>
                    <h3 className="mt-5 font-serif-th text-2xl font-bold text-[#0a2d20]">{point.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#59645d]">{point.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,120px)]" id="vehicles">
        <div className="hl-shell">
          <Reveal className="max-w-[760px]">
            <span className="hl-kicker">เลือกประเภทรถ</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.12] text-[#071d13]">
              เริ่มจากจำนวนคน
              <br />แล้วเลือกรถที่เหมาะกับทริป
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#59645d]">
              ให้บริการเช่ารถพร้อมคนขับในลาว ทั้งรถเก๋ง, SUV, MPV, รถตู้ และมินิบัส เหมาะกับทริปครอบครัว กลุ่มเพื่อน หรือคณะเดินทาง ราคาคำนวณตามเส้นทาง จำนวนวัน และความต้องการจริง ทีมงานช่วยออกแบบเส้นทาง นัดหมาย และยืนยันราคาพร้อมรายละเอียดก่อนการจอง เพื่อการเดินทางที่ปลอดภัยและโปร่งใส
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {VEHICLE_GROUPS.map((vehicle, index) => {
              const media = getMedia(vehicle.mediaIds[0]);
              return <Reveal key={vehicle.slug} delay={index * 0.06}>
                <Link
                  href={`/car-with-driver/${vehicle.slug}`}
                  className="hl-mobile-media-card hl-vehicle-card group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-white shadow-[0_20px_60px_rgba(27,49,37,.07)] transition hover:-translate-y-2 hover:border-[#d8af4a] sm:rounded-[28px]"
                >
                  <div className="hl-mobile-media relative aspect-[16/10] overflow-hidden">
                    <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1280px) 50vw, 20vw" className="object-contain transition duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <div className="hl-mobile-content flex flex-1 flex-col p-6">
                    <span className="hl-vehicle-order text-xs font-bold tracking-[.18em] text-[#9b711c]">0{index + 1}</span>
                    <h3 className="mt-5 font-serif-th text-2xl font-bold text-[#0a2d20]">{vehicle.shortName}</h3>
                    <p className="hl-vehicle-detail mt-3 flex-1 text-sm leading-7 text-[#687169]">{vehicle.description}</p>
                    <span className="mt-5 text-sm font-bold text-[#0d3827] transition group-hover:text-[#9b711c]">ดูรายละเอียด →</span>
                  </div>
                </Link>
              </Reveal>;
            })}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#687169]">ภาพรถเป็นภาพประกอบประเภทของรถ รุ่น ปีรถ ผังที่นั่ง และสีจริงขึ้นอยู่กับรถพาร์ตเนอร์ที่ว่างและจะแจ้งก่อนยืนยัน</p>
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,120px)]">
        <div className="hl-shell">
          <div className="grid gap-6 lg:grid-cols-3">
            {TRUST_POINTS.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.08} className="border-t border-[#d8af4a] pt-7">
                <span className="font-serif-th text-5xl text-[#d8af4a]/55">0{index + 1}</span>
                <h2 className="mt-6 font-serif-th text-2xl font-bold text-[#071d13]">{point.title}</h2>
                <p className="mt-4 leading-7 text-[#59645d]">{point.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hl-grid-pattern bg-[#0a2d20] py-[clamp(72px,9vw,120px)] text-white" id="routes">
        <div className="hl-shell">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <span className="hl-kicker !text-[#efd276]">เส้นทางจากเวียงจันทน์</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[1.1]">
              ทุกคันเริ่มที่เวียงจันทน์
              <br />ปลายทางเป็นของคุณ
            </h2>
            <p className="mt-6 max-w-[650px] text-lg leading-8 text-[#c8d3cc]">
              แจ้งปลายทางที่ต้องการ ระยะเวลาบริการ จำนวนผู้โดยสาร และสัมภาระ
              ทีมงานจะตรวจรถที่เหมาะสมและสรุปข้อเสนอให้ก่อนยืนยัน
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/travel-with-us#routes" className="rounded-full border border-white/25 px-6 py-3 font-semibold hover:bg-white/10">
                ดูเส้นทางทั้งหมด
              </Link>
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#d8af4a] px-6 py-3 font-bold text-[#092217] hover:bg-[#efd276]">
                ส่งปลายทางเพื่อขอราคา
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="rounded-[32px] border border-white/10 bg-white/[.06] p-8 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#efd276]">ข้อมูลที่ใช้จัดข้อเสนอ</p>
            <dl className="mt-7 divide-y divide-white/10">
              {[
                ["จุดเริ่มต้น", "เวียงจันทน์"],
                ["ปลายทาง", "ตามที่คุณเลือก"],
                ["เวลา", "กำหนดตามแผนทริป"],
                ["ประเภทรถ", "เลือกตามคนและสัมภาระ"],
                ["ราคา", "ยืนยันพร้อมสิ่งที่รวมก่อนจอง"],
              ].map(([term, value]) => (
                <div key={term} className="grid grid-cols-[115px_1fr] gap-5 py-4">
                  <dt className="text-sm text-[#91a198]">{term}</dt>
                  <dd className="font-semibold text-[#f8f4e9]">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROUTE_GROUPS.slice(0, 3).map((route, index) => (
              <Reveal key={route.slug} delay={index * 0.04}>
                <Link href={`/routes/${route.slug}`} className="hl-mobile-media-card group block h-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[.055] transition hover:-translate-y-1 hover:border-[#d8af4a]/60">
                  <div className="hl-mobile-media relative aspect-[4/3] overflow-hidden bg-white/5 sm:aspect-[16/10]">
                    <Image src={getMedia(route.mediaId).src} alt={getMedia(route.mediaId).alt} fill sizes="(max-width: 639px) 112px, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
                  </div>
                  <div className="hl-mobile-content p-6">
                    <h3 className="font-serif-th text-xl font-bold text-white">{route.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#b9c7be]">{route.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/travel-with-us#routes" className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-[#efd276] transition hover:border-[#d8af4a] hover:bg-white/10">
              ดูเส้นทางจากเวียงจันทน์ทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#efe8d9] py-[clamp(72px,9vw,110px)]" id="pricing">
        <div className="hl-shell">
          <Reveal className="max-w-[820px]">
            <span className="hl-kicker">ราคาเริ่มต้นที่ยืนยันแล้ว</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.1rem,4vw,3.6rem)] font-bold leading-tight text-[#071d13]">ดูราคาเบื้องต้นก่อนวางแผนทริป</h2>
            <p className="mb-8 mt-5 leading-8 text-[#59645d]">ตัวอย่างราคาจากฐานราคาเดียวกับหน้ารายละเอียด แยกเก๋ง/SUV, MPV และรถตู้อย่างชัดเจน</p>
          </Reveal>
          <Reveal delay={0.1}>
            <PublishedPriceTable rows={HOME_PRICE_ROWS} showCrossBorderNote={false} />
            <Link href="/travel-with-us#pricing" className="mt-7 inline-flex rounded-full bg-[#0a2d20] px-6 py-3 font-bold text-white">ดูตารางราคาทั้งหมด →</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-[clamp(56px,7vw,88px)]" id="booking-steps">
        <div className="hl-shell">
          <Reveal className="max-w-[760px]">
            <span className="hl-kicker">ขั้นตอนการจอง</span>
            <h2 className="mt-4 font-serif-th text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-tight text-[#071d13]">จากแผนในใจ สู่รถที่จุดนัดหมาย</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {BOOKING_STEPS.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.05} className="grid grid-cols-[2rem_minmax(0,1fr)] content-start gap-x-3 rounded-[18px] border border-[#e6dfd1] bg-[#f7f3e9] p-4 sm:rounded-[20px] sm:p-5 lg:block">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{step.number}</span>
                <h3 className="self-center text-base font-bold leading-6 text-[#0a2d20] lg:mt-4">{step.title}</h3>
                <p className="col-start-2 mt-1.5 text-[.82rem] leading-6 text-[#687169] lg:col-auto lg:mt-2">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,120px)]" id="services">
        <div className="hl-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <span className="hl-kicker">บริการเสริมที่พร้อม</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">
              ให้แผนเดินทางต่อกันง่ายขึ้น
            </h2>
            <p className="mt-5 leading-8 text-[#59645d]">
              เลือกเฉพาะสิ่งที่ต้องการ เราจะช่วยประสานโดยไม่เปลี่ยนทริปส่วนตัวให้กลายเป็นแพ็กเกจบังคับ
            </p>
            <Link href="/services" className="mt-8 inline-flex font-bold text-[#9b711c]">ดูบริการทั้งหมด →</Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {READY_SERVICES.map((service, index) => (
              <Reveal key={service} delay={index * 0.05} className="flex min-h-[120px] items-center rounded-[22px] border border-[#ddd4c1] bg-white px-6 py-5">
                <span className="mr-4 text-sm font-bold text-[#d8af4a]">0{index + 1}</span>
                <h3 className="font-semibold text-[#0a2d20]">{service}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-[clamp(56px,8vw,112px)]">
        <div className="hl-shell grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <figure className="overflow-hidden rounded-[22px] bg-[#071d13] shadow-[0_18px_50px_rgba(7,29,19,0.14)] sm:rounded-[30px]">
              <div className="relative aspect-[16/9] sm:aspect-[16/10] lg:h-[430px] lg:aspect-auto">
                <Image
                  src={getMedia("vientianePatuxai").src}
                  alt={getMedia("vientianePatuxai").alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-5 py-4 font-serif-th text-base font-semibold leading-7 text-white sm:px-7 sm:py-5 sm:text-xl">
                เที่ยวลาวด้วยตัวเอง ให้คนท้องถิ่นพาไป
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="min-w-0" delay={0.1}>
            <span className="hl-kicker">เรื่องราว HUGLAO</span>
            <h2 className="mt-4 font-serif-th text-[clamp(2rem,7vw,4rem)] font-bold leading-tight text-[#071d13] sm:mt-5">
              เริ่มจากทีมงาน
            </h2>
            <p className="mt-5 text-base leading-8 text-[#59645d] sm:mt-6 sm:text-lg sm:leading-9">
              HUGLAO เกิดจากเทป อาว และชะ ซึ่งเชื่อว่าการเที่ยวลาวควรเป็นเรื่องง่าย เป็นส่วนตัว และยืดหยุ่น
              เราจึงทำหน้าที่เชื่อมลูกค้ากับพาร์ตเนอร์ในพื้นที่ พร้อมช่วยประสานรายละเอียดให้ทริปเดินหน้าได้ตามแผนของคุณ
            </p>
            <Link href="/about" className="mt-7 inline-flex w-full justify-center rounded-full border border-[#0a2d20]/20 px-6 py-3 text-center font-bold text-[#0a2d20] hover:border-[#d8af4a] sm:mt-8 sm:w-auto">
              รู้จัก HUGLAO เพิ่มเติม
            </Link>
          </Reveal>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="bg-[#efe8d9] py-[clamp(72px,9vw,110px)]">
          <div className="hl-shell">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="hl-kicker">บทความ</span>
                <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold text-[#071d13]">เตรียมทริปให้มั่นใจกว่าเดิม</h2>
              </div>
              <Link href="/articles" className="font-bold text-[#9b711c]">ดูบทความทั้งหมด →</Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="hl-mobile-media-card hl-article-card overflow-hidden rounded-[20px] bg-white shadow-[0_18px_50px_rgba(27,49,37,.07)] sm:rounded-[24px]">
                  <div className="hl-mobile-media relative aspect-[16/9] bg-[#d8d0be]">
                    {article.cover && (
                      <Image
                        src={article.cover}
                        alt={article.title}
                        fill
                        sizes="(max-width: 639px) 112px, 33vw"
                        className={article.cover.includes("vehicle-") || article.cover.includes("/van-") ? "object-contain p-1.5 sm:p-3" : "object-cover"}
                      />
                    )}
                  </div>
                  <div className="hl-mobile-content p-6">
                    <h3 className="font-serif-th text-xl font-bold leading-snug text-[#0a2d20]">{article.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#687169]">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-[clamp(72px,9vw,120px)]" id="faq">
        <div className="hl-shell grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <Reveal>
            <span className="hl-kicker">คำถามที่พบบ่อย</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">รู้ให้ครบก่อนส่งแผนทริป</h2>
          </Reveal>
          <Reveal delay={0.08} className="divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {HOME_FAQS.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold text-[#0a2d20]">
                  {faq.question}
                  <span className="text-2xl font-light text-[#9b711c] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[760px] pb-6 pr-10 leading-8 text-[#59645d]">{faq.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a2d20] py-[clamp(80px,10vw,140px)] text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,175,74,.18),transparent_55%)]" />
        <Reveal className="hl-shell relative">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#efd276]">เริ่มวางแผนกับ HUGLAO</span>
          <h2 className="mx-auto mt-6 max-w-[980px] font-serif-th text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.08]">
            ส่งวันเดินทาง จำนวนคน
            <br />และปลายทางที่คุณอยากไป
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-lg leading-8 text-[#c8d3cc]">
            ทีมงานจะช่วยประสานรถที่เหมาะกับทริป และส่งรายละเอียดให้ตรวจสอบก่อนยืนยัน
          </p>
          <a
            href={SITE.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-[#d8af4a] px-8 font-bold text-[#092217] shadow-[0_18px_50px_rgba(216,175,74,.2)] transition hover:-translate-y-1 hover:bg-[#efd276]"
          >
            ส่งรายละเอียดทริปผ่าน LINE
          </a>
        </Reveal>
      </section>
    </main>
  );
}
