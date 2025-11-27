import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "This course transformed my design skills! The instructors are amazing and the content is top-notch.",
      img: "/images/avatar-1.png"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Best investment I've made in my career. Highly recommend to anyone wanting to learn graphic design.",
      img: "/images/avatar-2.png"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "The hands-on projects and feedback from instructors made all the difference. Worth every penny!",
      img: "/images/avatar-3.png"
    }
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in duration-500">Student Reviews</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="animate-in fade-in hover:scale-105 transition-transform duration-500 h-full">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>
                <div className="flex justify-between items-start pt-4 border-t">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={review.img}
                      alt={review.name}
                      width={60}
                      height={60}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
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
