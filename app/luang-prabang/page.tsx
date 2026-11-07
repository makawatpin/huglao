import CityServicePage from "@/components/CityServicePage";
import { cityMetadata } from "@/data/city-services";
export const metadata = cityMetadata("luang-prabang");
export default function Page() { return <CityServicePage slug="luang-prabang" />; }
