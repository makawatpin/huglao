import CityServicePage from "@/components/CityServicePage";
import { cityMetadata } from "@/data/city-services";
export const metadata = cityMetadata("vang-vieng");
export default function Page() { return <CityServicePage slug="vang-vieng" />; }
