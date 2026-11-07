import ContentCard from "@/components/ContentCard";
import type { Metadata } from "next";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import { SERVICE_GROUPS } from "@/data/site";
import { getMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "บริการเดินทาง",
  description: "บริการเดินทางสำหรับทริปลาว จองตั๋วรถไฟและเครื่องบิน ประสานไกด์ วางแผนทริป พร้อมบริการบัตรผ่านแดนและฝากรถก่อนข้ามลาว",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Travel services"
        title="บริการที่ช่วยให้ทริปลาวสะดวกขึ้น"
        description="จองตั๋วรถไฟและเครื่องบิน ประสานไกด์ วางแผนทริป พร้อมบริการบัตรผ่านแดนและฝากรถก่อนข้ามลาว"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บริการเดินทาง" }]}
      />
      <section className="bg-[#f7f3e9] py-[clamp(52px,9vw,120px)]">
        <div className="hl-shell">
          <span className="hl-kicker">พร้อมเปิดให้บริการ</span>
          <div className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {SERVICE_GROUPS.map((service) => {
              const media = getMedia(service.mediaId);
              return <ContentCard key={service.slug} href={`/services/${service.slug}/`} title={service.name} description={service.summary} image={media} heading="h2" />;
            })}
          </div>
        </div>
      </section>
      <LineCta title="ต้องการเพิ่มบริการใดในทริป?" />
    </main>
  );
}
