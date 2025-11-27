"use client";

import { BookOpen, Clock, MoveRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RatingStars from "@/components/common/RatingStars";
import { Badge } from "@/components/ui/badge";

export const courses = [
  {
    id: 1,
    title: "Cloud Accounting (QuickBooks, Xero, Bookkeeping)",
    oldPrice: 25000,
    price: 17500,
    classes: 36,
    duration: "3 Months",
    discount: "30% Off",
    rating: 4.2,
    image: "/images/hero-banner/courselist.png",
    slug: "cloud-accounting-quickbooks-xero-bookkeeping",
  },
  {
    id: 2,
    title: "Project Management Professional (PMP)",
    oldPrice: 20000,
    price: 16000,
    classes: 24,
    duration: "2 Months",
    discount: "20% Off",
    rating: 4.5,
    image: "/images/hero-banner/courselist.png",
    slug: "project-management-professional-pmp",
  },
  {
    id: 3,
    title: "AI Content Creation & Earn Money From Online",
    oldPrice: 12000,
    price: 6000,
    classes: 16,
    duration: "2 Months",
    discount: "50% Off",
    rating: 4.0,
    image: "/images/hero-banner/courselist.png",
    slug: "ai-content-creation-earn-money-from-online",
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    oldPrice: 30000,
    price: 22000,
    classes: 40,
    duration: "4 Months",
    discount: "25% Off",
    rating: 4.7,
    image: "/images/hero-banner/courselist.png",
    slug: "full-stack-web-development",
  },
  {
    id: 5,
    title: "Graphic Design Masterclass",
    oldPrice: 18000,
    price: 12000,
    classes: 28,
    duration: "3 Months",
    discount: "33% Off",
    rating: 4.3,
    image: "/images/hero-banner/courselist.png",
    slug: "graphic-design-masterclass",
  },
  {
    id: 6,
    title: "Digital Marketing Professional",
    oldPrice: 20000,
    price: 15000,
    classes: 20,
    duration: "2 Months",
    discount: "25% Off",
    rating: 4.4,
    image: "/images/hero-banner/courselist.png",
    slug: "digital-marketing-professional",
  },
];

const HomeCourses = () => {
  return (
    <section className="bg-white py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="শিক্ষার্থীদের পছন্দের কোর্সসমূহ"
          subtitle="দেখে নিন কোন কোর্সগুলো সবচেয়ে বেশি জনপ্রিয় হয়েছে"
          iswhite={false}
        />
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-full relative"
        >
          <CarouselContent className="py-4">
            {courses.map((course) => (
              <CarouselItem
                key={course.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 "
              >
                <Card
                  key={course?.id}
                  className="group overflow-hidden h-full transition-all hover:shadow-lg py-0 gap-0"
                >
                  <CardHeader className="p-0 relative mb-0 overflow-hidden">
                    <AspectRatio
                      ratio={2 / 1}
                      className="bg-muted rounded-lg overflow-hidden"
                    >
                      <Image
                        src={
                          course?.image || "/images/hero-banner/courselist.png"
                        }
                        alt={course.title}
                        fill
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </AspectRatio>

                    {course.discount ? (
                      <Badge className="absolute top-3 right-3 bg-primary">
                        {course?.discount}% OFF
                      </Badge>
                    ) : null}

                    <div className="absolute inset-0 bg-secondary opacity-30 group-hover:opacity-40 transition-all"></div>
                  </CardHeader>

                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-medium text-secondary text-base tracking-tight capitalize">
                      {course?.title}
                    </h3>
                    <div className="flex items-center gap-1 justify-end pb-1">
                      <RatingStars rating={course?.rating ?? 0} />
                    </div>

                    <div className="flex justify-between items-center text-sm text-secondary">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course?.classes ?? "N/A"} Classes</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration || "N/A"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {course.oldPrice > 0 ? (
                        <span className="text-sm text-muted-foreground line-through">
                          ৳ {course?.oldPrice}
                        </span>
                      ) : null}

                      <span className="text-lg font-bold primary">
                        ৳{" "}
                        {course.oldPrice > 0 ? course?.oldPrice : course?.price}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 justify-center">
                    <Link href={`/courses/${course?.slug}`}>
                      <Button className="cursor-pointer">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows inside container */}
          <CarouselPrevious className=" absolute cursor-pointer left-0 md:-left-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none " />
          <CarouselNext className="absolute cursor-pointer right-0 md:right-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none" />
        </Carousel>
        <div className="pt-6 flex items-center justify-center">
          <Button asChild className="cursor-pointer flex items-center gap-2">
            <Link href="#">
              সব কোর্স দেখুন
              <MoveRight className="w-5 h-5 animate-bounce" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
