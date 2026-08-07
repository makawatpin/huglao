export type PriceCategory = "transfer" | "charter";
export type PriceVehicleKey = "sedanSuv" | "mpv" | "standardVan";

export type PriceRow = {
  id: string;
  category: PriceCategory;
  routeSlug: string;
  routeName: string;
  duration: string;
  prices: Record<PriceVehicleKey, number>;
};

export const PRICE_VEHICLES = [
  { key: "sedanSuv", slug: "sedan-suv", name: "เก๋ง/SUV" },
  { key: "mpv", slug: "mpv", name: "MPV" },
  { key: "standardVan", slug: "van", name: "รถตู้" },
] as const satisfies ReadonlyArray<{ key: PriceVehicleKey; slug: string; name: string }>;

export const TRANSFER_PRICE_ROWS: PriceRow[] = [
  {
    id: "thanaleng-city",
    category: "transfer",
    routeSlug: "transfer-thanaleng-city",
    routeName: "ด่านท่านาแล้งฝั่งลาว → ตัวเมืองเวียงจันทน์",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 600, mpv: 700, standardVan: 800 },
  },
  {
    id: "wattay-city-hotel",
    category: "transfer",
    routeSlug: "transfer-wattay-city-hotel",
    routeName: "สนามบินวัตไต → ตัวเมือง/โรงแรม",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 600, mpv: 700, standardVan: 800 },
  },
  {
    id: "khamsavath-city-hotel",
    category: "transfer",
    routeSlug: "transfer-khamsavath-city-hotel",
    routeName: "สถานีคำสะหวาด → ตัวเมือง/โรงแรม",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 600, mpv: 700, standardVan: 800 },
  },
  {
    id: "city-laos-china-railway",
    category: "transfer",
    routeSlug: "transfer-city-laos-china-railway",
    routeName: "ตัวเมืองเวียงจันทน์ → สถานีรถไฟลาว–จีน",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 700, mpv: 800, standardVan: 900 },
  },
  {
    id: "thanaleng-laos-china-railway",
    category: "transfer",
    routeSlug: "transfer-thanaleng-laos-china-railway",
    routeName: "ด่านท่านาแล้งฝั่งลาว → สถานีรถไฟลาว–จีน",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 900, mpv: 1000, standardVan: 1100 },
  },
  {
    id: "wattay-laos-china-railway",
    category: "transfer",
    routeSlug: "transfer-wattay-laos-china-railway",
    routeName: "สนามบินวัตไต → สถานีรถไฟลาว–จีน",
    duration: "เที่ยวเดียว",
    prices: { sedanSuv: 900, mpv: 1000, standardVan: 1100 },
  },
];

