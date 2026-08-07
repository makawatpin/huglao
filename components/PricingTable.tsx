import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getCurrentPriceRows } from "@/data/pricing";

export default function PricingTable({
  routeSlug,
  vehicleSlug,
  showCrossBorderNote = true,
}: {
  routeSlug?: string;
  vehicleSlug?: string;
  showCrossBorderNote?: boolean;
}) {
  return (
    <PublishedPriceTable
      rows={getCurrentPriceRows({ routeSlug })}
      vehicleSlug={vehicleSlug}
      showCrossBorderNote={showCrossBorderNote}
    />
  );
}
