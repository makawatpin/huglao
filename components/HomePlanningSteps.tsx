import { SITE } from "@/data/site";

const STEPS = [
  { title: "บอกแผนที่อยากไป", text: "ส่งเมือง วันเดินทาง จำนวนคน และสไตล์ที่ชอบ ยังไม่มีแผนชัดเจนก็คุยกันได้", icon: "chat" },
  { title: "เลือกบริการที่เหมาะ", text: "คุยเส้นทาง จุดแวะ รถ และบริการเสริม ให้พอดีกับเวลาและแผนของคุณ", icon: "route" },
  { title: "ตรวจรายละเอียดก่อนจอง", text: "ดูราคา สิ่งที่รวม จุดนัดหมาย และเงื่อนไขให้ครบก่อนยืนยัน", icon: "check" },
] as const;

function StepIcon({ kind }: { kind: (typeof STEPS)[number]["icon"] }) {
  return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
    {kind === "chat" ? <><path d="M7 6h18a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H14l-7 5v-5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z"/><path d="M10 12h12M10 17h8"/></> : kind === "route" ? <><circle cx="8" cy="8" r="3"/><circle cx="24" cy="24" r="3"/><path d="M8 11v8a5 5 0 0 0 5 5h8M16 8h7a5 5 0 0 1 0 10h-7M19 5l-3 3 3 3"/></> : <><rect x="7" y="5" width="20" height="24" rx="3"/><path d="M12 5V3h10v5H12M12 17l3 3 7-7M12 25h10"/></>}
  </svg>;
}

export default function HomePlanningSteps() {
  return <section className="bg-[#f7f3e9] py-12 sm:py-20" aria-labelledby="planning-steps-title">
    <div className="hl-shell grid items-start gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
      <div>
        <p className="hl-kicker">จากไอเดีย สู่วันเดินทาง</p>
        <h2 id="planning-steps-title" className="mt-4 font-serif-th text-[1.75rem] font-bold leading-snug text-[#0a2d20] sm:text-4xl">ช่วยวางแผน<br />ดูแลรายละเอียด</h2>
        <p className="mt-4 max-w-lg text-sm leading-[1.7] text-[#59645d] sm:text-base">เริ่มจากเมืองที่อยากไปหรือวันหยุดที่มี เราช่วยเรียบเรียงแผนและบริการ พร้อมสรุปค่าใช้จ่ายให้ดูก่อนยืนยัน</p>
        <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-5">เริ่มคุยแผนเที่ยว</a>
      </div>
      <ol className="grid gap-3">
        {STEPS.map((step, index) => <li key={step.icon} className="relative overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white p-4 sm:p-5">
          <div className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#eef2e9] text-[#315e46] sm:right-5 sm:top-5"><StepIcon kind={step.icon} /></div>
          <p aria-hidden="true" className="pr-16 text-[11px] font-semibold tracking-wider text-[#86611a]">ขั้นตอนที่ 0{index + 1}</p>
          <h3 className="mt-1 pr-16 text-base font-semibold leading-[1.6] text-[#0a2d20]">{step.title}</h3>
          <p className="mt-3 text-sm leading-[1.6] text-[#59645d]">{step.text}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}