export const CHARTER_PRICE_ROWS: PriceRow[] = [
  {
    id: "vientiane-city-1d",
    category: "charter",
    routeSlug: "vientiane-city",
    routeName: "เที่ยวภายในนครหลวงเวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 2000, mpv: 2100, standardVan: 2200 },
  },
  {
    id: "vientiane-nam-ngum-1d",
    category: "charter",
    routeSlug: "vientiane-nam-ngum",
    routeName: "เวียงจันทน์–น้ำงึม–เวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 4100, mpv: 4400, standardVan: 4600 },
  },
  {
    id: "vientiane-nam-ngum-2d1n",
    category: "charter",
    routeSlug: "vientiane-nam-ngum",
    routeName: "เวียงจันทน์–น้ำงึม–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 7100, mpv: 7400, standardVan: 7800 },
  },
  {
    id: "vientiane-vang-vieng-1d",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 5300, mpv: 5600, standardVan: 6000 },
  },
  {
    id: "vientiane-vang-vieng-2d1n",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 8500, mpv: 8800, standardVan: 9200 },
  },
  {
    id: "vientiane-vang-vieng-3d2n",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "3 วัน 2 คืน",
    prices: { sedanSuv: 11200, mpv: 11800, standardVan: 12400 },
  },
  {
    id: "vientiane-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "vientiane-vang-vieng",
    routeName: "เวียงจันทน์–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 13900, mpv: 14600, standardVan: 15300 },
  },
  {
    id: "vientiane-muang-feuang-1d",
    category: "charter",
    routeSlug: "vientiane-muang-feuang",
    routeName: "เวียงจันทน์–เมืองเฟือง–เวียงจันทน์",
    duration: "1 วัน",
    prices: { sedanSuv: 5600, mpv: 6000, standardVan: 6400 },
  },
  {
    id: "vientiane-muang-feuang-2d1n",
    category: "charter",
    routeSlug: "vientiane-muang-feuang",
    routeName: "เวียงจันทน์–เมืองเฟือง–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 8500, mpv: 8800, standardVan: 9200 },
  },
  {
    id: "nam-ngum-vang-vieng-2d1n",
    category: "charter",
    routeSlug: "nam-ngum-vang-vieng",
    routeName: "เวียงจันทน์–น้ำงึม–วังเวียง–เวียงจันทน์",
    duration: "2 วัน 1 คืน",
    prices: { sedanSuv: 9200, mpv: 9600, standardVan: 10100 },
  },
  {
    id: "nam-ngum-vang-vieng-3d2n",
    category: "charter",
    routeSlug: "nam-ngum-vang-vieng",
    routeName: "เวียงจันทน์–น้ำงึม–วังเวียง–เวียงจันทน์",
    duration: "3 วัน 2 คืน",
    prices: { sedanSuv: 12000, mpv: 12600, standardVan: 13200 },
  },
  {
    id: "nam-ngum-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "nam-ngum-vang-vieng",
    routeName: "เวียงจันทน์–น้ำงึม–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 14800, mpv: 15500, standardVan: 16200 },
  },
  {
    id: "muang-feuang-vang-vieng-3d2n",
    category: "charter",
    routeSlug: "muang-feuang-vang-vieng",
    routeName: "เวียงจันทน์–เมืองเฟือง–วังเวียง–เวียงจันทน์",
    duration: "3 วัน 2 คืน",
    prices: { sedanSuv: 12400, mpv: 12900, standardVan: 13500 },
  },
  {
    id: "muang-feuang-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "muang-feuang-vang-vieng",
    routeName: "เวียงจันทน์–เมืองเฟือง–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 15300, mpv: 16000, standardVan: 16700 },
  },
  {
    id: "nam-ngum-muang-feuang-vang-vieng-4d3n",
    category: "charter",
    routeSlug: "nam-ngum-muang-feuang-vang-vieng",
    routeName: "เวียงจันทน์–น้ำงึม–เมืองเฟือง–วังเวียง–เวียงจันทน์",
    duration: "4 วัน 3 คืน",
    prices: { sedanSuv: 16500, mpv: 17300, standardVan: 18100 },
  },
];

export const CURRENT_PRICE_ROWS = [...TRANSFER_PRICE_ROWS, ...CHARTER_PRICE_ROWS];

export const CROSS_BORDER_PRICE_NOTE =
  "กรณีต้องการให้รถรับหรือส่งที่ด่านหนองคาย ตัวเมืองหนองคาย หรือสนามบินอุดรธานี มีค่าดำเนินการเอกสารและค่าใช้จ่ายเกี่ยวกับรถข้ามแดนเพิ่มเติม เริ่มต้นประมาณ 1,500 บาทต่อเที่ยว โดยต้องตรวจสอบรถ เอกสาร ระยะทาง และแจ้งยอดจริงก่อนยืนยันการจอง";

export const PRICE_UNIT_NOTE = "หน่วย: บาทต่อคันต่อทริป";

export const PRICE_TERMS = [
  { title: "รวมในราคา", detail: "ค่าคนขับและน้ำมัน" },
  { title: "เวลาบริการ", detail: "ประมาณ 08.00–18.00 น." },
  { title: "เกินเวลาบริการ", detail: "200 บาท/ชั่วโมง" },
  { title: "มัดจำ", detail: "15–25% ของยอดรวมตามรายการ" },
] as const;

export const formatPrice = (baht: number): string => `${baht.toLocaleString("th-TH")} บาท`;

export function getPriceVehicle(vehicleSlug: string) {
  return PRICE_VEHICLES.find((vehicle) => vehicle.slug === vehicleSlug);
}

export function getCurrentPriceRows(filters: { routeSlug?: string; category?: PriceCategory } = {}) {
  return CURRENT_PRICE_ROWS.filter((row) => !filters.routeSlug || row.routeSlug === filters.routeSlug)
    .filter((row) => !filters.category || row.category === filters.category);
}
