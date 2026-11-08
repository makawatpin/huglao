import type { Metadata } from "next";
import Link from "next/link";
const DESTINATION = "/services/temporary-border-pass/";
export const metadata: Metadata = { title: "บริการบัตรผ่านแดนชั่วคราว", alternates: { canonical: DESTINATION }, robots: { index: false, follow: true } };
export default function Page() { return <main className="hl-shell pb-16 pt-32"><meta httpEquiv="refresh" content={`0;url=${DESTINATION}`} /><h1 className="font-serif-th text-3xl font-bold">ย้ายไปหน้าบริการเดินทาง</h1><Link href={DESTINATION} className="hl-button-primary mt-6">ดูรายละเอียดบริการ →</Link></main>; }
