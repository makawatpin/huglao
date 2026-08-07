"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MAIN_NAV, SITE } from "@/data/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[120] border-b border-white/10 bg-[#071d13]/95 text-white shadow-[0_12px_40px_rgba(2,14,9,.22)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-5 px-[clamp(18px,4vw,40px)]">
          <Link href="/" aria-label="HUGLAO หน้าแรก" className="shrink-0">
            <Image
              src="/assets/huglao-nav-logo.png"
              alt="HUGLAO"
              height={56}
              width={250}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <nav aria-label="เมนูหลัก" className="hidden items-center gap-5 xl:flex">
            {MAIN_NAV.slice(1, 7).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
                className={`relative py-2 text-[.86rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-[#e7c875] after:transition-transform hover:text-[#e7c875] ${pathname === link.href || pathname.startsWith(`${link.href}/`) ? "text-[#efd276] after:scale-x-100" : "text-[#f5f0e4] after:scale-x-0 hover:after:scale-x-100"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/travel-with-us#pricing"
              className="hidden text-sm font-semibold text-[#efd276] hover:text-white lg:inline-flex"
            >
              ดูราคา
            </Link>
            <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#d8af4a] px-5 py-2.5 text-sm font-bold text-[#0b271b] shadow-[0_10px_26px_rgba(216,175,74,.25)] transition hover:-translate-y-0.5 hover:bg-[#efd276]">ขอราคาผ่าน LINE</a>
          </div>

          <button
            type="button"
            aria-label="เปิดเมนู"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl xl:hidden"
          >
            <span aria-hidden="true">≡</span>
          </button>
        </div>
      </header>

      <button
        type="button"
        aria-label="ปิดเมนู"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[140] bg-[#031009]/70 backdrop-blur-sm transition-opacity xl:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[150] flex w-[min(88vw,390px)] flex-col bg-[#0a261a] p-6 text-white shadow-[-24px_0_70px_rgba(0,0,0,.4)] transition-transform duration-300 xl:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
          <span className="text-sm font-semibold tracking-[.18em] text-[#e7c875]">เมนู HUGLAO</span>
          <button
            type="button"
            aria-label="ปิดเมนู"
            onClick={() => setOpen(false)}
            className="h-10 w-10 rounded-full bg-white/10 text-lg"
          >
            ×
          </button>
        </div>

        <nav aria-label="เมนูมือถือ" className="flex flex-1 flex-col overflow-y-auto">
          {MAIN_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ? "page" : undefined}
              className={`border-b border-white/[.08] py-3.5 text-[1rem] ${pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ? "font-semibold text-[#efd276]" : "text-[#f5f0e4]"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/travel-with-us#pricing"
          onClick={() => setOpen(false)}
          className="mt-5 rounded-full bg-[#d8af4a] px-5 py-4 text-center font-bold text-[#0b271b]"
        >
          ดูเส้นทางและราคา
        </Link>
        <a
          href={SITE.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 rounded-full border border-white/20 px-5 py-3 text-center font-semibold text-white"
        >
          ติดต่อ LINE OA
        </a>
      </aside>
    </>
  );
}
