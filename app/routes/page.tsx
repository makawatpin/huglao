import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "หน้านี้ย้ายไปเที่ยวลาวกับเราแล้ว",
  description: "ดูเส้นทางจากเวียงจันทน์และวางแผนทริปได้ที่หน้าเที่ยวลาวกับเรา",
  robots: { index: false, follow: true },
  alternates: { canonical: "/travel-with-us" },
};

export default function LegacyRoutesPage() {
  const target = "/travel-with-us#routes";
  return (
    <main className="min-h-[70vh] bg-[#f7f3e9] px-5 pb-20 pt-40 text-center">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1 className="font-serif-th text-3xl font-bold text-[#0a2d20]">ย้ายเส้นทางทั้งหมดไปหน้าเที่ยวลาวกับเราแล้ว</h1>
      <p className="mt-4 text-[#59645d]">หากหน้าไม่เปลี่ยนอัตโนมัติ กรุณากดปุ่มด้านล่าง</p>
      <Link href={target} className="mt-7 inline-flex rounded-full bg-[#0a2d20] px-6 py-3 font-bold text-white">ดูเส้นทางจากเวียงจันทน์</Link>
    </main>
  );
}
