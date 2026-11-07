import LandmarkArticle, { landmarkMetadata } from "@/components/LandmarkArticle";
export const metadata = landmarkMetadata("that-luang");
export default function Page() { return <LandmarkArticle placeKey="that-luang" />; }
