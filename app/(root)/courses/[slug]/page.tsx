import { getPublicCoursesList } from "@/apiServices/courseListPublicService";
import { getCourseDetailBySlug } from "@/apiServices/courseDetailPublicService";

import { CertificateSection } from "@/components/root/courseDetail/CertificateSection";
import { CurriculumSection } from "@/components/root/courseDetail/CurriculumSection";
import { FAQSection } from "@/components/root/courseDetail/FAQSection";
import { HeroSection } from "@/components/root/courseDetail/HeroSection";
import { InstructorsSection } from "@/components/root/courseDetail/InstructorsSection";
import { ReviewsSection } from "@/components/root/courseDetail/ReviewsSection";
import SocialMediaSection from "@/components/root/courseDetail/SocialMediaSection";
import { ToolsSection } from "@/components/root/courseDetail/ToolsSection";
import { VideoSection } from "@/components/root/courseDetail/VideoSection";
import { WhatYouLearnSection } from "@/components/root/courseDetail/WhatYouLearnSection";
import { WhoCanJoinSection } from "@/components/root/courseDetail/WhoCanJoinSection";


import { notFound } from "next/navigation";
import ErrorComponent from "@/components/common/ErrorComponent";

interface CourseDetailPageProps {
  params: { slug: string };
}
// ssg for course detail pages
export async function generateStaticParams() {
  const response = await getPublicCoursesList(1, { paginate: false });

  return response?.data?.courses?.map((course) => ({
    slug: course.slug,
  })) ?? [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;

  const response = await getCourseDetailBySlug(slug);

  if (!response.success) {
    return {
      title: "Course Not Found",
      description: "The course does not exist.",
    };
  }

  const course = response.data;

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: course.featured_image ? [{ url: course.featured_image }] : [],
    },
  };
}

// Course Detail Page Component
const CourseDetail = async ({ params }: CourseDetailPageProps) => {
  let course;
  const { slug } = await params;

  try {
    const response = await getCourseDetailBySlug(slug);
    course = response?.data;
    
    if (!course) {
      return notFound();
    }
    if (!response.success) {
      return <ErrorComponent message="Failed to load course details." />;
    }
  } catch (error) {
    console.error("Error loading course:", error);
    return <ErrorComponent message="Failed to load course details." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 space-y-16">
        <HeroSection course={course} />
        <VideoSection course={course} />
        <WhatYouLearnSection course={course} />
        <CurriculumSection course={course} />
        <ToolsSection course={course} />
        <WhoCanJoinSection course={course} />
        <InstructorsSection course={course} />
        <ReviewsSection course={course} />
        <CertificateSection course={course} />
        <FAQSection course={course} />
        <SocialMediaSection />
      </div>
    </div>
  );
};

export default CourseDetail;
