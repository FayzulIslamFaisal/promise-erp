import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, PlayCircle, Clock, Users, HeadphonesIcon, Inbox, GraduationCap } from "lucide-react";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x400/4f46e5/ffffff/png?text=Course+Image";

interface HeroSectionProps {
  course: CourseDetail;
}

export const HeroSection = ({ course }: HeroSectionProps) => {
  const displayImage = course.featured_image || PLACEHOLDER_IMAGE;
  const totalReviews = course.reviews?.length || 0;
  const rating = course.ratings || 0;
  const price = course.batch?.after_discount || course.batch?.price || 0;
  const originalPrice = course.batch?.price || 0;
  const discount = course.batch?.discount || 0;
  const hasDiscount = discount > 0 && originalPrice > price;

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Column - Course Info */}
      <div className="animate-in fade-in slide-in-from-left duration-500">
        <Badge className="bg-primary text-primary-foreground mb-4">
          <GraduationCap className="w-5 h-5 mr-1" /> {course.total_certified || 0} Learners Certified
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {course.title}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <Inbox className="w-4 h-4 mr-1" />
          <span className="text-sm text-primary">{totalReviews} Reviews</span>
          <span>|</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-primary">({rating.toFixed(1)} Rating)</span>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {course.batch?.start_date && (
            <Badge variant="secondary" className="py-2 px-6">
              <PlayCircle className="w-4 h-4 mr-1" />
              Starts: {new Date(course.batch.start_date).toLocaleDateString()}
            </Badge>
          )}
          {course.total_seats !== null && course.total_seats !== undefined && (
            <Badge variant="secondary" className="py-2 px-6">
              <HeadphonesIcon className="w-4 h-4 mr-1" />
              {course.total_seats} total seats
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
          {course.total_live_class && (
            <Card className="p-0">
              <CardContent className="p-4 flex items-start gap-3">
                <PlayCircle className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold text-secondary">{course.total_live_class} Live Classes</div>
                </div>
              </CardContent>
            </Card>
          )}
          {course.batch?.duration && (
            <Card className="p-0">
              <CardContent className="p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold text-secondary">{course.batch.duration}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {hasDiscount && (
            <Badge className="mb-3">
              {course.batch.discount_type === "percentage"
                ? `${discount}% OFF`
                : `${discount} ৳ OFF`}
            </Badge>
          )}
          <div className="flex items-center gap-5 mb-4">
            <span className="text-3xl font-bold text-primary">{price} ৳</span>
            {hasDiscount && (
              <span className="text-xl text-muted-foreground line-through">{originalPrice} ৳</span>
            )}
          </div>
        </div>

        <Button variant="default" className="w-full">
          Enroll Now
        </Button>
      </div>

      {/* Right Column - About Course */}
      <div className="animate-in fade-in slide-in-from-right duration-500">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">About this Course</h2>
            <div className="mb-6 rounded-lg overflow-hidden aspect-video">
              <Image
                src={displayImage}
                alt={course.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
