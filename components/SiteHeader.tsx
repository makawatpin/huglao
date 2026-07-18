"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINE_URL = "https://lin.ee/xudxWlE";

const NAV_LINKS = [
  { href: "/#services", label: "บริการ" },
  { href: "/#explore", label: "เที่ยวลาว" },
  { href: "/van-vip", label: "รถตู้ VIP" },
  { href: "/#process", label: "ขั้นตอนจอง" },
  { href: "/#faq", label: "คำถามที่พบบ่อย" },
  { href: "/articles", label: "บทความ" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 26);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[120] flex items-center justify-between gap-5 px-[clamp(18px,4vw,48px)] transition-[background,box-shadow,padding] duration-400"
        style={{
          height: 56,
          background: scrolled ? "rgba(8,22,13,0.96)" : "rgba(10,31,20,0.35)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${scrolled ? "rgba(200,148,31,0.28)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: scrolled ? "0 12px 34px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/huglao-nav-logo.png"
            alt="HUGLAO ฮักลาว กรุ๊ป"
            height={56}
            width={250}
            className="h-9 w-auto drop-shadow-[0_2px_5px_rgba(0,0,0,.4)]"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-[.96rem] font-medium hover:text-gold-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full px-[22px] py-[11px] font-bold text-[.95rem] text-deep-green shadow-[0_10px_24px_rgba(200,148,31,.35)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(200,148,31,.5)] transition-all"
            style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
          >
            จองเลย
          </a>
        </nav>

        <button
          aria-label="เปิดเมนู"
          onClick={() => setOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-[11px] bg-white/10 border border-gold/40 text-[#f4ecd7]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
      </header>

      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[150] transition-opacity duration-300"
        style={{
          background: "rgba(5,15,9,.55)",
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />
      <aside
        className="fixed top-0 right-0 bottom-0 z-[160] flex flex-col gap-1 p-6 transition-transform duration-450"
        style={{
          width: "min(82vw,340px)",
          background: "linear-gradient(165deg,#0a1f14,#123524)",
          boxShadow: "-20px 0 60px rgba(0,0,0,.45)",
          transform: open ? "translateX(0)" : "translateX(105%)",
          borderLeft: "1px solid rgba(200,148,31,.25)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="ปิดเมนู"
          className="self-end w-[42px] h-[42px] rounded-[10px] bg-white/10 border border-gold/30 text-[#f4ecd7] mb-4 text-xl"
        >
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-[#ece6d5] px-2 py-3.5 border-b border-white/[.07] text-[1.05rem]"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          className="mt-4 text-center rounded-full py-[15px] font-bold text-[1.05rem] text-deep-green"
          style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
        >
          จองรถตู้ลาวเลย
        </a>
      </aside>
    </>
  );
}
