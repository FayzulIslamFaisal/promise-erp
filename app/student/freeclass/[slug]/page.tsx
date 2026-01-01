import { ChevronLeft } from "lucide-react";
import FreeClasseSession from "@/components/student-dashboard/FreeClasseSession";
import FreeClasseInstructors from "@/components/student-dashboard/FreeClasseInstructors";
import FreeClasseZoomLink from "@/components/student-dashboard/FreeClasseZoomLink";
import { Metadata } from "next";

export function generateStaticParams() {
  return [
    { slug: "freelancing" },
  ];
}

export function generateMetadata(): Metadata {
  return {
    title: "Free Class Details",
  };
}

const FreeClassDetailsPage = () => {
  return (
    <section className="py-6 px-4">
      <div className="mb-6 flex items-center gap-3 px-4">
        <ChevronLeft className="h-8 w-8 text-secondary" />
        <h1 className="text-2xl font-bold text-secondary lg:text-3xl">
          Career Path in Freelancing (Free Seminar)
        </h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 px-4">
        {/* Left Column - About Session */}
        <div className="lg:col-span-2">
          <FreeClasseSession />
          {/* Instructors Card */}
          <FreeClasseInstructors />
        </div>

        {/* Right Column - Details */}
        <FreeClasseZoomLink />
      </div>
    </section>
  );
};

export default FreeClassDetailsPage;
