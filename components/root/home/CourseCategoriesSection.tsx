"use client";

import { Code, Palette, TrendingUp, Network, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  {
    icon: Code,
    id: 1,
    title: "Web & Software Development",
    courses: "৬ কোর্স",
  },
  {
    icon: Palette,
    id: 2,
    title: "Graphics & Multimedia",
    courses: "৫ কোর্স",
  },
  {
    icon: TrendingUp,
    id: 3,
    title: "Digital Marketing",
    courses: "৪ কোর্স",
  },
  {
    icon: Network,
    id: 4,
    title: "Networking",
    courses: "২ কোর্স",
  },
  {
    icon: Network,
    id: 5,
    title: "Ai & ML",
    courses: "5 কোর্স",
  },
];

const CourseCategoriesSection = () => {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative w-full "
      >
        <CarouselContent className="py-4">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card className="group bg-secondary-foreground backdrop-blur-sm border-secondary-foreground/10 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary-foreground/10 group-hover:bg-primary/20 transition-colors duration-300 mx-auto">
                  <category.icon className="w-10 h-10 text-secondary-foreground group-hover:text-primary transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-semibold text-primary mb-2">
                  {category.title}
                </h3>

                <Button variant="ghost" className="text-primary hover:text-primary-light group/btn">
                  <span className="font-semibold">{category.courses}</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows inside container */}
        <CarouselPrevious className="absolute cursor-pointer left-0 md:-left-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none " />
        <CarouselNext className="absolute cursor-pointer right-0 md:-right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none" />
      </Carousel>
    </div>
  );
};

export default CourseCategoriesSection;
