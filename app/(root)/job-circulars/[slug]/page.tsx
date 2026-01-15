import JobApplicationForm from "@/components/root/jobCirculars/JobApplicationForm";
import JobBySlugWrapperBanner from "@/components/root/jobCirculars/JobBySlugWrapperBanner";
import JobInfoCardBySlug from "@/components/root/jobCirculars/JobInfoCardBySlug";
import JobInfoRoleOverview from "@/components/root/jobCirculars/JobInfoRoleOverview";
import JobKeyResponsibilities from "@/components/root/jobCirculars/JobKeyResponsibilities";
import JobQualifications from "@/components/root/jobCirculars/JobQualifications";

const JobCircularBySlugdPage = () => {
  return (
    <>
      <JobBySlugWrapperBanner />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <JobInfoCardBySlug />
            <JobInfoRoleOverview />
            <JobKeyResponsibilities />
            <JobQualifications />
          </div>

          {/* Right Column - Application Form */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <JobApplicationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCircularBySlugdPage;
