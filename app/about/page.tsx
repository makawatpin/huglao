import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SITE } from "@/data/site";
import { getMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "เกี่ยวกับ HUGLAO และช่องทางติดต่อ",
  description:
    "รู้จัก HUGLAO ผู้ช่วยประสานรถพร้อมคนขับเที่ยวลาวสำหรับทริปส่วนตัว ตรวจสอบวิธีทำงาน ข้อมูลบริษัท และติดต่อขอราคารถจากเวียงจันทน์ผ่าน LINE โทรศัพท์ หรืออีเมล",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "เกี่ยวกับ HUGLAO | รถพร้อมคนขับเที่ยวลาว",
    description: "รู้จักทีม วิธีทำงาน ข้อมูลบริษัท และช่องทางติดต่อ HUGLAO สำหรับวางแผนรถเที่ยวลาวแบบส่วนตัว",
    url: "/about",
    type: "website",
    images: [{ url: getMedia("vientianePatuxai").src, alt: getMedia("vientianePatuxai").alt }],
  },
};

const PRINCIPLES = [
  {
    number: "01",
    title: "เริ่มจากแผนของลูกค้า",
    description: "ปลายทาง เวลา จุดแวะ จำนวนผู้เดินทาง และจังหวะของทริปเริ่มจากความต้องการของคุณ ไม่ใช่โปรแกรมสำเร็จรูป",
  },
  {
    number: "02",
    title: "ตรวจรายละเอียดก่อนยืนยัน",
    description: "ประเภทรถ ราคา สิ่งที่รวม จุดนัดหมาย และเงื่อนไขจะถูกรวบรวมให้ตรวจสอบก่อนชำระมัดจำ",
  },
  {
    number: "03",
    title: "ประสานกับคนในพื้นที่",
    description: "HUGLAO เชื่อมลูกค้ากับพาร์ตเนอร์รถและผู้ให้บริการในลาว พร้อมช่วยประสานข้อมูลให้ตรงกันก่อนวันเดินทาง",
  },
] as const;

const TRIP_DETAILS = [
  "วันและเวลาที่ต้องการเดินทาง",
  "จำนวนผู้โดยสาร",
  "จำนวนและขนาดสัมภาระ",
  "จุดรับและปลายทาง",
  "จำนวนวันที่ต้องการใช้รถ",
  "ประเภทรถหรือความต้องการพิเศษ",
] as const;

const ABOUT_FAQS = [
  {
    question: "HUGLAO ให้บริการอะไร?",
    answer: "เราช่วยรวบรวมความต้องการ จัดหา และประสานรถพร้อมคนขับจากพาร์ตเนอร์ในลาวสำหรับการเดินทางส่วนตัว รวมถึงบริการที่เกี่ยวข้องตามความพร้อมของแต่ละทริป",
  },
  {
    question: "ต้องส่งข้อมูลอะไรเพื่อขอราคา?",
    answer: "ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับ ปลายทาง ระยะเวลาที่ใช้รถ และประเภทรถที่สนใจ เพื่อให้ทีมตรวจรถและจัดทำข้อเสนอได้ตรงขึ้น",
  },
  {
    question: "ติดต่อ HUGLAO ทางไหนได้บ้าง?",
    answer: `ช่องทางหลักคือ LINE OA นอกจากนี้ติดต่อได้ทางโทรศัพท์ ${SITE.phoneDisplay} และอีเมล ${SITE.email}`,
  },
] as const;

