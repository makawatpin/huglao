import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export default function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="hl-grid-pattern relative overflow-hidden bg-[#071d13] px-5 pb-[clamp(48px,7vw,92px)] pt-[clamp(104px,12vw,152px)] text-white">
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full border border-[#d8af4a]/15 bg-[#d8af4a]/[.04]" />
      <div className="pointer-events-none absolute right-20 top-40 h-32 w-32 rounded-full border border-white/10" />
      <div className="relative mx-auto max-w-[1240px]">
        {breadcrumbs && (
          <nav aria-label="เส้นทางหน้าเว็บ" className="mb-7 flex flex-wrap gap-2 text-xs text-[#9caaa1]">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {item.href ? <Link href={item.href} className="hover:text-white">{item.label}</Link> : <span>{item.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <span className="hl-kicker !text-[#efd276]">{eyebrow}</span>
            <h1 className="mt-5 max-w-[900px] font-serif-th text-[clamp(2.1rem,5.5vw,5rem)] font-bold leading-[1.1] tracking-[-.025em]">{title}</h1>
            <p className="mt-6 max-w-[760px] text-[clamp(1rem,2vw,1.2rem)] leading-8 text-[#c8d3cc]">{description}</p>
          </div>
          <dl className="hidden rounded-[24px] border border-white/10 bg-white/[.055] p-6 text-sm backdrop-blur-sm lg:block">
            <div className="border-b border-white/10 pb-4"><dt className="text-[#91a198]">จุดเริ่มต้นบริการ</dt><dd className="mt-1 font-semibold text-white">เวียงจันทน์</dd></div>
            <div className="border-b border-white/10 py-4"><dt className="text-[#91a198]">รูปแบบการเดินทาง</dt><dd className="mt-1 font-semibold text-white">ทริปส่วนตัวตามแผนคุณ</dd></div>
            <div className="pt-4"><dt className="text-[#91a198]">การยืนยัน</dt><dd className="mt-1 font-semibold text-[#efd276]">ตรวจรถและราคาก่อนจอง</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
