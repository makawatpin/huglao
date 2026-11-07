import Link from "next/link";

const SERVICES = [
  { title: "ตั๋วเครื่องบิน", text: "ตรวจเที่ยวบินภายในลาวและสัมภาระ", href: "/services/laos-domestic-flights/", icon: "m3 17 11-3V5l4-2v11l11 3v3l-11-1v6l4 2v2l-6-1-6 1v-2l4-2v-6L3 20Z" },
  { title: "รถพร้อมคนขับ", text: "เลือกรถและจุดรับที่เหมาะกับคุณ", href: "/car-with-driver/", icon: "M5 16 7 9h18l2 7M4 16h24v9H4zM8 25v3m16-3v3M9 21h1m12 0h1" },
  { title: "ตั๋วรถไฟ", text: "เช็กเส้นทางและวันเดินทาง", href: "/services/train-ticket/", icon: "M9 4h14a3 3 0 0 1 3 3v16H6V7a3 3 0 0 1 3-3ZM6 15h20M11 28l3-5m7 5-3-5M11 19h1m8 0h1" },
  { title: "ไกด์ท้องถิ่น", text: "เลือกภาษาและแผนเที่ยวที่ต้องการ", href: "/services/local-guide/", icon: "M25 13c0 7-9 15-9 15S7 20 7 13a9 9 0 0 1 18 0ZM19 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
  { title: "วางแผนทริป", text: "จัดเส้นทางตามความสนใจของคุณ", href: "/services/private-trip-planning/", icon: "m4 7 8-3 8 3 8-3v21l-8 3-8-3-8 3V7Zm8-3v21m8-18v21M8 15l5-3 5 5 6-7" },
  { title: "บัตรผ่านแดน", text: "ดูเอกสารและขั้นตอนข้ามแดน", href: "/services/temporary-border-pass/", icon: "M8 3h12l6 6v20H8V3Zm12 0v7h6M12 16h10m-10 5h10m-10 4h6" },
  { title: "ฝากรถหนองคาย", text: "ค่าจอดรถและรถรับส่งด่าน", href: "/services/xl-parking/", icon: "M7 4h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm6 20V10h5a4 4 0 0 1 0 8h-5" },
] as const;

export default function HomeServiceCards() {
  return <section id="travel-services" className="scroll-mt-24 bg-white py-14 sm:py-20"><div className="hl-shell">
    <h2 className="city-heading">บริการที่ช่วยให้แผนเดินทางต่อกัน</h2>
    <p className="mt-3 text-sm leading-7 text-[#59645d]">เลือกบริการที่ต้องการให้เข้ากับทริปของคุณ</p>
    <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">{SERVICES.map(service => <Link key={service.href} href={service.href} className="group flex min-h-44 min-w-0 flex-col rounded-[20px] border border-[#e4ddcd] bg-white p-4 shadow-[0_3px_14px_rgba(10,45,32,.035)] transition duration-200 hover:border-[#b18a2f] hover:bg-[#fffdf7] active:bg-[#f7f3e9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b18a2f] sm:p-6">
      <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f7f3e9] text-[#0a2d20] transition-colors group-hover:bg-[#f4e9ca]"><svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={service.icon} /></svg></span><span aria-hidden="true" className="text-lg text-[#aa9868] transition-transform group-hover:translate-x-1">↗</span></div>
      <h3 className="mt-4 text-base font-bold leading-6 text-[#0a2d20] sm:text-lg">{service.title}</h3>
      <p className="mt-1 text-xs leading-6 text-[#687169] sm:text-sm">{service.text}</p>
    </Link>)}</div>
    <Link href="/services/" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#86611a] underline underline-offset-4">ดูบริการทั้งหมด <span aria-hidden="true">→</span></Link>
  </div></section>;
}