export default function AboutPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${SITE.website}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: `${SITE.website}/about/`,
      logo: `${SITE.website}/assets/huglao-emblem.png`,
      description: "ผู้ช่วยจัดหาและประสานรถพร้อมคนขับเที่ยวลาวสำหรับทริปส่วนตัว",
      telephone: SITE.phoneDisplay,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.registeredAddress,
        addressCountry: "TH",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phoneDisplay,
        contactType: "customer service",
        availableLanguage: ["Thai", "Lao"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ABOUT_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        eyebrow="About & Contact HUGLAO"
        title="รู้จัก HUGLAO และเริ่มวางแผนเที่ยวลาวกับเรา"
        description="ผู้ช่วยจัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์ในลาว สำหรับผู้ที่ต้องการเที่ยวตามแผนของตัวเอง พร้อมช่องทางติดต่อและข้อมูลบริษัทในหน้าเดียว"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับและติดต่อ HUGLAO" }]}
      />

      <section className="bg-[#f7f3e9] py-[clamp(56px,8vw,104px)]" aria-labelledby="about-story-title">
        <div className="hl-shell grid items-center gap-8 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <figure className="overflow-hidden rounded-[22px] border border-[#ddd4c1] bg-[#071d13] shadow-[0_18px_50px_rgba(7,29,19,.12)] sm:rounded-[28px]">
            <div className="relative aspect-[16/9] sm:aspect-[16/10] lg:h-[440px] lg:aspect-auto">
              <Image
                src={getMedia("vientianePatuxai").src}
                alt={getMedia("vientianePatuxai").alt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
                preload
              />
            </div>
            <figcaption className="px-5 py-4 text-sm font-semibold leading-6 text-white sm:px-7 sm:text-lg">
              เที่ยวลาวด้วยตัวเอง โดยมีคนท้องถิ่นช่วยพาไป
            </figcaption>
          </figure>

          <div className="min-w-0">
            <span className="hl-kicker">เรื่องราว HUGLAO</span>
            <h2 id="about-story-title" className="mt-4 font-serif-th text-[clamp(2rem,5vw,3.7rem)] font-bold leading-tight text-[#071d13]">
              เราเชื่อว่าทริปส่วนตัวควรยืดหยุ่นและเข้าใจง่าย
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[#59645d] sm:text-lg sm:leading-9">
              <p>HUGLAO เกิดจากเทป อาว และชะ ซึ่งต้องการช่วยให้การเที่ยวลาวด้วยตัวเองสะดวกขึ้น โดยไม่ต้องเปลี่ยนแผนส่วนตัวให้เป็นโปรแกรมกรุ๊ปทัวร์</p>
              <p>เรารับรายละเอียดจากลูกค้า แล้วช่วยจัดหาและประสานรถจากพาร์ตเนอร์ในพื้นที่ เพื่อให้ทั้งสองฝ่ายเห็นข้อมูลเรื่องเส้นทาง เวลา ประเภทรถ ราคา และเงื่อนไขตรงกันก่อนเดินทาง</p>
              <p>ลูกค้ายังคงเป็นผู้เลือกปลายทาง จุดแวะ และจังหวะของทริป ส่วน HUGLAO ทำหน้าที่ช่วยให้องค์ประกอบการเดินทางเชื่อมต่อกันง่ายขึ้น</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/car-with-driver" className="hl-button-primary">ดูรถเที่ยวลาว</Link>
              <Link href="/travel-with-us" className="hl-button-secondary">ดูเส้นทางและราคา</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(56px,7vw,92px)]" aria-labelledby="principles-title">
        <div className="hl-shell">
          <div className="max-w-[760px]">
            <span className="hl-kicker">วิธีทำงานของเรา</span>
            <h2 id="principles-title" className="mt-4 font-serif-th text-[clamp(2rem,4vw,3.3rem)] font-bold leading-tight text-[#071d13]">
              ชัดเจนก่อนจอง ยืดหยุ่นตามแผนจริง
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <article key={principle.number} className="rounded-[22px] border border-[#ddd4c1] bg-[#f9f6ef] p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{principle.number}</span>
                <h3 className="mt-5 text-xl font-bold text-[#0a2d20]">{principle.title}</h3>
                <p className="mt-3 leading-7 text-[#59645d]">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-[#efe8d9] py-[clamp(56px,8vw,104px)]" aria-labelledby="contact-title">
        <div className="hl-shell">
          <div className="max-w-[820px]">
            <span className="hl-kicker">ติดต่อ HUGLAO</span>
            <h2 id="contact-title" className="mt-4 font-serif-th text-[clamp(2rem,5vw,3.8rem)] font-bold leading-tight text-[#071d13]">
              ส่งรายละเอียดทริป เพื่อให้เราตรวจรถและเสนอราคา
            </h2>
            <p className="mt-4 max-w-[720px] leading-8 text-[#59645d]">LINE OA เป็นช่องทางหลักสำหรับส่งข้อมูลทริป ยิ่งรายละเอียดครบ ทีมยิ่งตรวจประเภทรถและสรุปข้อเสนอได้ตรงความต้องการ</p>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
            <div className="rounded-[24px] bg-[#0a2d20] p-6 text-white sm:p-8">
              <h3 className="font-serif-th text-2xl font-bold">ข้อมูลที่ควรส่งเพื่อขอราคา</h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {TRIP_DETAILS.map((detail, index) => (
                  <li key={detail} className="flex items-start gap-3 rounded-[15px] border border-white/10 bg-white/[.055] p-4 text-sm leading-6 text-[#e4ebe6]">
                    <span className="shrink-0 font-bold text-[#efd276]">0{index + 1}</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ol>
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d8af4a] px-6 font-bold text-[#071d13] transition hover:bg-[#efd276] sm:w-auto">
                ส่งรายละเอียดผ่าน LINE OA
              </a>
            </div>

            <div className="grid content-start gap-3">
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="rounded-[20px] border border-[#d8af4a] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
                <span className="text-xs font-bold tracking-[.14em] text-[#9b711c]">ช่องทางหลัก</span>
                <strong className="mt-2 block text-lg text-[#0a2d20]">LINE OA — ส่งรายละเอียดและขอราคา</strong>
              </a>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={SITE.phoneHref} className="rounded-[20px] border border-[#ddd4c1] bg-white p-5 transition hover:border-[#d8af4a]">
                  <span className="text-sm text-[#687169]">โทรศัพท์</span>
                  <strong className="mt-2 block text-lg text-[#0a2d20]">{SITE.phoneDisplay}</strong>
                </a>
                <a href={`mailto:${SITE.email}`} className="min-w-0 rounded-[20px] border border-[#ddd4c1] bg-white p-5 transition hover:border-[#d8af4a]">
                  <span className="text-sm text-[#687169]">อีเมล</span>
                  <strong className="mt-2 block break-all text-base text-[#0a2d20]">{SITE.email}</strong>
                </a>
              </div>
              <address className="rounded-[20px] border border-[#ddd4c1] bg-white p-5 not-italic">
                <span className="text-sm text-[#687169]">ข้อมูลบริษัท</span>
                <strong className="mt-2 block leading-7 text-[#0a2d20]">{SITE.legalName}</strong>
                <p className="mt-2 text-sm leading-7 text-[#59645d]">{SITE.registeredAddress}</p>
                <p className="mt-2 text-sm text-[#59645d]">เลขนิติบุคคล {SITE.registrationNumber}</p>
              </address>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(56px,7vw,92px)]" aria-labelledby="about-faq-title">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเกี่ยวกับ HUGLAO</span>
          <h2 id="about-faq-title" className="mt-4 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">ข้อมูลสำคัญก่อนติดต่อ</h2>
          <div className="mt-7 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {ABOUT_FAQS.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-[#0a2d20]">
                  {faq.question}<span className="text-2xl font-light text-[#9b711c] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[780px] pb-6 pr-8 leading-8 text-[#59645d]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
