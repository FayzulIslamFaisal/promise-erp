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


const courseDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 space-y-16">
        <HeroSection />
        <VideoSection />
        <WhatYouLearnSection />
        <CurriculumSection />
        <ToolsSection />
        <WhoCanJoinSection />
        <InstructorsSection />
        <ReviewsSection />
        <CertificateSection />
        <FAQSection />
        <SocialMediaSection />
      </div>
    </div>
  );
};

export default courseDetail;
