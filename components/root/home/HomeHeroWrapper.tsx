import { getLatestHeroSection } from "@/apiServices/homePageService";
import HomeHeroSection from "./HomeHeroSection";
const HomeHeroWrapper = async() => {
    const heroBannerData = await getLatestHeroSection();
  return (
    <HomeHeroSection heroBannerData={heroBannerData} />
  )
}

export default HomeHeroWrapper
