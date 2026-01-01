"use client";
import SectionTitle from "@/components/common/SectionTitle";
import HomeCourses from "./HomeCourses";
import {
  ApiResponse,
  getPublicCoursesList,
} from "@/apiServices/courseListPublicService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const HomeCoursesWrapper = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [coursesData, setCoursesData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    startTransition(() => {
      const fetchCourses = async () => {
        try {
          const params = {
            per_page: 16,
            sort_order: searchParams.get("sort_order") ?? "desc",
            branch_id: searchParams.get("branch_id") ?? "1",
            sort_ratings: searchParams.get("sort_ratings") ?? "ratings",
            page: searchParams.get("page")
              ? Number(searchParams.get("page"))
              : 1,
          };

          const res = await getPublicCoursesList({ params });
          if (!res.success) {
            toast.error(res.message);
            return;
          } else {
            setCoursesData(res ?? null);
          }
        } catch (error) {
          console.error("Failed to fetch public courses:", error);
          setCoursesData(null);
        }
      };

      fetchCourses();
    });
  }, [searchParams]);

  return (
    <section className="bg-white py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={coursesData?.data?.section_title}
          subtitle={coursesData?.data?.section_subtitle}
          iswhite={false}
        />
        <HomeCourses coursesData={coursesData} isPending={isPending} />
      </div>
    </section>
  );
};

export default HomeCoursesWrapper;
