"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseHeaderProps {
  title: string;
}

const MyCourseBySlugHeader = ({ title }: CourseHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="p-1 rounded-lg transition-colors hover:bg-muted"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>

      <h1 className="text-2xl font-bold text-foreground">
        {title}
      </h1>
    </div>
  );
};

export default MyCourseBySlugHeader;
