import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";
import RatingStars from "@/components/common/RatingStars";

const AVATAR_PLACEHOLDER = "https://placehold.co/40x40/4f46e5/ffffff/png?text=U";

interface ReviewsSectionProps {
  course: CourseDetail;
}

export const ReviewsSection = ({ course }: ReviewsSectionProps) => {
  const reviews = course.reviews || [];

  if (reviews.length === 0) return null;

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in duration-500">Student Reviews</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={review.id} className="animate-in fade-in hover:scale-105 transition-transform duration-500 h-full">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">{review.feedback}</p>
                <div className="flex justify-between items-start pt-4 border-t">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={review.user.profile_image || AVATAR_PLACEHOLDER}
                      alt={review.user.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{review.user.name}</p>
                      <RatingStars rating={review.rating} />
                    </div>
                  </div>
                  <div>
                    <Quote className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
