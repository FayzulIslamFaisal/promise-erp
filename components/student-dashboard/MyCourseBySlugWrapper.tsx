import { getMyCourseBySlug } from "@/apiServices/studentDashboardService";
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import MyCourseBySlugCourseModule from "@/components/student-dashboard/MyCourseBySlugCourseModule";
import MyCourseBySlugHeader from "@/components/student-dashboard/MyCourseBySlugHeader";
import MyCourseBySlugNavigationBtn from "@/components/student-dashboard/MyCourseBySlugNavigationBtn";
import MyCourseBySlugVideoPlayer from "@/components/student-dashboard/MyCourseBySlugVideoPlayer";
import { WhatsAppCard } from "@/components/student-dashboard/WhatsAppCard";
interface MyCoursesBySlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
const MyCourseBySlugWrapper = async ({
  params,
  searchParams,
}: MyCoursesBySlugPageProps) => {
  const { slug } = await params;
  const query = (await searchParams) || {};
  const lessonId = query.lesson_id as string;
  const response = await getMyCourseBySlug(slug, lessonId);
  const { course, current_lesson, course_modules, navigation } = response?.data;

  // Flatten all lessons for navigation
  const allLessons = course_modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
      moduleNumber: course_modules.findIndex((m) => m.id === module.id) + 1,
    }))
  );

  const currentLessonIndex = allLessons.findIndex(
    (l) => l.id === current_lesson.id
  );

  // Get next and previous lessons
  const nextLesson = navigation.next_lesson;
  const previousLesson = navigation.previous_lesson;

  // Format modules for the CourseModule component
  const formattedModules = course_modules.map((module, index) => ({
    id: module.id.toString(),
    number: (index + 1).toString().padStart(2, "0"),
    title: module.title,
    lessons: module.lessons.map((lesson) => ({
      id: lesson.id.toString(),
      title: lesson.title,
      duration: lesson.duration_text,
      type: lesson.type === 1 ? "video" : "document",
      video_url: lesson.video_url,
      is_completed: lesson.is_completed,
      order: lesson.order,
    })),
  }));

  if (!response.success) {
    return <ErrorComponent message={response.message} />;
  }
  if (!response.data) {
    return <NotFoundComponent message={response.message} />;
  }
  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-8">
      <div className="container mx-auto">
        <MyCourseBySlugHeader title={course.title} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <MyCourseBySlugVideoPlayer
              classNumber={`Class ${currentLessonIndex + 1}`}
              lessonTitle={current_lesson.chapter_title}
              currentTopic={current_lesson.title}
              duration={current_lesson.duration_text}
              videoUrl={current_lesson.video_url}
              description={current_lesson.description}
            />
            <MyCourseBySlugNavigationBtn
              previousLesson={previousLesson}
              nextLesson={nextLesson}
              currentLessonId={current_lesson.id}
              courseSlug={slug}
            />
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MyCourseBySlugCourseModule
              modules={formattedModules}
              currentLessonId={current_lesson.id.toString()}
              courseSlug={slug}
            />
            <WhatsAppCard groupLink="https://chat.whatsapp.com/example" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseBySlugWrapper;
