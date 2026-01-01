"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryPill from "./CategoryPill";
import { CourseCategory } from "@/apiServices/studentDashboardService";
interface UpcomingCategoryProps {
  categories: CourseCategory[];
}
const UpcomingCategoryCarousel = ({ categories }: UpcomingCategoryProps) => {
  return (
    <Carousel className="w-full max-w-full relative">
      <CarouselContent>
        {categories.map((cat) => (
          <CarouselItem
            key={cat.id}
            className="basis-full sm:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
          >
            <CategoryPill category={cat} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-2 bg-primary text-white" />
      <CarouselNext className="-right-2 bg-primary text-white" />
    </Carousel>
  );
};

export default UpcomingCategoryCarousel;
