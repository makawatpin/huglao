import CityPriceTables from "@/components/CityPriceTables";
import PriceHighlights from "@/components/PriceHighlights";
import type { CitySlug } from "@/data/city-services";

type Props = { city?: CitySlug; localOnly?: boolean; full?: boolean; vanOnly?: boolean; light?: boolean; title?: string; allPricesHref?: string };
export default function ServicePriceOverview({ city, localOnly = false, full = false, vanOnly = false, light = false, title, allPricesHref }: Props) {
  if (full) return <CityPriceTables city={city} localOnly={localOnly} vanOnly={vanOnly} title={title} />;
  return <PriceHighlights city={city} vanOnly={vanOnly} light={light} title={title ?? "สรุปราคาไฮไลท์ แยกตามเมืองที่เริ่มรับ"} allPricesHref={allPricesHref} />;
}
