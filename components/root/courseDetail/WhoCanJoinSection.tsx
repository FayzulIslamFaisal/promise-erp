import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";

interface WhoCanJoinSectionProps {
  course: CourseDetail;
}

export const WhoCanJoinSection = ({ course }: WhoCanJoinSectionProps) => {
  // API doesn't have who_can_join field, so we'll hide this section
  return null;
};
