import { getLatestHeroSection } from "@/apiServices/homePageService";
import HomeHeroSection from "./HomeHeroSection";
import { cacheTag } from "next/cache";
const HomeHeroWrapper = async () => {
  "use cache";
  cacheTag("hero-sections-list");
  const heroBannerData = await getLatestHeroSection();
  return <HomeHeroSection heroBannerData={heroBannerData} />;
};

export default HomeHeroWrapper;
