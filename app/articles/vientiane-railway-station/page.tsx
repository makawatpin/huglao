import PickupGuideArticle, { pickupMetadata } from "@/components/PickupGuideArticle";
import { PICKUP_GUIDES } from "@/data/pickup-guides";

const guide = PICKUP_GUIDES.find(p => p.slug === "vientiane-railway-station")!;
export const metadata = pickupMetadata(guide);
export default function Page() { return <PickupGuideArticle guide={guide} />; }
