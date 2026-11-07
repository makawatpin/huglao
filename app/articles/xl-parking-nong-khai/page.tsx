import type { Metadata } from "next";
import Link from "next/link";
const DESTINATION = "/services/xl-parking/";
export const metadata: Metadata = { title: "ย้ายไปบริการอื่น ๆ | HUGLAO", alternates: { canonical: DESTINATION }, robots: { index: false, follow: true } };
export default function Page() { return <main className="hl-shell pb-16 pt-32"><meta httpEquiv="refresh" content={`0;url=${DESTINATION}`} /><h1 className="font-serif-th text-3xl font-bold">ย้ายไปบริการอื่น ๆ</h1><Link href={DESTINATION} className="hl-button-primary mt-6">ดูรายละเอียดบริการ →</Link></main>; }
