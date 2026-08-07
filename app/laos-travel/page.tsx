import type { Metadata } from "next";
import Link from "next/link";

const TARGET = "/travel-with-us";

export const metadata: Metadata = { title: "หน้านี้ย้ายแล้ว", robots: { index: false, follow: true }, alternates: { canonical: TARGET } };

export default function LegacyTravelPage() {
  return <main className="min-h-[70vh] bg-[#f7f3e9] px-5 pb-20 pt-40 text-center"><meta httpEquiv="refresh" content={`0;url=${TARGET}`} /><h1 className="font-serif-th text-3xl font-bold text-[#0a2d20]">หน้าเที่ยวลาวย้ายแล้ว</h1><Link href={TARGET} className="mt-7 inline-flex rounded-full bg-[#0a2d20] px-6 py-3 font-bold text-white">ไปยังหน้าใหม่</Link></main>;
}
