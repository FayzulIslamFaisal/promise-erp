import MyCoursesGrid from "@/components/student-dashboard/MyCoursesGrid";
import MyCourseSkeleton from "@/components/student-dashboard/MyCourseSkeleton";
import WelcomeBanner from "@/components/student-dashboard/WelcomeBanner";
import WelcomeBannerSkeleton from "@/components/student-dashboard/WelcomeBannerSkeleton";
import { Suspense } from "react";

const MyCoursesPage = async () => {
  
  return (
    <>
      <div className="px-4">
        <Suspense fallback={<WelcomeBannerSkeleton />}>
          <WelcomeBanner />
        </Suspense>
        <Suspense fallback={<MyCourseSkeleton />}>
          <MyCoursesGrid />
        </Suspense>
      </div>
    </>
  );
};

export default MyCoursesPage;
