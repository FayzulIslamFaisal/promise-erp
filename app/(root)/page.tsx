import HighlightsSection from "@/components/root/home/HighlightsSection";
import HomeServiceList from "@/components/root/home/HomeServiceList";
import CourseCategoriesSection from "@/components/root/home/CourseCategoriesSection";
import HeroWithLogos from "@/components/root/home/HeroWithLogos";
import HomeCourses from "@/components/root/home/HomeCourses";
import GettingOpportunity from "@/components/root/home/GettingOpportunity";
import TeacherListSection from "@/components/root/home/TeacherListSection";
import CareerDevelopmentBlog from "@/components/root/home/CareerDevelopmentBlog";
import NewsfeedsArchive from "@/components/root/home/NewsfeedsArchive";
import NewsletterSection from "@/components/root/home/NewsletterSection";
import OurBranches from "@/components/root/home/OurBranches";
import StudentSuccessStories from "@/components/root/home/StudentSuccessStories";
import VideoStories from "@/components/root/home/VideoStories";
import HomeHeroSection from "@/components/root/home/HomeHeroSection";
import AffiliatesAndClients from "@/components/root/home/AffiliatesAndClients";

const HomePage = () => {
  return (
    <>
      <HomeHeroSection />
      <HighlightsSection />
      <CourseCategoriesSection />
      <HomeServiceList />
      <HomeCourses />
      <HeroWithLogos />
      <GettingOpportunity />
      <TeacherListSection />
      <VideoStories />
      <CareerDevelopmentBlog />
      <StudentSuccessStories />
      <NewsfeedsArchive />
      <NewsletterSection />
      <AffiliatesAndClients />
      <OurBranches />
    </>
  );
};

export default HomePage;
