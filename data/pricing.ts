export type PriceCategory = "transfer" | "charter";
export type PriceVehicleKey = "sedanSuv" | "standardVan";

export type PriceRow = {
  id: string;
  category: PriceCategory;
  routeSlug: string;
  routeName: string;
  duration: string;
  prices: Record<PriceVehicleKey, number>;
};

export const PRICE_VEHICLES = [
  { key: "sedanSuv", slug: "sedan-suv", name: "เก๋ง/SUV เที่ยวลาว" },
  { key: "standardVan", slug: "van", name: "รถตู้เที่ยวลาว" },
] as const satisfies ReadonlyArray<{ key: PriceVehicleKey; slug: string; name: string }>;

export const TRANSFER_PRICE_ROWS: PriceRow[] = [
  {
    id: "thanaleng-city",
    category: "transfer",
    routeSlug: "transfer-thanaleng-city",
    routeName: "ด่านท่านาแล้งฝั่งลาว → ตัวเมืองเวียงจันทน์",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 600, standardVan: 800 },
  },
  {
    id: "wattay-city-hotel",
    category: "transfer",
    routeSlug: "transfer-wattay-city-hotel",
    routeName: "สนามบินวัตไต → ตัวเมือง/โรงแรม",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 600, standardVan: 800 },
  },
  {
    id: "khamsavath-city-hotel",
    category: "transfer",
    routeSlug: "transfer-khamsavath-city-hotel",
    routeName: "สถานีคำสะหวาด → ตัวเมือง/โรงแรม",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 600, standardVan: 800 },
  },
  {
    id: "city-laos-china-railway",
    category: "transfer",
    routeSlug: "transfer-city-laos-china-railway",
    routeName: "ตัวเมืองเวียงจันทน์ → สถานีรถไฟลาว–จีน",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 800, standardVan: 1000 },
  },
  {
    id: "thanaleng-laos-china-railway",
    category: "transfer",
    routeSlug: "transfer-thanaleng-laos-china-railway",
    routeName: "ด่านท่านาแล้งฝั่งลาว → สถานีรถไฟลาว–จีน",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 900, standardVan: 1100 },
  },
  {
    id: "wattay-laos-china-railway",
    category: "transfer",
    routeSlug: "transfer-wattay-laos-china-railway",
    routeName: "สนามบินวัตไต → สถานีรถไฟลาว–จีน",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 900, standardVan: 1100 },
  },
  {
    id: "vientiane-nam-pien-yorla-pa",
    category: "transfer",
    routeSlug: "vientiane-nam-pien-yorla-pa",
    routeName: "จุดรับในเวียงจันทน์ → น้ำเปี่ยนยอละปา",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 3300, standardVan: 3500 },
  },
  {
    id: "vientiane-nam-ngum-transfer",
    category: "transfer",
    routeSlug: "vientiane-nam-ngum",
    routeName: "จุดรับในเวียงจันทน์ → น้ำงึม",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 3300, standardVan: 3500 },
  },
  {
    id: "vientiane-vang-vieng-transfer",
    category: "transfer",
    routeSlug: "vientiane-vang-vieng",
    routeName: "จุดรับในเวียงจันทน์ → วังเวียง",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 4300, standardVan: 4500 },
  },
  {
    id: "vientiane-muang-feuang-transfer",
    category: "transfer",
    routeSlug: "vientiane-muang-feuang",
    routeName: "จุดรับในเวียงจันทน์ → เมืองเฟือง",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 4300, standardVan: 4500 },
  },
];

export const CHARTER_PRICE_ROWS: PriceRow[] = [
  {
    id: "vientiane-city-1d",
    category: "charter",
    routeSlug: "vientiane-city",
    routeName: "เที่ยวภายในนครหลวงเวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 2000, standardVan: 2500 },
  },
  {
    id: "vientiane-nam-ngum-1d",
    category: "charter",
    routeSlug: "vientiane-nam-ngum",
    routeName: "เวียงจันทน์–อ่างเก็บน้ำงึม–เวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 3500, standardVan: 4000 },
  },
  {
    id: "vientiane-nam-ngum-2d1n",
    category: "charter",
    routeSlug: "vientiane-nam-ngum",
    routeName: "เวียงจันทน์–อ่างเก็บน้ำงึม–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 8000, standardVan: 8500 },
  },
  {
    id: "vientiane-vang-vieng-1d",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 4500, standardVan: 5000 },
  },
  {
    id: "vientiane-vang-vieng-2d1n",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 8500, standardVan: 9000 },
  },
  {
    id: "vientiane-vang-vieng-3d2n",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "3 วัน 2 คืน",
    prices: { sedanSuv: 12000, standardVan: 12500 },
  },
  {
    id: "vientiane-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 14800, standardVan: 15300 },
  },
  {
    id: "vientiane-muang-feuang-1d",
    category: "charter",
    routeSlug: "vientiane-muang-feuang",
    routeName: "เวียงจันทน์–เมืองเฟือง–เวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 5000, standardVan: 5500 },
  },
  {
    id: "vientiane-muang-feuang-2d1n",
    category: "charter",
    routeSlug: "vientiane-muang-feuang",
    routeName: "เวียงจันทน์–เมืองเฟือง–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 9000, standardVan: 9500 },
  },
  {
    id: "nam-ngum-vang-vieng-2d1n",
    category: "charter",
    routeSlug: "nam-ngum-vang-vieng",
    routeName: "เวียงจันทน์–อ่างเก็บน้ำงึม–วังเวียง–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 9000, standardVan: 9500 },
  },
  {
    id: "nam-ngum-vang-vieng-3d2n",
    category: "charter",
    routeSlug: "nam-ngum-vang-vieng",
    routeName: "เวียงจันทน์–อ่างเก็บน้ำงึม–วังเวียง–เวียงจันทน์",
    duration: "3 วัน 2 คืน",
    prices: { sedanSuv: 12500, standardVan: 13000 },
  },
  {
    id: "nam-ngum-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "nam-ngum-vang-vieng",
    routeName: "เวียงจันทน์–อ่างเก็บน้ำงึม–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 16000, standardVan: 16500 },
  },
  {
    id: "muang-feuang-vang-vieng-3d2n",
    category: "charter",
    routeSlug: "muang-feuang-vang-vieng",
    routeName: "เวียงจันทน์–เมืองเฟือง–วังเวียง–เวียงจันทน์",
    duration: "3 วัน 2 คืน",
    prices: { sedanSuv: 12500, standardVan: 13000 },
  },
  {
    id: "muang-feuang-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "muang-feuang-vang-vieng",
    routeName: "เวียงจันทน์–เมืองเฟือง–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 16000, standardVan: 16500 },
  },
  {
    id: "nam-ngum-muang-feuang-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "nam-ngum-muang-feuang-vang-vieng",
    routeName: "เวียงจันทน์–อ่างเก็บน้ำงึม–เมืองเฟือง–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 16000, standardVan: 16500 },
  },
];

