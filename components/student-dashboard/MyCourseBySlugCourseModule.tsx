// components/student-dashboard/MyCourseBySlugCourseModule.tsx

import { CheckCircle, Video } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { CourseModuleLessonItem, getStudentCourseModulesList } from "@/apiServices/studentDashboardService";

interface MyCourseBySlugCourseModuleProps {
  slug: string;
  currentLessonId?: number; 
}

const MyCourseBySlugCourseModule = async ({
  slug,
  currentLessonId,
}: MyCourseBySlugCourseModuleProps) => {
  const response = await getStudentCourseModulesList(slug);
  const modules = response?.data?.course_modules || [];

  if (modules.length === 0) {
    return <div>Module not available for this course</div>;
  }

  const getLessonIcon = (lesson: CourseModuleLessonItem) => {
    if (lesson?.type == 1) return <span><Video className="w-5 h-5" /> </span>;
    if (lesson?.type == 2) return <span><CheckCircle className="w-5 h-5" /> </span>;
    return <span>📌</span>;
  };

  return (
    <div className="overflow-hidden border border-border rounded-lg bg-card">
      <div className="bg-secondary p-4 border-b border-border">
        <h3 className="font-semibold text-white">Course Module</h3>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module, index) => (
            <AccordionItem
              key={module.id}
              value={module.title}
              className="border-b border-border/50 last:border-b-0"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-white data-[state=open]:bg-white">
                <div className="flex items-start gap-3 text-left cursor-pointer">
                  <span className="text-secondary text-base font-medium">
                    {index + 1}
                  </span>
                  <span className="text-base font-medium text-secondary">{module.title}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-0">
                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson?.id}
                      href={`/student/mycourses/${slug}?lesson_id=${lesson?.id}`}
                      className={`flex items-start gap-3 p-3 hover:bg-primary/30 transition-colors ${
                        currentLessonId === lesson?.id
                          ? " bg-primary/20 border-l-2 border-primary"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {getLessonIcon(lesson)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-foreground">{lesson.title}</p>
                            {lesson.is_completed && (
                              <CheckCircle className="w-3 h-3 text-primary" />
                            )}
                          </div>
                          {lesson.duration && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {lesson.duration} min
                            </p>
                          )}
                        </div>
                      </div>
                      {currentLessonId === lesson.id && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default MyCourseBySlugCourseModule;
