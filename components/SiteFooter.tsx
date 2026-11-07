import Image from "next/image";
import Link from "next/link";
import { ROUTE_GROUPS, SERVICE_GROUPS, SITE, VEHICLE_GROUPS, getVehicleHref } from "@/data/site";

const FOOTER_ROUTE_SLUGS = [
  "vientiane-city",
  "vientiane-vang-vieng",
  "vientiane-muang-feuang",
  "muang-feuang-vang-vieng",
  "vientiane-nam-pien-yorla-pa",
] as const;

const FOOTER_ROUTES = FOOTER_ROUTE_SLUGS.flatMap((slug) => ROUTE_GROUPS.filter((route) => route.slug === slug));

const INFORMATION_LINKS = [
  { href: "/car-with-driver/#city-services", label: "เหมารถตามเมือง" },
  { href: "/travel-with-us", label: "เที่ยวลาวกับ HUGLAO" },
  { href: "/car-with-driver/#pricing", label: "ราคารถพร้อมคนขับ" },
  { href: "/articles", label: "บทความเที่ยวลาว" },
  { href: "/about", label: "เกี่ยวกับ HUGLAO" },
] as const;

const LEGAL_LINKS = [
  { href: "/about#contact", label: "ติดต่อ HUGLAO" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
  { href: "/terms", label: "ข้อกำหนดการใช้บริการ" },
  { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
  { href: "/image-credits", label: "เครดิตภาพ" },
] as const;

const footerLinkClass = "transition-colors hover:text-[#efd276] focus-visible:text-[#efd276]";

export default function SiteFooter() {
  return (
    <footer className="bg-[#06170f] px-[clamp(20px,5vw,56px)] pb-[calc(2rem+68px+env(safe-area-inset-bottom))] pt-12 text-[#b9c2ba] md:pb-8">
      <div className="mx-auto max-w-[1280px]">

        <div className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 xl:grid-cols-[1.25fr_.85fr_1fr_1.25fr]">
          <section aria-labelledby="footer-brand-title">
            <Link href="/" aria-label="HUGLAO หน้าแรก" className="inline-flex">
              <Image src="/assets/huglao-nav-logo.webp" alt="HUGLAO" width={250} height={56} className="h-11 w-auto" />
            </Link>
            <p id="footer-brand-title" className="sr-only">HUGLAO เที่ยวลาวและทริปส่วนตัว</p>
            <p className="mt-5 max-w-[31rem] text-sm leading-7 text-[#aeb8b0]">วางแผนเที่ยวลาวและการเดินทางส่วนตัวกับ HUGLAO เริ่มจากเวียงจันทน์ วังเวียง หรือหลวงพระบาง เลือกเส้นทาง รถพร้อมคนขับ และบริการเสริมให้เหมาะกับแผนของคุณ</p>
            <p className="mt-4 font-serif-th text-lg font-semibold text-[#e7c875]">{SITE.slogan}</p>
          </section>

          <nav aria-labelledby="footer-vehicles-title">
            <p id="footer-vehicles-title" className="mb-5 text-sm font-bold uppercase tracking-[.12em] text-white">รถพร้อมคนขับ</p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/vientiane/" className={footerLinkClass}>เช่ารถตู้เวียงจันทน์พร้อมคนขับ</Link></li>
              {VEHICLE_GROUPS.map((vehicle) => (
                <li key={vehicle.slug}>
                  <Link href={getVehicleHref(vehicle.slug)} className={footerLinkClass}>{vehicle.name}</Link>
                </li>
              ))}
              <li><Link href="/car-with-driver/" className="font-semibold text-[#e7c875] hover:text-white">ดูประเภทรถทั้งหมด →</Link></li>
            </ul>
            <p id="footer-routes-title" className="mb-5 mt-10 text-sm font-bold uppercase tracking-[.12em] text-white">เส้นทางยอดนิยม</p>
            <ul aria-labelledby="footer-routes-title" className="space-y-3 text-sm">
              {FOOTER_ROUTES.map((route) => (
                <li key={route.slug}>
                  <Link href={`/routes/${route.slug}/`} className={footerLinkClass}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services-title">
            <p id="footer-services-title" className="mb-5 text-sm font-bold uppercase tracking-[.12em] text-white">บริการและข้อมูลเที่ยวลาว</p>
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
            <p id="footer-company-title" className="mb-5 text-sm font-bold uppercase tracking-[.12em] text-white">ข้อมูลบริษัทและติดต่อ</p>
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
