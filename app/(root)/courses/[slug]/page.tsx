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
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getCourseDetailBySlug(slug);

    if (!response.success || !response.data) {
      return {
        title: "Course Not Found",
        description: "The course you are looking for does not exist.",
      };
    }

    const course = response.data;

    return {
      title: course.title || "Course Detail",
      description: course.description || "Learn more about this course",
      openGraph: {
        title: course.title,
        description: course.description,
        images: course.featured_image ? [{ url: course.featured_image }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: course.title,
        description: course.description,
        images: course.featured_image ? [course.featured_image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Course Detail",
      description: "Learn more about this course",
    };
  }
}

const CourseDetail = async ({ params }: CourseDetailPageProps) => {
  try {
    const { slug } = await params;
    const response = await getCourseDetailBySlug(slug);

    if (!response.success || !response.data) {
      notFound();
    }

    const course = response.data;

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
  } catch (error) {
    console.error("Error loading course:", error);
    notFound();
  }
};

export default CourseDetail;
