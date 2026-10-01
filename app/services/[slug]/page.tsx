import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import { SERVICE_GROUPS, SERVICE_SEO, SITE } from "@/data/site";
import { getMedia } from "@/data/media";
import { formatPrice } from "@/data/pricing";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_GROUPS.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  return SERVICE_GROUPS.find((service) => service.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const seo = SERVICE_SEO[service.slug];
  const title = seo?.title ?? service.name;
  const description = seo?.description ?? service.summary;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: `${title} | HUGLAO`,
      description,
      url: `/services/${service.slug}/`,
      images: [{ url: getMedia(service.mediaId).src, alt: getMedia(service.mediaId).alt }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const media = getMedia(service.mediaId);
  const seo = SERVICE_SEO[service.slug];

  const faqs = [
    ...(seo?.faqs ?? []),
    { question: `${service.name}ยืนยันได้ทันทีหรือไม่?`, answer: "ทีม HUGLAO ต้องตรวจข้อมูล ความพร้อม ราคา และเงื่อนไขกับผู้ให้บริการที่เกี่ยวข้องก่อนทุกครั้ง" },
    { question: "การส่งข้อมูลถือว่าเป็นการจองหรือไม่?", answer: "ยังไม่ใช่การจอง ข้อมูลที่ส่งเป็นคำขอให้ตรวจสอบและจัดทำข้อเสนอเท่านั้น" },
    { question: "สามารถขอพร้อมบริการรถได้หรือไม่?", answer: "ได้ กรุณาระบุบริการเสริมในคำขอราคาเพื่อให้ทีมตรวจทั้งหมดพร้อมกัน" },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: seo?.heading ?? service.name,
        url: `${SITE.website}/services/${service.slug}/`,
        description: seo?.description ?? service.summary,
        provider: { "@id": `${SITE.website}/#organization` },
        areaServed: "Laos",
        offers: seo?.prices?.map((item) => ({
          "@type": "Offer",
          name: item.label,
          description: item.note,
          priceSpecification: { "@type": "UnitPriceSpecification", price: item.price, priceCurrency: "THB", ...(item.unit === "วัน" ? { unitCode: "DAY" } : { unitText: "ต่อคน" }) },
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }) }} />
      <PageHero
        eyebrow="Additional service"
        title={seo?.heading ?? service.name}
        description={`${service.summary} บริการนี้ต้องตรวจความพร้อมและยืนยันรายละเอียดก่อนทุกครั้ง`}
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บริการอื่น ๆ", href: "/services" }, { label: service.name }]}
      />
      <section className="bg-[#071d13] pb-[clamp(52px,8vw,88px)]">
        <div className="hl-shell">
          <figure className="hl-mobile-media-card hl-detail-media-card overflow-hidden rounded-[26px] border border-white/10 bg-[#0a2d20]">
            <div className="hl-mobile-media relative aspect-[16/9] sm:aspect-[16/8]">
              <Image src={media.src} alt={media.alt} fill priority sizes="100vw" className="object-cover" />
            </div>
            <figcaption className="hl-mobile-content px-5 py-4 text-xs text-[#afbeb5]">ภาพประกอบบริการ · <Link href="/image-credits" className="font-semibold text-[#efd276]">ดูเครดิตภาพ</Link></figcaption>
          </figure>
        </div>
      </section>
      {seo ? (
        <section className="bg-white py-[clamp(64px,8vw,100px)]">
          <div className="hl-shell max-w-[900px]">
            <span className="hl-kicker">{service.name}</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">{seo.introHeading}</h2>
            {seo.intro.map((paragraph) => <p key={paragraph} className="mt-5 leading-8 text-[#59645d]">{paragraph}</p>)}
            {seo.steps ? (
              <div className="mt-10">
                <h2 className="font-serif-th text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight text-[#071d13]">{`ขั้นตอน${seo.heading}`}</h2>
                <ol className="mt-6 grid gap-4">
                  {seo.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4 rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9] p-6">
                      <span className="text-sm font-bold text-[#9b711c]">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-[#0a2d20]">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#59645d]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            {seo.prices ? (
              <div className="mt-10">
                <h2 className="font-serif-th text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight text-[#071d13]">{`ราคา${seo.heading}`}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {seo.prices.map((item) => (
                    <li key={item.label} className="rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9] p-6">
                      <h3 className="font-semibold text-[#0a2d20]">{item.label}</h3>
                      <p className="mt-3 font-serif-th text-3xl font-bold text-[#071d13]">{formatPrice(item.price)}<span className="ml-1 text-base font-semibold text-[#59645d]">/{item.unit}</span></p>
                      <p className="mt-3 text-sm leading-7 text-[#59645d]">{item.note}</p>
                    </li>
                  ))}
                </ul>
                {seo.priceNote ? <p className="mt-4 text-sm leading-7 text-[#59645d]">{seo.priceNote}</p> : null}
              </div>
            ) : null}
            {seo.relatedLink ? <Link href={seo.relatedLink.href} className="mt-7 inline-flex font-bold text-[#9b711c]">{seo.relatedLink.label}</Link> : null}
          </div>
        </section>
      ) : null}
      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="hl-kicker">ข้อมูลที่ต้องใช้</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">ส่งข้อมูลให้ครบ เพื่อให้ตรวจได้เร็วขึ้น</h2>
            <p className="mt-5 leading-8 text-[#59645d]">HUGLAO ทำหน้าที่ช่วยประสาน ไม่รับรองความพร้อมจนกว่าจะได้รับการตอบกลับและยืนยันข้อเสนอ</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {service.requiredInfo.map((item, index) => (
              <li key={item} className="rounded-[22px] border border-[#ddd4c1] bg-white p-6">
                <span className="text-xs font-bold text-[#9b711c]">0{index + 1}</span>
                <h3 className="mt-4 font-semibold text-[#0a2d20]">{item}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-white py-[clamp(64px,8vw,100px)]">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเกี่ยวกับบริการ</span>
          <div className="mt-8 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {faqs.map((faq) => <details key={faq.question} className="py-1"><summary className="cursor-pointer py-5 font-semibold text-[#0a2d20]">{faq.question}</summary><p className="pb-6 leading-8 text-[#59645d]">{faq.answer}</p></details>)}
          </div>
          <Link href="/services" className="mt-8 inline-flex font-bold text-[#9b711c]">← กลับไปดูบริการทั้งหมด</Link>
        </div>
      </section>
      <LineCta title={`สอบถามบริการ${service.name}`} description="ส่งวันเดินทาง จำนวนคน และรายละเอียดที่เกี่ยวข้อง เพื่อให้ทีม HUGLAO ตรวจความพร้อมและจัดทำข้อเสนอ" />
    </main>
  );
}
