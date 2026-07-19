"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINE_URL = "https://lin.ee/xudxWlE";

const TABS = [
  {
    label: "หน้าหลัก",
    href: "/",
    match: (path: string) => path === "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    label: "จองรถ",
    href: "/van-vip",
    match: (path: string) => path.startsWith("/van"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="9" width="18" height="9" rx="2" />
        <path d="M5 9V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
        <circle cx="7.5" cy="18" r="1.5" />
        <circle cx="16.5" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    label: "บทความ",
    href: "/articles",
    match: (path: string) => path.startsWith("/articles"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 0 4 23z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 1 2.5 2z" />
      </svg>
    ),
  },
] as const;

const LINE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="เมนูหลัก"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 flex bg-deep-green-2"
      style={{
        borderTop: "0.5px solid rgba(227,189,99,.15)",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-[3px] pt-2 min-h-[44px] text-[10px] no-underline"
            style={{ color: active ? "#e3bd63" : "#8a9c90" }}
            aria-current={active ? "page" : undefined}
          >
            <span className="w-5 h-5">{tab.icon}</span>
            {tab.label}
          </Link>
        );
      })}
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener"
        className="flex-1 flex flex-col items-center gap-[3px] pt-2 min-h-[44px] text-[10px] no-underline"
        style={{ color: "#8a9c90" }}
      >
        <span className="w-5 h-5">{LINE_ICON}</span>
        คุยทาง LINE
      </a>
    </nav>
  );
}
