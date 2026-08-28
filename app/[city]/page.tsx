import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const LEGACY_CITY_ROUTES = {
  vangvieng: "/routes/vientiane-vang-vieng",
  muangfeuang: "/routes/vientiane-muang-feuang",
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LEGACY_CITY_ROUTES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const target = LEGACY_CITY_ROUTES[city as keyof typeof LEGACY_CITY_ROUTES];
  if (!target) return {};
  return { title: "หน้านี้ย้ายแล้ว", robots: { index: false, follow: true }, alternates: { canonical: target } };
}

export default async function LegacyCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const target = LEGACY_CITY_ROUTES[city as keyof typeof LEGACY_CITY_ROUTES];
  if (!target) notFound();
  return (
    <main className="min-h-[70vh] bg-[#f7f3e9] px-5 pb-20 pt-40 text-center">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1 className="font-serif-th text-3xl font-bold text-[#0a2d20]">หน้านี้ย้ายไปยังโครงสร้างเส้นทางใหม่แล้ว</h1>
      <p className="mt-4 text-[#59645d]">หากหน้าไม่เปลี่ยนอัตโนมัติ กรุณากดลิงก์ด้านล่าง</p>
      <Link href={target} className="mt-7 inline-flex rounded-full bg-[#0a2d20] px-6 py-3 font-bold text-white">ไปยังหน้าเส้นทาง</Link>
    </main>
  );
}
