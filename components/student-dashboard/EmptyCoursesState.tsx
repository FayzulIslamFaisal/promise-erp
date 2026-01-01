import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyCoursesStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

const EmptyCoursesState = ({
  title = "You haven’t enrolled in any course yet.",
  description = "Discover courses that match your skills and interests.",
  buttonText = "Explore Courses",
  buttonHref = "/courses",
}: EmptyCoursesStateProps) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      {/* Illustration */}
      <div className="relative w-48 h-48 mb-6">
        <Image
          src="/images/course-empty.png"
          alt="No courses enrolled"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text */}
      <h2 className="text-lg font-semibold text-secondary mb-1">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {description}
      </p>

      {/* Button */}
      <Link href={buttonHref}>
        <Button>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCoursesState;
