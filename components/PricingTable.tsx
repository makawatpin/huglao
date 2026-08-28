import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getCurrentPriceRows } from "@/data/pricing";

export default function PricingTable({
  routeSlug,
  vehicleSlug,
}: {
  routeSlug?: string;
  vehicleSlug?: string;
}) {
  return (
    <PublishedPriceTable
      rows={getCurrentPriceRows({ routeSlug })}
      vehicleSlug={vehicleSlug}
    />
  );
}
