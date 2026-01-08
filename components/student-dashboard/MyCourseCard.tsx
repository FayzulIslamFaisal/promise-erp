import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RatingStars from "@/components/common/RatingStars";
// import Link from "next/link";
import { StudentMyCourse } from "@/apiServices/studentDashboardService";

interface MyCourseCardProps {
  course: StudentMyCourse;
}
const MyCourseCard = ({ course }: MyCourseCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg py-0 gap-0 group h-full flex flex-col justify-between">
      {/* IMAGE */}
      <CardHeader className="p-0 overflow-hidden rounded-t-xl">
        <AspectRatio ratio={3 / 2} className="relative bg-muted">
          <Image
            src={course?.course?.featured_image || "/images/placeholder_img.jpg"}
            alt={course?.course?.title}
            fill
            className="object-cover"
          />
        </AspectRatio>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="p-4 space-y-3 flex-1">
        <div className="flex items-center justify-between gap-3">
          <Badge className="">Batch {course?.batch?.name}</Badge>
          <RatingStars rating={course?.course?.ratings} />
        </div>
        <h3 className="text-base font-semibold text-secondary leading-snug">
          {/* <Link href={`/courses/${course?.course?.slug}`}>{course?.course?.title}</Link> */}
          {course?.course?.title}
        </h3>
        {/* Progress info */}
        <div className="flex justify-between text-sm text-primary">
          <span>Class Progress</span>
          <span>
            {course?.progress_text || 0}
          </span>
        </div>

        {/* Progress bar */}
        <Progress value={course.progress_percentage} className="h-2" />
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-center">
        {/* <Link href={`/courses/${course?.course?.slug}`}> */}
          <Button>Continue Learning</Button>
        {/* </Link> */}
      </CardFooter>
    </Card>
  );
};

export default MyCourseCard;
