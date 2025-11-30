import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";
import Image from "next/image";

const INSTRUCTOR_PLACEHOLDER = "https://placehold.co/200x200/4f46e5/ffffff/png?text=Instructor";

interface InstructorsSectionProps {
  course: CourseDetail;
}

export const InstructorsSection = ({ course }: InstructorsSectionProps) => {
  const instructors = course.course_instructors || [];

  if (instructors.length === 0) return null;

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in duration-500">Instructors</h2>

        <Carousel className="w-full max-w-full">
          <CarouselContent>
            {instructors.map((instructor, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                <Card className="shadow-md animate-in fade-in duration-500 hover:scale-95 transition-transform">
                  <CardContent className="p-6 space-y-4 sm:flex gap-6">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={instructor.profile_image || INSTRUCTOR_PLACEHOLDER}
                        alt={instructor.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                      <p className="text-sm text-muted-foreground">{instructor.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-primary text-white" />
          <CarouselNext className="bg-primary text-white" />
        </Carousel>
      </CardContent>
    </Card>
  );
};
