import { formatRouteLabel } from "@/lib/route-label";
import ServiceTermsList from "@/components/ServiceTermsList";
import { Fragment } from "react";
import CityPriceTabs from "@/components/CityPriceTabs";

import { CITY_SERVICES, CITY_PRICES, type CitySlug } from "@/data/city-services";
import { CURRENT_PRICE_ROWS, PRICE_TERMS, formatPrice } from "@/data/pricing";

type Row = { id: string; category: "transfer" | "charter"; name: string; duration: string; van: string; suv: string | null; note?: string };
type Props = { city?: CitySlug; vanOnly?: boolean; localOnly?: boolean; title?: string };

function rowsFor(city: CitySlug): Row[] {
  if (city === "vientiane") return CURRENT_PRICE_ROWS.map(r => ({ id: r.id, category: r.category, name: r.routeName, duration: r.duration, van: formatPrice(r.prices.standardVan).replace(" บาท", ""), suv: formatPrice(r.prices.sedanSuv).replace(" บาท", "") }));
  return CITY_PRICES[city].map(r => ({ id: r.id, category: r.category, name: r.name, duration: r.duration, van: `${r.min.toLocaleString("en-US")}${r.max ? `–${r.max.toLocaleString("en-US")}` : ""}`, suv: null, note: r.id === "vv-day" ? undefined : r.note }));
}

export default function CityPriceTables({ city, vanOnly = false, localOnly = false, title }: Props) {
  const cities = Object.values(CITY_SERVICES).filter(c => (!city || c.slug === city) && (!localOnly || c.slug !== "vientiane"));
  return <div data-city-price-tables>
    {title && <h2 className="mb-5 font-serif-th text-2xl font-bold text-[#0a2d20]">{title}</h2>}
    <p className="mb-4 text-xs text-[#687169]">บาท/คัน</p>
    <CityPriceTabs cities={cities.map(c => ({ slug: c.slug, name: c.name }))} panels={cities.map(c => <section key={c.slug} id={`city-price-${c.slug}`} aria-labelledby={`city-price-title-${c.slug}`} className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white">
      <header className="bg-[#0a2d20] px-4 py-4 text-white"><h3 id={`city-price-title-${c.slug}`} className="font-serif-th text-xl font-bold">เริ่มรับใน{c.name}</h3></header>
      <div className="overflow-x-auto"><table data-city-table className="hl-data-table hl-price-table w-full text-left text-xs sm:text-sm"><caption className="sr-only">ราคาบริการเริ่มรับใน{c.name} บาทต่อคัน</caption><thead className="bg-[#f7f3e9] text-[#0a2d20]"><tr><th scope="col" colSpan={2} className="px-3 py-3 sm:px-4">เส้นทาง / ระยะเวลา</th>{!vanOnly && <th scope="col" className="px-2 py-3 whitespace-nowrap text-right">เก๋ง/SUV</th>}<th scope="col" className="px-3 py-3 text-right sm:px-4">รถตู้</th></tr></thead>
        {(["transfer", "charter"] as const).map(category => {
          const rows = rowsFor(c.slug).filter(r => r.category === category);
          const groups = new Map<string, Row[]>();
          rows.forEach(row => groups.set(row.name, [...(groups.get(row.name) ?? []), row]));
          return rows.length > 0 && <Fragment key={category}><tbody><tr className="border-t border-[#ddd4c1] bg-[#eee5cf]"><th colSpan={vanOnly ? 3 : 4} scope="colgroup" className="px-3 py-3 text-[#645126] sm:px-4">{category === "transfer" ? "รับ–ส่งเที่ยวเดียว" : "เหมาเที่ยว"}</th></tr></tbody>{[...groups].map(([name, items], groupIndex) => <tbody key={name} className={`border-t border-[#e8e4db] ${groupIndex % 2 ? "bg-[#faf8f2]" : "bg-white"}`}>{[...items].sort((a,b) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0)).map((r,index) => <tr key={r.id} data-city-price-row={r.id} className={index ? "border-t border-[#f0eadf]" : ""}>{index === 0 && <th scope="rowgroup" rowSpan={items.length} colSpan={category === "transfer" ? 2 : 1} className="px-3 py-3 align-top font-semibold leading-[1.6] text-[#0a2d20] sm:px-4">{formatRouteLabel(name)}{items.filter(item => item.note).map(item => <span key={item.id} className="mt-2 block text-[11px] font-normal leading-5 text-[#687169]">{item.note}</span>)}</th>}{category === "charter" && <th scope="row" className="whitespace-nowrap px-2 py-3 align-top text-[11px] font-normal leading-[1.6] text-[#59645d] sm:text-sm">{r.duration}</th>}{!vanOnly && <td className="whitespace-nowrap px-2 py-3 text-right align-top tabular-nums text-[#34483c]">{r.suv ?? <span aria-label="ไม่มีบริการ SUV">–</span>}</td>}<td className="whitespace-nowrap px-3 py-3 text-right align-top font-bold tabular-nums text-[#0a2d20] sm:px-4">{r.van}</td></tr>)}</tbody>)}</Fragment>;
        })}
      </table></div>
    </section>)} />
    <section data-common-price-terms className="mt-8" aria-labelledby="common-price-terms-title">
      <h3 id="common-price-terms-title" className="font-serif-th text-xl font-bold text-[#0a2d20]">สิ่งที่รวมและเงื่อนไขบริการ</h3>
      <div className="mt-5"><ServiceTermsList items={[
          ["รวมในราคา", "รถพร้อมคนขับ น้ำมัน และค่าอาหารคนขับ"],
          ["ไม่รวม", "ค่าเข้าสถานที่ กิจกรรม อาหารและที่พักของลูกค้า"],
          ["เวลาเหมาเต็มวัน", "08.00–18.00 น."],
          ["เกินเวลาที่ตกลง", PRICE_TERMS.find(t => t.title === "เกินเวลาบริการ")!.detail],
          ["มัดจำ", PRICE_TERMS.find(t => t.title === "มัดจำ")!.detail],
        ]} /></div>
    </section>
  </div>;
}
