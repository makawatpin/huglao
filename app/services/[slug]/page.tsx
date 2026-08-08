import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import { SERVICE_GROUPS, SITE } from "@/data/site";
import { getMedia } from "@/data/media";

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
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const media = getMedia(service.mediaId);

  const faqs = [
    { question: `${service.name}ยืนยันได้ทันทีหรือไม่?`, answer: "ทีม HUGLAO ต้องตรวจข้อมูล ความพร้อม ราคา และเงื่อนไขกับผู้ให้บริการที่เกี่ยวข้องก่อนทุกครั้ง" },
    { question: "การส่งข้อมูลถือว่าเป็นการจองหรือไม่?", answer: "ยังไม่ใช่การจอง ข้อมูลที่ส่งเป็นคำขอให้ตรวจสอบและจัดทำข้อเสนอเท่านั้น" },
    { question: "สามารถขอพร้อมบริการรถได้หรือไม่?", answer: "ได้ กรุณาระบุบริการเสริมในคำขอราคาเพื่อให้ทีมตรวจทั้งหมดพร้อมกัน" },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.summary,
        provider: { "@id": `${SITE.website}/#organization` },
      }) }} />
      <PageHero
        eyebrow="Additional service"
        title={service.name}
        description={`${service.summary} บริการนี้ต้องตรวจความพร้อมและยืนยันรายละเอียดก่อนทุกครั้ง`}
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บริการอื่น ๆ", href: "/services" }, { label: service.name }]}
      />
      <section className="bg-[#071d13] pb-[clamp(52px,8vw,88px)]">
        <div className="hl-shell">
          <figure className="hl-mobile-media-card hl-detail-media-card overflow-hidden rounded-[26px] border border-white/10 bg-[#0a2d20]">
            <div className="hl-mobile-media relative aspect-[16/9] sm:aspect-[16/8]">
              <Image src={media.src} alt={media.alt} fill priority sizes="100vw" className="object-cover" />
            </div>
            <figcaption className="hl-mobile-content px-5 py-4 text-xs text-[#afbeb5]">ภาพประกอบการเดินทางในเวียงจันทน์ · <Link href="/image-credits" className="font-semibold text-[#efd276]">ดูที่มาและใบอนุญาตภาพ</Link></figcaption>
          </figure>
        </div>
      </section>
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
