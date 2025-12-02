"use client";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import CourseCard from "../courseList/CourseCard";
import { Course } from "@/apiServices/courseListPublicService";



export const courses: Course[] = [
  {
    id: 1,
    category_id: 1,
    title: "Cloud Accounting (QuickBooks, Xero, Bookkeeping)",
    slug: "cloud-accounting-quickbooks-xero-bookkeeping",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.2,
    total_live_class: 36,
    is_default: false, // Add missing required property
    batch: {
      price: 25000,
      discount: 30,
      discount_type: "percentage",
      after_discount: 17500,
      is_online: true,
      is_offline: false,
      start_date: "2024-01-15",
      end_date: "2024-04-15",
      duration: "3 Months",
    },
  },
  {
    id: 2,
    category_id: 1,
    title: "Project Management Professional (PMP)",
    slug: "project-management-professional-pmp",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.5,
    total_live_class: 24,
    is_default: false,
    batch: {
      price: 20000,
      discount: 20,
      discount_type: "percentage",
      after_discount: 16000,
      is_online: true,
      is_offline: true,
      start_date: "2024-02-01",
      end_date: "2024-03-31",
      duration: "2 Months",
    },
  },
  // ... rest of courses with complete batch data
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
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-auto"
              >
                <CourseCard course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows inside container */}
          <CarouselPrevious className=" absolute cursor-pointer left-0 md:-left-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none " />
          <CarouselNext className="absolute cursor-pointer right-0 md:-right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none" />
        </Carousel>
        <div className="pt-6 flex items-center justify-center">
          <Button asChild className="cursor-pointer flex items-center gap-2">
            <Link href="/courses">
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
