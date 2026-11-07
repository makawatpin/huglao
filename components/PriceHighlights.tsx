import Link from "next/link";
import { formatRouteLabel } from "@/lib/route-label";
import { CITY_PRICES, CITY_SERVICES, LOCAL_VAN_TERMS, priceLabel, type CitySlug } from "@/data/city-services";
import { CURRENT_PRICE_ROWS, formatPrice, getPriceRow } from "@/data/pricing";

type Props = { city?: CitySlug; vanOnly?: boolean; light?: boolean; title: string; allPricesHref?: string };
type Highlight = { id: string; city: CitySlug; label: string; duration: string; suv: string | null; van: string };
const CITY_DAY_TEXT = { label: "เหมาเที่ยวในเมือง", duration: LOCAL_VAN_TERMS.fullDay };

function localRow(city: "vang-vieng" | "luang-prabang", id: string): Highlight {
  const row = CITY_PRICES[city].find(r => r.id === id)!;
  return { id, city, label: row.name, duration: row.duration, ...(id === "vv-day" || id === "lp-city" ? CITY_DAY_TEXT : {}), suv: null, van: `${priceLabel(row)} บาท` };
}
function vientianeRow(id: string): Highlight {
  const row = getPriceRow(id);
  return { id, city: "vientiane", label: row.routeName, duration: row.duration, ...(id === "vientiane-city-1d" ? CITY_DAY_TEXT : {}), suv: formatPrice(row.prices.sedanSuv), van: formatPrice(row.prices.standardVan) };
}

export default function PriceHighlights({ city, vanOnly = false, title, allPricesHref = "#pricing" }: Props) {
  let rows: Highlight[];
  if (city === "vang-vieng") rows = ["vv-station", "vv-half", "vv-day"].map(id => localRow(city, id));
  else if (city === "luang-prabang") rows = ["lp-airport", "lp-station", "lp-kuang-si"].map(id => localRow(city, id));
  else if (city === "vientiane") rows = ["thanaleng-city", "vientiane-city-1d", "vientiane-vang-vieng-1d"].map(vientianeRow);
  else if (vanOnly) {
    const lowestTransfer = CURRENT_PRICE_ROWS.filter(r => r.category === "transfer").reduce((a, b) => a.prices.standardVan <= b.prices.standardVan ? a : b);
    rows = [vientianeRow(lowestTransfer.id), vientianeRow("vientiane-city-1d"), localRow("vang-vieng", "vv-station"), localRow("vang-vieng", "vv-day"), localRow("luang-prabang", "lp-airport"), localRow("luang-prabang", "lp-city")];
  } else rows = [vientianeRow("vientiane-city-1d"), localRow("vang-vieng", "vv-day"), localRow("luang-prabang", "lp-city")];
  return <div data-price-overview data-price-highlights className="max-w-[820px] rounded-[22px] border border-[#d8af4a]/40 bg-[#142e23] p-4 text-[#fffaf0] sm:rounded-[26px] sm:p-7">
    <h2 className="font-serif-th text-xl font-bold sm:text-2xl">{title}</h2>
    <p className="mt-2 text-xs text-[#c5d0c8]">บาท/คัน</p>
    <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-xs sm:text-sm"><caption className="sr-only">ราคาไฮไลท์{city ? `เริ่มรับใน${CITY_SERVICES[city].name}` : "แยกตามเมืองเริ่มรับ"}</caption><thead><tr className="border-b border-white/20"><th colSpan={2} scope="col" className="py-3 pr-2 font-semibold">เส้นทาง / เวลา</th>{!vanOnly && <th scope="col" className="whitespace-nowrap px-1.5 py-3 text-right font-bold text-[#efd276]">เก๋ง/SUV</th>}<th scope="col" className="py-3 pl-1.5 text-right font-bold text-[#efd276]">รถตู้</th></tr></thead><tbody>{rows.map(r => {
      const transfer = r.duration === "เที่ยวเดียว";
      return <tr key={r.id} data-highlight-row className="border-b border-white/15">
        <th scope="row" colSpan={transfer ? 2 : 1} title={r.label} className="py-3 pr-2 align-top font-semibold leading-[1.6]">{!city && <span className="mb-1 block text-[#fffaf0]">{CITY_SERVICES[r.city].name}</span>}<span className={city ? "text-[#fffaf0]" : "text-[#c5d0c8]"}>{formatRouteLabel(r.label)}</span>{transfer && <span className="mt-1 block text-[11px] font-normal text-[#c5d0c8]">เที่ยวเดียว</span>}</th>
        {!transfer && <td className="whitespace-nowrap px-1 py-3 align-top text-[11px] leading-[1.6] text-[#c5d0c8] sm:text-sm">{r.duration}</td>}
        {!vanOnly && <td className="whitespace-nowrap px-1.5 py-3 text-right align-top font-bold tabular-nums text-[#efd276]">{r.suv?.replace(" บาท", "") ?? <span aria-label="ไม่มีบริการ SUV">–</span>}</td>}
        <td className="whitespace-nowrap py-3 pl-1.5 text-right align-top font-bold tabular-nums text-[#efd276]">{r.van.replace(" บาท", "")}</td>
      </tr>;
    })}</tbody></table></div>
    <Link href={allPricesHref} className={`mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline text-[#efd276]`}>ดูราคาและเงื่อนไขทั้งหมด →</Link>
  </div>;
}
