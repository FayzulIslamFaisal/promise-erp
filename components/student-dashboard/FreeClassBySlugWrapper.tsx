import FreeClasseSession from "@/components/student-dashboard/FreeClasseSession";
import FreeClasseInstructors from "@/components/student-dashboard/FreeClasseInstructors";
import FreeClasseZoomLink from "@/components/student-dashboard/FreeClasseZoomLink";
import { getFreeSeminarBySlug } from "@/apiServices/studentDashboardService";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import { ChevronLeft } from "lucide-react";

interface FreeClassBySlug {
  paramsData: Promise<{ slug: string }>;
}
const FreeClassBySlugWrapper = async ({ paramsData }: FreeClassBySlug) => {
  const { slug } = await paramsData;
  const response = await getFreeSeminarBySlug(slug);
  const seminarData = response?.data;
  if (!response?.data) {
    return <NotFoundComponent message={response?.message} />;
  }
  return (
    <>
      <div className="mb-6 flex items-center gap-3 px-4">
        <ChevronLeft className="h-8 w-8 text-secondary" />
        <h1 className="text-xl font-bold text-secondary lg:text-3xl">
          {seminarData?.title}
        </h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 px-4">
        {/* Left Column - About Session */}
        <div className="lg:col-span-2">
          <FreeClasseSession seminarData={seminarData} />
          {/* Instructors Card */}
          <FreeClasseInstructors seminarData={seminarData?.instructors} />
        </div>

        {/* Right Column - Details */}
        <FreeClasseZoomLink seminarData={seminarData} />
      </div>
    </>
  );
};

export default FreeClassBySlugWrapper;
