// components/student-dashboard/MyCourseBySlugNavigationBtn.tsx
"use client";

import { Download } from "lucide-react";
import Link from "next/link";

interface NavigationButtonsProps {
  previousLesson: {
    id: number;
    title: string;
    chapter_title: string;
  } | null;
  nextLesson: {
    id: number;
    title: string;
    chapter_title: string;
  } | null;
  currentLessonId: number;
  courseSlug: string;
}

const MyCourseBySlugNavigationBtn = ({
  previousLesson,
  nextLesson,
  currentLessonId,
  courseSlug,
}: NavigationButtonsProps) => {
  const handleResourceDownload = () => {
    // Implement resource download logic here
    console.log("Download resource for lesson:", currentLessonId);
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={handleResourceDownload}
        className="flex items-center gap-2 text-primary font-medium hover:underline hover:text-primary/80 transition-colors"
      >
        <Download className="w-5 h-5" />
        <span>Resource</span>
      </button>

      <div className="flex gap-3">
        {previousLesson ? (
          <Link
            href={`/student/mycourses/${courseSlug}?lesson_id=${previousLesson.id}`}
            className="nav-button nav-button-secondary hover:bg-secondary/90 transition-colors"
          >
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="nav-button nav-button-secondary opacity-50 cursor-not-allowed"
          >
            Previous
          </button>
        )}

        {nextLesson ? (
          <Link
            href={`/student/mycourses/${courseSlug}?lesson_id=${nextLesson.id}`}
            className="nav-button nav-button-primary hover:bg-primary/90 transition-colors"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="nav-button nav-button-primary opacity-50 cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MyCourseBySlugNavigationBtn;
