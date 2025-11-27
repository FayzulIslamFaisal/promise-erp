"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

const categories = [
  {
    icon: "/images/home/course1.png",
    id: 1,
    title: "Web & Software Development",
    courses: "৬ Courses",
  },
  {
    icon: "/images/home/course2.png",
    id: 2,
    title: "Graphics & Multimedia",
    courses: "৫ Courses",
  },
  {
    icon: "/images/home/course3.png",
    id: 3,
    title: "Digital Marketing",
    courses: "৪ Courses",
  },
  {
    icon: "/images/home/course4.png",
    id: 4,
    title: "Networking",
    courses: "২ Courses",
  },
  {
    icon: "/images/home/course1.png",
    id: 5,
    title: "Ai & ML",
    courses: "5 Courses",
  },
];

const CourseCategoriesSection = () => {
  return (
    <section className="bg-secondary py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle 
           title="আপনার আগ্রহের কোর্স বিভাগ খেঁজে নিন" 
           subtitle="দক্ষতা উন্নয়নের জন্য পছন্দের বিষয় থেকে কোর্স খুঁজে নিন"
           iswhite={true}
          />
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-full relative"
      >
        <CarouselContent className="py-4">
          {categories.map((course) => (
            <CarouselItem
              key={course.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-1 sm:px-2"
            >
              <Card className="group h-full bg-[var(--secondary-light)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 text-center">
              <CardContent className="flex flex-col items-center justify-between gap-6 p-8">
                <div className="bg-white p-4 mt-4 mx-auto rounded-full shadow-md w-[100] h-[100] flex items-center justify-center">
                  <Image
                    src={course.icon}
                    alt={course.title}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-base md:text-2xl font-semibold capitalize text-white">
                  {course.title}
                </h3>

                <div className="flex justify-center ">
                  <Button variant="outline" asChild className="text-white py-5 flex items-center gap-2 ">
                    <Link href="/courses">
                      <span className="font-semibold">{course.courses}</span>
                      <div className="bg-primary text-white p-2 rounded-full inline-flex items-center justify-center">
                        <ChevronRight width={20} height={20} />
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows inside container */}
        <CarouselPrevious className=" absolute cursor-pointer left-0 md:-left-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none " />
        <CarouselNext className="absolute cursor-pointer right-0 md:right-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none" />
      </Carousel>
    </div>
    </section>
  );
};

export default CourseCategoriesSection;
