import LandmarkArticle, { landmarkMetadata } from "@/components/LandmarkArticle";
export const metadata = landmarkMetadata("patuxai");
export default function Page() { return <LandmarkArticle placeKey="patuxai" />; }
