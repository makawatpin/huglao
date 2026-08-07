import Image from "next/image";
import Link from "next/link";
import { SERVICE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";

const INFORMATION_LINKS = [
  { href: "/travel-with-us", label: "เที่ยวลาวกับ HUGLAO" },
  { href: "/travel-with-us#pricing", label: "เส้นทางและราคารถ" },
  { href: "/articles", label: "บทความเที่ยวลาว" },
  { href: "/about", label: "เกี่ยวกับ HUGLAO" },
] as const;

const LEGAL_LINKS = [
  { href: "/contact", label: "ติดต่อเรา" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
  { href: "/terms", label: "ข้อกำหนดการใช้บริการ" },
  { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
  { href: "/image-credits", label: "เครดิตภาพ" },
] as const;

const footerLinkClass = "transition-colors hover:text-[#efd276] focus-visible:text-[#efd276]";

export default function SiteFooter() {
  return (
    <footer className="bg-[#06170f] px-[clamp(20px,5vw,56px)] pb-8 pt-12 text-[#b9c2ba]">
      <div className="mx-auto max-w-[1280px]">
        <section className="flex flex-col gap-6 rounded-[26px] border border-[#d8af4a]/25 bg-[#0a2418] px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between" aria-labelledby="footer-cta-title">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#d8af4a]">เริ่มวางแผนทริปจากเวียงจันทน์</p>
            <h2 id="footer-cta-title" className="mt-2 font-serif-th text-2xl font-bold leading-tight text-white sm:text-3xl">ส่งวันเดินทาง จำนวนคน และปลายทางให้เราช่วยตรวจรถ</h2>
          </div>
          <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#d8af4a] px-6 font-bold text-[#06170f] transition hover:bg-[#efd276]">
            ขอราคาผ่าน LINE OA
          </a>
        </section>

        <div className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 xl:grid-cols-[1.25fr_.85fr_1fr_1.25fr]">
          <section aria-labelledby="footer-brand-title">
            <Link href="/" aria-label="HUGLAO หน้าแรก" className="inline-flex">
              <Image src="/assets/huglao-nav-logo.png" alt="HUGLAO" width={250} height={56} className="h-11 w-auto" />
            </Link>
            <h2 id="footer-brand-title" className="sr-only">HUGLAO รถพร้อมคนขับเที่ยวลาว</h2>
            <p className="mt-5 max-w-[31rem] text-sm leading-7 text-[#aeb8b0]">บริษัทตัวกลางจัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์ สำหรับทริปส่วนตัวที่เริ่มจากเวียงจันทน์ ให้คุณเลือกปลายทาง เวลา และจังหวะการเดินทางเอง</p>
            <p className="mt-4 font-serif-th text-lg font-semibold text-[#e7c875]">{SITE.slogan}</p>
          </section>

          <nav aria-labelledby="footer-vehicles-title">
            <h2 id="footer-vehicles-title" className="mb-5 text-sm font-bold uppercase tracking-[.12em] text-white">รถพร้อมคนขับ</h2>
            <ul className="space-y-3 text-sm">
              {VEHICLE_GROUPS.map((vehicle) => (
                <li key={vehicle.slug}>
                  <Link href={`/car-with-driver/${vehicle.slug}`} className={footerLinkClass}>{vehicle.name}</Link>
                </li>
              ))}
              <li><Link href="/car-with-driver" className="font-semibold text-[#e7c875] hover:text-white">ดูประเภทรถทั้งหมด →</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-services-title">
            <h2 id="footer-services-title" className="mb-5 text-sm font-bold uppercase tracking-[.12em] text-white">บริการและข้อมูลเที่ยวลาว</h2>
            <ul className="space-y-3 text-sm">
              {SERVICE_GROUPS.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={footerLinkClass}>{service.name}</Link>
                </li>
              ))}
              {INFORMATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-company-title">
            <h2 id="footer-company-title" className="mb-5 text-sm font-bold uppercase tracking-[.12em] text-white">ข้อมูลบริษัทและติดต่อ</h2>
            <address className="not-italic">
              <p className="font-semibold leading-7 text-white">{SITE.legalName}</p>
              <p className="mt-2 text-sm leading-7 text-[#aeb8b0]">{SITE.registeredAddress}</p>
              <p className="mt-2 text-sm text-[#aeb8b0]">เลขนิติบุคคล {SITE.registrationNumber}</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>LINE OA: HUGLAO</a></li>
                <li><a href={SITE.phoneHref} className={footerLinkClass}>โทร {SITE.phoneDisplay}</a></li>
                <li><a href={`mailto:${SITE.email}`} className={`${footerLinkClass} break-all`}>{SITE.email}</a></li>
              </ul>
            </address>
          </section>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-[#7f8e83] lg:flex-row lg:items-center lg:justify-between">
          <span>© 2026 {SITE.legalName} สงวนลิขสิทธิ์</span>
          <nav aria-label="ข้อมูลสำคัญท้ายเว็บไซต์">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-white">{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
