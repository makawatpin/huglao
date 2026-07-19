import {
  formatPrice,
  pricingDisclaimer,
  pricingGroups,
  pricingNotes,
  type PriceGroup,
} from "@/data/pricing";

const LINE_URL = "https://lin.ee/xudxWlE";

export default function PricingTable({
  groups = pricingGroups,
  ctaHref = LINE_URL,
}: {
  groups?: PriceGroup[];
  ctaHref?: string;
}) {
  return (
    <div>
      <p className="mb-6 text-text-muted text-[.94rem] leading-[1.8] max-w-[70ch]">{pricingDisclaimer}</p>

      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mt-0 mb-3.5 font-serif-th font-bold text-deep-green-2 text-[1.15rem]">{group.title}</h3>

            {/* desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl" style={{ boxShadow: "0 14px 34px rgba(10,31,20,.08)" }}>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">เส้นทาง</th>
                    <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">ระยะเวลา</th>
                    <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">ราคาเริ่มต้น</th>
                    <th className="border border-border bg-deep-green-2 text-[#f4ecd7] font-semibold text-left px-4 py-3.5">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {group.routes.map((r, i) => (
                    <tr key={r.route + r.duration} className={i % 2 === 1 ? "bg-[#f4f0e6]" : undefined}>
                      <td className="border border-border px-4 py-3.5 text-[.96rem]">{r.route}</td>
                      <td className="border border-border px-4 py-3.5 text-[.96rem]">{r.duration}</td>
                      <td className="border border-border px-4 py-3.5 text-[.96rem] font-semibold text-deep-green-2 whitespace-nowrap">
                        {formatPrice(r.price)} <span className="font-normal text-text-muted">/{r.unit}</span>
                      </td>
                      <td className="border border-border px-4 py-3.5 text-[.9rem] text-text-muted">{r.note ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile card stack */}
            <div className="flex flex-col gap-2.5 md:hidden">
              {group.routes.map((r) => (
                <div key={r.route + r.duration} className="bg-white border border-border rounded-2xl p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-semibold text-deep-green-2 text-[.92rem] leading-snug">{r.route}</div>
                    <div className="text-right shrink-0">
                      <div className="text-[1rem] font-bold text-deep-green-2 whitespace-nowrap">{formatPrice(r.price)}</div>
                      <div className="text-text-muted text-[.76rem]">/{r.unit}</div>
                    </div>
                  </div>
                  {(r.duration !== "-" || r.note) && (
                    <div className="mt-2 pt-2 border-t border-border flex flex-wrap gap-x-3 gap-y-1 text-text-muted text-[.8rem]">
                      {r.duration !== "-" && <span>ระยะเวลา: {r.duration}</span>}
                      {r.note && <span>{r.note}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        {pricingNotes.map((note) => (
          <li key={note} className="flex gap-2.5 text-text-muted text-[.88rem] leading-[1.7]">
            <span className="text-gold-dark shrink-0">•</span>
            {note}
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-[15px] font-bold text-deep-green no-underline text-[1rem] mt-8 hover:-translate-y-1 transition-transform"
        style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)", boxShadow: "0 16px 36px rgba(168,120,21,.45)" }}
      >
        ขอใบเสนอราคา
      </a>
    </div>
  );
}
