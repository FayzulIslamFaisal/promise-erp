"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


export const InstructorsSection = () => {
  const instructors = [
    {
      name: "Nidisha Talpara Agrawal",
      role: "Graphics Designer",
      certified: true,
      experience: "10+ years of teaching",
      tools: ["Ps", "Ai"],
    },
    {
      name: "Md. Mustaraf Hossen",
      role: "Graphics Designer",
      certified: true,
      experience: "10+ years of teaching",
      tools: ["Ps", "Ai"],
    },
    {
      name: "Nidisha Talpara Agrawal",
      role: "Graphics Designer",
      certified: true,
      experience: "10+ years of teaching",
      tools: ["Ps", "Ai"],
    },
    {
      name: "Md. Mustaraf Hossen",
      role: "Graphics Designer",
      certified: true,
      experience: "10+ years of teaching",
      tools: ["Ps", "Ai"],
    },
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Instructors</h2>

        <Carousel className="w-full max-w-full">
          <CarouselContent>
            {instructors.map((instructor, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                <Card className="shadow-md">
                  <CardContent className="p-6 space-y-4 sm:flex gap-6">
                    <div className="w-50 h-50 bg-muted rounded-lg"></div>

                    <div>
                      <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                      <p className="text-muted-foreground mb-1">{instructor.role}</p>
                      <p className="text-sm text-primary mb-1">Certified Trainer</p>

                      <p className="text-sm text-muted-foreground mb-3">
                        {instructor.experience}
                      </p>

                      <p className="text-secondary font-medium">Expert in</p>
                      <div className="flex gap-2 mt-2">
                        {instructor.tools.map((tool, toolIndex) => (
                          <div
                            key={toolIndex}
                            className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center text-xs font-bold"
                          >
                            {tool}
                          </div>
                        ))}
                      </div>
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
