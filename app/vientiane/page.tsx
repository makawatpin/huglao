import CityServicePage from "@/components/CityServicePage";
import { cityMetadata } from "@/data/city-services";
export const metadata = cityMetadata("vientiane");
export default function Page() { return <CityServicePage slug="vientiane" />; }
