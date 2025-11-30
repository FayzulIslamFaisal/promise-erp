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



export const courses : Course[] = [
  {
    id: 1,
    lm_category_id: 1,
    title: "Cloud Accounting (QuickBooks, Xero, Bookkeeping)",
    slug: "cloud-accounting-quickbooks-xero-bookkeeping",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.2,
    total_live_class: 36,

    batch: {
      discount: 30,
      duration: "3 Months",
      price: 25000,
      after_discount: 17500,
    },
  },
  {
    id: 2,
    lm_category_id: 1,
    title: "Project Management Professional (PMP)",
    slug: "project-management-professional-pmp",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.5,
    total_live_class: 24,

    batch: {
      discount: 20,
      duration: "2 Months",
      price: 20000,
      after_discount: 16000,
    },
  },
  {
    id: 3,
    lm_category_id: 1,
    title: "AI Content Creation & Earn Money From Online",
    slug: "ai-content-creation-earn-money-from-online",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.0,
    total_live_class: 16,

    batch: {
      discount: 50,
      duration: "2 Months",
      price: 12000,
      after_discount: 6000,
    },
  },
  {
    id: 4,
    lm_category_id: 1,
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.7,
    total_live_class: 40,

    batch: {
      discount: 25,
      duration: "4 Months",
      price: 30000,
      after_discount: 22000,
    },
  },
  {
    id: 5,
    lm_category_id: 1,
    title: "Graphic Design Masterclass",
    slug: "graphic-design-masterclass",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.3,
    total_live_class: 28,

    batch: {
      discount: 33,
      duration: "3 Months",
      price: 18000,
      after_discount: 12000,
    },
  },
  {
    id: 6,
    lm_category_id: 1,
    title: "Digital Marketing Professional",
    slug: "digital-marketing-professional",
    featured_image: "/images/hero-banner/courselist.png",
    ratings: 4.4,
    total_live_class: 20,

    batch: {
      discount: 25,
      duration: "2 Months",
      price: 20000,
      after_discount: 15000,
    },
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
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-auto px-2"
              >
                <CourseCard course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows inside container */}
          <CarouselPrevious className=" absolute cursor-pointer left-0 md:-left-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none " />
          <CarouselNext className="absolute cursor-pointer right-0 md:right-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none" />
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
