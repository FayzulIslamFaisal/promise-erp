"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FreeSeminar,
  getFreeSeminarBySlug,
} from "@/apiServices/studentDashboardService";

import FreeClasseSession from "@/components/student-dashboard/FreeClasseSession";
import FreeClasseInstructors from "@/components/student-dashboard/FreeClasseInstructors";
import FreeClasseZoomLink from "@/components/student-dashboard/FreeClasseZoomLink";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import FreeClassBySlugSkeleton from "@/components/student-dashboard/FreeClassBySlugSkeleton";

import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";

const FreeClassBySlugWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [seminarData, setSeminarData] = useState<FreeSeminar | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    if (!slug || !token) {
      return;
    }

    startTransition(async () => {
      try {
        const response = await getFreeSeminarBySlug(slug, token);

        if (response.success) {
          setSeminarData(response.data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("getFreeSeminarBySlug Error:", error.message);
        }
      }
    });
  }, [slug, token]);

  if (isPending) {
    return <FreeClassBySlugSkeleton />;
  }

  if (!seminarData)
    return (
      <NotFoundComponent
        title="Free Seminar Data"
        message={"Free Seminar Data Currently Unavailable"}
      />
    );

  return (
    <>
      <div className="mb-6 flex items-center gap-3 px-4">
        <ChevronLeft
          onClick={() => router.back()}
          className="h-8 w-8 text-secondary cursor-pointer"
        />
        <h1 className="text-xl font-bold text-secondary lg:text-3xl">
          {seminarData.title}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 px-4">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <FreeClasseSession seminarData={seminarData} />
          <FreeClasseInstructors seminarData={seminarData.instructors} />
        </div>

        {/* Right Column */}
        <FreeClasseZoomLink seminarData={seminarData} />
      </div>
    </>
  );
};

export default FreeClassBySlugWrapper;
