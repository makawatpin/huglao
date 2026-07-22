import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "contentful";
import Reveal from "@/components/Reveal";
import PricingTable from "@/components/PricingTable";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { cities, getCityBySlug } from "@/data/cities";
import { getPricingGroupsForCity } from "@/data/pricing";

const LINE_URL = "https://lin.ee/xudxWlE";

// TEMPORARY STUB (Task 2): getArticlesByCity does not exist yet in lib/contentful.ts
// (that's Task 6). Delete this local implementation and instead
// `import { getArticlesByCity } from "@/lib/contentful"` once Task 6 lands.
type CityArticleSummary = { slug: string; title: string; excerpt: string };
async function getArticlesByCity(citySlug: string): Promise<CityArticleSummary[]> {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
    const res = await client.getEntries({
      content_type: "article",
      "fields.city": citySlug,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.items.map((entry: any) => ({
      slug: entry.fields.slug ?? "",
      title: entry.fields.title ?? "",
      excerpt: entry.fields.excerpt ?? "",
    }));
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    robots: { index: !city.hidden },
    alternates: { canonical: `/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `/${city.slug}`,
      type: "website",
      images: [{ url: city.heroImage }],
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const pricingGroups = getPricingGroupsForCity(city.name);
  const otherCities = cities.filter((c) => c.slug !== city.slug && !c.hidden);
  const cityArticles = await getArticlesByCity(city.slug);

  return (
    <div>
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "รถตู้ VIP เที่ยวลาว", href: "/van-vip" },
          { name: `รถตู้${city.name}`, href: `/${city.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: city.faqs.map((f) => ({
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
            /{" "}
            <Link href="/van-vip" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              รถตู้ VIP เที่ยวลาว
            </Link>{" "}
            / <span className="text-gold-light">รถตู้{city.name}</span>
          </nav>
          <div className="max-w-[820px]">
            <span className="inline-block text-gold-light font-bold tracking-[.2em] text-[.8rem] uppercase">
              รถตู้{city.name} · พร้อมคนขับ
            </span>
            <h1
              className="mt-4 font-serif-th font-bold leading-[1.2]"
              style={{ fontSize: "clamp(2rem,5.6vw,3.4rem)", letterSpacing: "-.01em" }}
            >
              รถตู้{city.name} พร้อมคนขับ
            </h1>
            <p className="mt-5 max-w-[64ch]" style={{ color: "#cfc9b6", fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75 }}>
              {city.tagline}
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
      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-8 md:pt-[clamp(48px,7vw,72px)]">
        {city.intro.map((p, i) => (
          <p key={i} className="text-[1.08rem] leading-[1.9] text-[#3c3e33] mb-5 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      {/* ===== CTA STRIP ===== */}
      <div className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-deep-green-2 rounded-2xl px-7 py-[22px] text-[#f4ecd7]">
          <span className="text-[1.02rem] font-semibold">พร้อมออกแบบทริป{city.name}ของคุณแล้วหรือยัง?</span>
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
          </div>
        </div>
      </div>

      {/* ===== ATTRACTIONS ===== */}
      <section id="attractions" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">สถานที่เที่ยว</span>
        <h2 className="mt-3 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          เที่ยว{city.name} ที่ไหนดี
        </h2>
        <div className="relative rounded-2xl overflow-hidden mb-5 md:mb-9 aspect-[16/9] md:aspect-[16/7]">
          <Image src={city.heroImage} alt={`รถตู้${city.name} พร้อมคนขับ`} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="grid gap-3 md:gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {city.attractions.map((a, i) => (
            <Reveal key={a.name} delay={0.05 * (i + 1)}>
              <div className="h-full bg-white border border-border rounded-2xl p-4 md:p-[26px]">
                <h3 className="m-0 mb-1.5 md:mb-2 text-[.96rem] md:text-[1.05rem] text-deep-green-2">{a.name}</h3>
                <p className="m-0 text-text-muted text-[.86rem] md:text-[.94rem] leading-[1.6] md:leading-[1.7]">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 md:mt-8 text-[#3c3e33] text-[.9rem] md:text-[.98rem] leading-[1.7] md:leading-[1.8] max-w-[80ch]">{city.logistics}</p>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section id="programs" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">โปรแกรมแนะนำ</span>
        <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          โปรแกรมแนะนำ{city.name}
        </h2>
        <div className="grid grid-cols-2 gap-3 md:gap-[18px] md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {city.programs.map((p) => (
            <div key={p.title} className="bg-white border border-border rounded-2xl p-3.5 md:p-[26px]">
              <span className="inline-block text-gold-dark font-semibold text-[.72rem] md:text-[.8rem] mb-1.5 md:mb-2">{p.duration}</span>
              <h3 className="mt-0 mb-1.5 md:mb-2 font-serif-th text-[.94rem] md:text-[1.1rem] text-deep-green-2">{p.title}</h3>
              <p className="m-0 text-text-muted text-[.78rem] md:text-[.92rem] leading-[1.5] md:leading-[1.7]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">ราคา</span>
        <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          ราคารถตู้{city.name}
        </h2>
        <PricingTable groups={pricingGroups} />
      </section>

      {/* ===== ARTICLES ===== */}
      {cityArticles.length > 0 && (
        <section id="articles" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
          <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">บทความ</span>
          <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
            บทความเกี่ยวกับ{city.name}
          </h2>
          <div className="grid gap-3 md:gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            {cityArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/${city.slug}/${a.slug}`}
                className="no-underline block bg-white border border-border rounded-2xl p-4 md:p-[26px] hover:border-gold-light transition-colors"
              >
                <h3 className="m-0 mb-1.5 md:mb-2 text-[.96rem] md:text-[1.05rem] text-deep-green-2">{a.title}</h3>
                <p className="m-0 text-text-muted text-[.86rem] md:text-[.94rem] leading-[1.6] md:leading-[1.7]">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      <section id="faq" className="max-w-[840px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">คำถามที่พบบ่อย</span>
        <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          FAQ รถตู้{city.name}
        </h2>
        <div className="flex flex-col gap-3">
          {city.faqs.map((faq) => (
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

      {/* ===== INTERNAL LINKS ===== */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/van-vip"
            className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
          >
            ← ดูภาพรวมรถตู้ VIP เที่ยวลาวทั้งหมด
          </Link>
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              รถตู้{c.name} →
            </Link>
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
              พร้อมพาคุณเที่ยว{city.name}แล้ววันนี้
            </h2>
            <p className="m-0 text-[#cfc9b6] text-[1rem] leading-[1.8]">
              แจ้งวันเดินทาง จำนวนผู้โดยสาร และโปรแกรมที่ต้องการ ทีมงานจะจัดรถตู้ VIP และเสนอราคาให้ภายในไม่กี่ชั่วโมง
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
