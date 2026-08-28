import {
  PRICE_TERMS,
  PRICE_UNIT_NOTE,
  PRICE_VEHICLES,
  formatPrice,
  getPriceVehicle,
  type PriceCategory,
  type PriceRow,
  type PriceVehicleKey,
} from "@/data/pricing";

type PublishedPriceTableProps = {
  rows: PriceRow[];
  vehicleSlug?: string;
  showCategoryHeadings?: boolean;
};

type PriceVehicle = (typeof PRICE_VEHICLES)[number];

const CATEGORY_LABELS: Record<PriceCategory, string> = {
  transfer: "ตารางรับ–ส่งฉบับรวม",
  charter: "ราคาเหมารถเที่ยว",
};

const MOBILE_VEHICLE_LABELS: Record<PriceVehicleKey, string> = {
  sedanSuv: "เก๋ง/SUV เที่ยวลาว",
  mpv: "MPV เที่ยวลาว",
  standardVan: "รถตู้เที่ยวลาว",
};

const formatMobilePrice = (price: number) => `฿${price.toLocaleString("th-TH")}`;

function getVehicles(vehicleSlug?: string): readonly PriceVehicle[] {
  const selectedVehicle = vehicleSlug ? getPriceVehicle(vehicleSlug) : undefined;
  return selectedVehicle ? [selectedVehicle] : PRICE_VEHICLES;
}

function groupRowsByRoute(rows: PriceRow[]) {
  const groups = new Map<string, PriceRow[]>();
  rows.forEach((row) => groups.set(row.routeName, [...(groups.get(row.routeName) ?? []), row]));
  return [...groups.entries()].map(([routeName, routeRows]) => ({ routeName, rows: routeRows }));
}

function PriceValue({ row, vehicleKey }: { row: PriceRow; vehicleKey: PriceVehicleKey }) {
  return <span className="whitespace-nowrap font-bold tabular-nums text-[#9b711c]">{formatPrice(row.prices[vehicleKey])}</span>;
}

