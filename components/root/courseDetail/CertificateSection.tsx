import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";
const PLACEHOLDER_CERTIFICATE = "https://placehold.co/600x400/4f46e5/ffffff/png?text=Certificate";

interface CertificateSectionProps {
  course: CourseDetail;
}

export const CertificateSection = ({ course }: CertificateSectionProps) => {
  if (!course.certificate_image) return null;

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in duration-500">Certificate of Completion</h2>
        <div className="rounded-lg flex items-center justify-center animate-in fade-in zoom-in-90 duration-500 hover:scale-105 transition-transform">
          <Image
            src={course.certificate_image || PLACEHOLDER_CERTIFICATE}
            alt={`${course.title} - Certificate of Completion`}
            width={600}
            height={400}
            className="object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};
