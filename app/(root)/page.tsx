import HighlightsSection from "@/components/root/home/HighlightsSection";
import HomeServiceList from "@/components/root/home/HomeServiceList";
import HeroWithLogos from "@/components/root/home/HeroWithLogos";
import GettingOpportunity from "@/components/root/home/GettingOpportunity";
import CareerDevelopmentBlog from "@/components/root/home/CareerDevelopmentBlog";
import NewsfeedsArchive from "@/components/root/home/NewsfeedsArchive";
import NewsletterSection from "@/components/root/home/NewsletterSection";
import VideoStories from "@/components/root/home/VideoStories";
import AffiliatesAndClients from "@/components/root/home/AffiliatesAndClients";
import { Suspense } from "react";
import HomeHeroSkeleton from "@/components/common/HomeHeroSkeleton";
import HomeHeroWrapper from "@/components/root/home/HomeHeroWrapper";
import HighlightsSkeleton from "@/components/common/HighlightsSkeleton";
import CourseCategoriesWrapper from "@/components/root/home/CourseCategoriesWrapper";
import OurBranchesWrapper from "@/components/root/home/OurBranchesWrapper";
import HomeCoursesWrapper from "@/components/root/home/HomeCoursesWrapper";
import TeacherListWrapper from "@/components/root/home/TeacherListWrapper";
import StudentSuccessWrapper from "@/components/root/home/StudentSuccessWrapper";
import CourseCardSkeleton from "@/components/common/CourseCardSkeleton";
import BranchesSkeleton from "@/components/common/BranchesSkeleton";

export interface HomesearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
const HomePage = ({ searchParams }: HomesearchParamsProps) => {
  return (
    <>
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HomeHeroWrapper />
      </Suspense>
      <Suspense fallback={<HighlightsSkeleton />}>
        <HighlightsSection />
      </Suspense>
      <Suspense fallback={<HighlightsSkeleton />}>
        <CourseCategoriesWrapper searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeServiceList searchParams={searchParams}/>
      </Suspense>
      <Suspense fallback={<CourseCardSkeleton columns={4} rows={1} />}>
        <HomeCoursesWrapper searchParams={searchParams} />
      </Suspense>
      <HeroWithLogos />
      <GettingOpportunity />
      <Suspense fallback={<div>Loading...</div>}>
        <TeacherListWrapper searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <VideoStories searchParams={searchParams} />
      </Suspense>
      <CareerDevelopmentBlog />
      <Suspense fallback={<div>Loading...</div>}>
        <StudentSuccessWrapper searchParams={searchParams} />
      </Suspense>
      <NewsfeedsArchive />
      <NewsletterSection />
      <Suspense fallback={<div>Loading...</div>}>
        <AffiliatesAndClients />
      </Suspense>
      <Suspense fallback={<BranchesSkeleton />}>
        <OurBranchesWrapper searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default HomePage;
