import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ติดต่อ HUGLAO",
  description: "ช่องทางติดต่อ HUGLAO ย้ายไปรวมอยู่ในหน้าเกี่ยวกับ HUGLAO",
  alternates: { canonical: "/about" },
  robots: { index: false, follow: true },
};

export default function LegacyContactPage() {
  return (
    <main className="flex min-h-[70vh] items-center bg-[#f7f3e9] px-5 pb-16 pt-32">
      <script dangerouslySetInnerHTML={{ __html: "window.location.replace('/about/#contact');" }} />
      <div className="mx-auto max-w-[680px] rounded-[26px] border border-[#ddd4c1] bg-white p-8 text-center shadow-[0_18px_50px_rgba(27,49,37,.08)] sm:p-12">
        <span className="hl-kicker">Contact HUGLAO</span>
        <h1 className="mt-5 font-serif-th text-3xl font-bold text-[#071d13]">ช่องทางติดต่อย้ายไปหน้าเกี่ยวกับ HUGLAO</h1>
        <p className="mt-4 leading-8 text-[#59645d]">เราได้รวมเรื่องราว ข้อมูลบริษัท และช่องทางติดต่อไว้ในหน้าเดียว เพื่อให้ค้นหาข้อมูลได้ง่ายขึ้น</p>
        <Link href="/about#contact" className="hl-button-primary mt-7">ไปยังช่องทางติดต่อ</Link>
      </div>
    </main>
  );
}
