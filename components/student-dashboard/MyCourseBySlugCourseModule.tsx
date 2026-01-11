// components/student-dashboard/MyCourseBySlugCourseModule.tsx
"use client";

import { FileText, PlayCircle, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  duration?: string;
   type: "video" | "document" | string;
  video_url?: string;
  is_completed?: boolean;
  order: number;
}

interface Module {
  id: string;
  number: string;
  title: string;
  lessons: Lesson[];
}

interface CourseModuleProps {
  modules: Module[];
  currentLessonId: string;
  courseSlug: string;
}

const MyCourseBySlugCourseModule = ({
  modules,
  currentLessonId,
  courseSlug,
}: CourseModuleProps) => {
  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.type === "document") {
      return <FileText className="w-4 h-4 text-blue-500" />;
    }
    return <PlayCircle className="w-4 h-4 text-red-500" />;
  };

  // Find which module contains the current lesson for default open accordion
  const defaultModule = modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === currentLessonId)
  );

  return (
    <div className="course-card overflow-hidden border border-border rounded-lg bg-card">
      <div className="module-header bg-muted/50 p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Course Module</h3>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultModule?.id}
          className="w-full"
        >
          {modules.map((module) => (
            <AccordionItem
              key={module.id}
              value={module.id}
              className="border-b border-border/50 last:border-b-0"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-accent/30 hover:no-underline data-[state=open]:bg-accent/30">
                <div className="flex items-start gap-3 text-left">
                  <span className="text-muted-foreground text-sm font-medium min-w-[24px]">
                    {module.number}
                  </span>
                  <span className="text-sm font-medium text-foreground text-left">
                    {module.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/student/mycourses/${courseSlug}?lesson_id=${lesson.id}`}
                      className={`lesson-item flex items-start gap-3 p-3 hover:bg-accent/20 transition-colors ${
                        currentLessonId === lesson.id
                          ? "lesson-item-active bg-primary/10 border-l-2 border-primary"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {getLessonIcon(lesson)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-foreground">
                              {lesson.title}
                            </p>
                            {lesson.is_completed && (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                          {lesson.duration && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {lesson.duration}
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