function MobilePriceCards({ rows, vehicles }: { rows: PriceRow[]; vehicles: readonly PriceVehicle[] }) {
  const routeGroups = groupRowsByRoute(rows);
  const isSingleVehicle = vehicles.length === 1;
  const gridClass = isSingleVehicle
    ? "grid-cols-[minmax(0,1fr)_minmax(108px,.65fr)]"
    : "grid-cols-[minmax(70px,1.15fr)_repeat(3,minmax(0,1fr))]";

  return (
    <div className="grid gap-3 md:hidden">
      {routeGroups.map((group) => (
        <article key={group.routeName} className="overflow-hidden rounded-[20px] border border-[#d8d0be] bg-white shadow-[0_12px_34px_rgba(7,29,19,.06)]">
          <div className="border-b border-[#e8e1d3] bg-[#0a2d20] px-4 py-3.5">
            <h4 className="font-serif-th text-[1.02rem] font-bold leading-6 text-white">{group.routeName}</h4>
          </div>

          <div className={`grid ${gridClass} items-center gap-x-2 border-b border-[#ece6d9] bg-[#f6f1e6] px-3 py-2 text-center text-[.68rem] font-bold text-[#687169]`} aria-hidden="true">
            <span className="text-left">ระยะเวลา</span>
            {vehicles.map((vehicle) => <span key={vehicle.key} className="w-full text-center">{MOBILE_VEHICLE_LABELS[vehicle.key]}</span>)}
          </div>

          <div className="divide-y divide-[#ece6d9]">
            {group.rows.map((row) => (
              <div key={row.id} className={`grid ${gridClass} items-center gap-x-2 px-3 py-3.5 odd:bg-white even:bg-[#fcfaf5]`}>
                <span className="text-[.73rem] font-semibold leading-5 text-[#425047]">{row.duration}</span>
                {vehicles.map((vehicle) => (
                  <span key={vehicle.key} aria-label={`${vehicle.name} ${formatPrice(row.prices[vehicle.key])}`} className={`w-full text-center font-bold tabular-nums text-[#9b711c] ${isSingleVehicle ? "text-sm" : "text-[.72rem]"}`}>
                    {isSingleVehicle ? formatPrice(row.prices[vehicle.key]) : formatMobilePrice(row.prices[vehicle.key])}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function DesktopPriceTable({ rows, vehicles }: { rows: PriceRow[]; vehicles: readonly PriceVehicle[] }) {
  return (
    <div className="hidden overflow-x-auto rounded-[24px] border border-[#d8d0be] bg-white shadow-[0_16px_45px_rgba(7,29,19,.06)] md:block">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead className="bg-[#0a2d20] text-white">
          <tr>
            <th className="p-5">เส้นทาง</th>
            <th className="p-5">ระยะเวลา</th>
            {vehicles.map((vehicle) => <th key={vehicle.key} className="p-5 text-right">{vehicle.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#ece6d9] odd:bg-white even:bg-[#fbf9f3] last:border-0">
              <td className="p-5 font-semibold text-[#0a2d20]">{row.routeName}</td>
              <td className="whitespace-nowrap p-5 text-[#59645d]">{row.duration}</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.key} className="p-5 text-right"><PriceValue row={row} vehicleKey={vehicle.key} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PriceGroup({ rows, vehicleSlug }: { rows: PriceRow[]; vehicleSlug?: string }) {
  const vehicles = getVehicles(vehicleSlug);
  return (
    <>
      <MobilePriceCards rows={rows} vehicles={vehicles} />
      <DesktopPriceTable rows={rows} vehicles={vehicles} />
    </>
  );
}

export default function PublishedPriceTable({
  rows,
  vehicleSlug,
  showCategoryHeadings = true,
}: PublishedPriceTableProps) {
  if (rows.length === 0) return null;

  const groups = (["transfer", "charter"] as const)
    .map((category) => ({ category, rows: rows.filter((row) => row.category === category) }))
    .filter((group) => group.rows.length > 0);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 rounded-[18px] border border-[#d8d0be] bg-white px-4 py-4 shadow-[0_10px_28px_rgba(7,29,19,.04)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="block text-sm text-[#0a2d20]">{PRICE_UNIT_NOTE}</strong>
          <span className="mt-1 block text-xs leading-5 text-[#687169]">เปรียบเทียบราคาแต่ละประเภทรถในแถวเดียวกัน</span>
        </div>
        {groups.length > 1 && showCategoryHeadings && (
          <nav aria-label="เลือกดูหมวดราคา" className="flex gap-2">
            {groups.map((group) => (
              <a key={group.category} href={`#price-${group.category}`} className="rounded-full border border-[#d8d0be] bg-[#f7f3e9] px-3 py-2 text-xs font-semibold text-[#0a2d20] hover:border-[#d8af4a]">
                {group.category === "transfer" ? "รับ–ส่ง" : "เหมาทริป"}
              </a>
            ))}
          </nav>
        )}
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.category} id={`price-${group.category}`} className="scroll-mt-28">
            {showCategoryHeadings && (
              <div className="mb-4 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d8af4a]" />
                <h3 className="font-serif-th text-[1.55rem] font-bold text-[#0a2d20]">{CATEGORY_LABELS[group.category]}</h3>
              </div>
            )}
            <PriceGroup rows={group.rows} vehicleSlug={vehicleSlug} />
          </section>
        ))}
      </div>

      <p className="mt-5 text-sm leading-7 text-[#687169]">ราคานี้ต้องตรวจสอบรถว่าง วันเดินทาง และรายละเอียดทริปก่อนยืนยันการจอง</p>

      <section className="mt-7" aria-labelledby="price-terms-title">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8af4a]" />
          <h3 id="price-terms-title" className="font-serif-th text-[1.55rem] font-bold text-[#0a2d20]">ราคาและเงื่อนไขการใช้รถ</h3>
        </div>
        <ol className="overflow-hidden rounded-[20px] border border-[#d8d0be] bg-white shadow-[0_12px_32px_rgba(7,29,19,.05)] divide-y divide-[#e8e1d3]">
          {PRICE_TERMS.map((term, index) => (
            <li key={term.title} className="flex items-start gap-4 px-4 py-4 odd:bg-white even:bg-[#fcfaf5] sm:items-center sm:px-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2d20] text-[.7rem] font-bold text-[#efd276]">{index + 1}</span>
              <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[170px_minmax(0,1fr)] sm:items-center sm:gap-5">
                <h4 className="text-sm font-bold text-[#0a2d20]">{term.title}</h4>
                <p className="mt-1 text-sm leading-6 text-[#59645d] sm:mt-0">{term.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

    </div>
  );
}
