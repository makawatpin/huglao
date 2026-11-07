import Link from "next/link";

const CHOICES = [
  { id: "discover", title: "หาไอเดียเที่ยว", text: "ดูเมืองและเส้นทาง แล้วเลือกแบบที่ชอบ", href: "#journeys", action: "สำรวจเส้นทาง" },
  { id: "plan", title: "ช่วยจัดแผนให้", text: "บอกวันว่างและสิ่งที่อยากทำ ให้ทีมช่วยคิดต่อ", href: "/services/private-trip-planning/", action: "เริ่มวางแผนกับเรา" },
  { id: "ready", title: "มีแผนแล้ว", text: "เลือกรถ ตั๋วรถไฟ และบริการที่ต้องการเพิ่ม", href: "#travel-services", action: "เลือกบริการเดินทาง" },
] as const;

function ChoiceIcon({ type }: { type: (typeof CHOICES)[number]["id"] }) {
  return <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === "discover" ? <><circle cx="16" cy="16" r="11" /><path d="m21 11-3 7-7 3 3-7 7-3Z" /><path d="M16 2v3m0 22v3M2 16h3m22 0h3" /></> : type === "plan" ? <><path d="m4 7 8-3 8 3 8-3v21l-8 3-8-3-8 3V7Z" /><path d="M12 4v21m8-18v21" /><path d="m8 16 5-3 5 4 6-6" /></> : <><rect x="5" y="5" width="22" height="23" rx="4" /><path d="M11 3v5m10-5v5M5 12h22m-17 7 4 4 8-8" /></>}
  </svg>;
}

export default function PlanChoices() {
  return <section id="plan-your-trip" className="scroll-mt-24 bg-[#f7f3e9] py-12 sm:py-16"><div className="hl-shell">
    <p className="text-xs font-bold tracking-widest text-[#86611a]">เริ่มได้จากสิ่งที่คุณมี</p>
    <h2 className="city-heading mt-3">อยากเริ่มวางแผนแบบไหน?</h2>
    <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-5">{CHOICES.map(c => <Link key={c.id} href={c.href} className="group relative flex min-h-32 items-start gap-4 overflow-hidden rounded-[22px] border border-[#d8af4a]/35 bg-white p-5 text-[#0a2d20] transition duration-200 hover:-translate-y-0.5 hover:border-[#b18a2f] hover:bg-[#fffaf0] active:bg-[#faf0d9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b18a2f] md:flex-col md:gap-6 md:p-7">
      <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full border border-[#d8af4a]/15 md:h-40 md:w-40" />
      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#f7f3e9] text-[#0a2d20] transition-colors group-hover:bg-[#f4e9ca]"><ChoiceIcon type={c.id} /></span>
      <div className="relative min-w-0 flex-1"><h3 className="font-serif-th text-xl font-bold sm:text-2xl">{c.title}</h3><p className="mt-2 text-sm leading-7 text-[#59645d]">{c.text}</p><span className="mt-3 inline-flex min-h-8 items-center gap-3 text-sm font-bold text-[#86611a]">{c.action}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span></div>
    </Link>)}</div>
  </div></section>;
}
