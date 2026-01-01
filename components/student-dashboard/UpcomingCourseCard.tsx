import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
import RatingStars from "@/components/common/RatingStars";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UpcomingCourse } from "@/apiServices/studentDashboardService";
// import Link from "next/link";

interface UpcomingCourseCardProps {
  course: UpcomingCourse;
}

export default function UpcomingCourseCard({course}: UpcomingCourseCardProps) {

  const { title, featured_image, ratings, slug } = course;
  const image = featured_image || "/images/placeholder_img.jpg";
  return (
    <Card className="transition-all hover:shadow-lg py-0 gap-0 group h-full flex flex-col justify-between">
      <CardHeader className="p-0 overflow-hidden rounded-t-xl">
        <AspectRatio ratio={3 / 2} className="relative bg-muted">
          <Image src={image} alt={title} fill className="object-cover" />
        </AspectRatio>
      </CardHeader>

      <CardContent className="p-4 space-y-3 flex-1">
        <div className="flex gap-2">
          <span className="bg-secondary text-white text-xs px-2 py-1 rounded">
            {course?.batch?.name}
          </span>
          <span className="bg-secondary text-white text-xs px-2 py-1 rounded">
            {course?.batch?.days_to_go} Days to Go
          </span>
          <span className="bg-secondary text-white text-xs px-2 py-1 rounded">
            {course?.batch?.available_seats} Seats Available
          </span>
        </div>
        <h3 className="font-semibold text-secondary">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">৳ {course?.batch?.price}</span>
          <RatingStars rating={ratings} />
        </div>
      </CardContent>

      {/* <CardFooter className="p-4 pt-0 flex justify-center">
        <Button asChild>
          <Link href={`/courses/${slug}`} className="flex items-center gap-2">View Details</Link>
        </Button>
      </CardFooter> */}
    </Card>
  );
}