export const CURRENT_PRICE_ROWS = [...TRANSFER_PRICE_ROWS, ...CHARTER_PRICE_ROWS];

export const PRICE_UNIT_NOTE = "หน่วย: บาทต่อคันต่อทริป";

/** What every published price already covers; shown on all price tables, FAQs and terms. */
export const PRICE_INCLUDES = "ค่าคนขับ ค่าน้ำมัน ค่าทางด่วน ค่าที่พักและค่าอาหารของคนขับ";
export const PRICE_INCLUDES_SHORT = "รวมน้ำมัน ทางด่วน ที่พักและอาหารคนขับ";

/** Bump whenever any published price changes; shown on every price table and used as the page dateModified. */
export const PRICES_UPDATED_AT = "2026-10-24";

export const formatPricesUpdatedAt = (): string =>
  new Date(`${PRICES_UPDATED_AT}T00:00:00+07:00`).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  });

/** Lowest published price for one vehicle class, e.g. for "ราคาเริ่ม" copy. */
export const getStartingPrice = (vehicleKey: PriceVehicleKey, rows: PriceRow[] = CURRENT_PRICE_ROWS): number =>
  Math.min(...rows.map((row) => row.prices[vehicleKey]));

export const formatPrice = (baht: number): string => `${baht.toLocaleString("th-TH")} บาท`;

/** Thai-side pickups, added on top of the trip price for every vehicle class. */
export const THAI_SIDE_PICKUP_FEES = [
  { id: "nong-khai", label: "ด่านหนองคาย (ฝั่งไทย)", price: 1000 },
  { id: "udon-thani", label: "อุดรธานี", price: 2500 },
] as const;

export const THAI_SIDE_PICKUP_NOTE = THAI_SIDE_PICKUP_FEES.map((fee) => `${fee.label} +${formatPrice(fee.price)}`).join(" · ");

export const PRICE_TERMS = [
  { title: "รวมในราคา", detail: PRICE_INCLUDES },
  { title: "เวลาบริการ", detail: "ประมาณ 08.00–18.00 น." },
  { title: "เกินเวลาบริการ", detail: "200 บาท/ชั่วโมง" },
  { title: "รับจากฝั่งไทย", detail: `${THAI_SIDE_PICKUP_NOTE} (บวกจากราคาทริป)` },
  { title: "มัดจำ", detail: "15–25% ของยอดรวมตามรายการ" },
] as const;

export function getPriceRow(id: string): PriceRow {
  const row = CURRENT_PRICE_ROWS.find((priceRow) => priceRow.id === id);
  if (!row) throw new Error(`Unknown price row: ${id}`);
  return row;
}

export function getPriceVehicle(vehicleSlug: string) {
  return PRICE_VEHICLES.find((vehicle) => vehicle.slug === vehicleSlug);
}

/** schema.org AggregateOffer (THB per vehicle per trip) for a Service's `offers`; undefined when no published price applies. */
export function getAggregateOfferSchema(rows: PriceRow[], vehicleKeys: PriceVehicleKey[] = ["sedanSuv", "standardVan"]) {
  const prices = rows.flatMap((row) => vehicleKeys.map((key) => row.prices[key]));
  if (prices.length === 0) return undefined;
  return {
    "@type": "AggregateOffer",
    priceCurrency: "THB",
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: prices.length,
  };
}

export function getCurrentPriceRows(filters: { routeSlug?: string; category?: PriceCategory } = {}) {
  return CURRENT_PRICE_ROWS.filter((row) => !filters.routeSlug || row.routeSlug === filters.routeSlug)
    .filter((row) => !filters.category || row.category === filters.category);
}
