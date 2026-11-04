import { SITE } from "@/data/site";

type ChecklistItem = string | { title: string; hint?: string };

export default function ChecklistPanel({
  title,
  items,
  footer = "ยังไม่ครบก็ทักมาได้ ทีมงานช่วยถามต่อให้",
  ctaLabel = "ส่งรายละเอียดทาง LINE",
}: {
  title: string;
  items: readonly ChecklistItem[];
  footer?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-white shadow-[0_16px_45px_rgba(7,29,19,.06)]">
      <div className="flex items-center justify-between gap-3 bg-[#0a2d20] px-5 py-4 sm:px-7">
        <div>
          <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-[#d8af4a]">Checklist</p>
          <p className="mt-0.5 font-serif-th text-lg font-bold text-white">{title}</p>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#efd276]">{items.length} รายการ</span>
      </div>
      <ol className="grid sm:grid-cols-2">
        {items.map((raw, index) => {
          const item = typeof raw === "string" ? { title: raw } : raw;
          return (
            <li
              key={item.title}
              className={`flex gap-3 border-t border-[#eee8da] px-5 first:border-t-0 sm:px-6 sm:[&:nth-child(2)]:border-t-0 sm:odd:border-r ${item.hint ? "py-3.5 sm:py-5" : "items-center py-3.5 sm:py-4"}`}
            >
              <span className={`grid size-7 shrink-0 place-items-center rounded-full bg-[#f6ebcd] text-xs font-bold text-[#86611a] ${item.hint ? "mt-0.5" : ""}`}>{index + 1}</span>
              <div className="min-w-0">
                <h3 className="text-[.95rem] font-semibold leading-6 text-[#0a2d20]">{item.title}</h3>
                {item.hint ? <p className="text-[.8rem] leading-5 text-[#7a8079]">{item.hint}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="flex flex-col gap-3 border-t border-[#eee8da] bg-[#faf7ef] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-[.82rem] leading-6 text-[#59645d]">{footer}</p>
        <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#06c755] px-5 text-sm font-bold text-white transition hover:bg-[#05b34c]">{ctaLabel}</a>
      </div>
    </div>
  );
}
