import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronDown, PlayCircle } from "lucide-react";

export const CurriculumSection = () => {
  const modules = [
    {
      number: "01",
      title: "Introduction & Getting Started with Adobe Illustrator",
      description: "Learn the basics of Adobe Illustrator interface and essential tools.",
      lesson : [
        "Introduction to Adobe Illustrator",
        "Understanding the Interface",
        "Creating a New Document",
        "Working with Layers",
        "Using the Selection Tool",
        "Using the Shape Tools"
      ]
    },
    {
      number: "02",
      title: "Working with Artboard, Basic Shape Tools, Pathfinder & Align",
      description: "Master the fundamental shape tools and alignment features.",
      lesson : [
        "Introduction to Adobe Illustrator",
        "Understanding the Interface",
        "Creating a New Document",
        "Working with Layers",
        "Using the Selection Tool",
        "Using the Shape Tools"
      ]
    },
    {
      number: "03",
      title: "Colour Theory, Blending Mode & Gradients",
      description: "Understand color theory and advanced coloring techniques.",
      lesson : [
        "Introduction to Adobe Illustrator",
        "Understanding the Interface",
        "Creating a New Document",
        "Working with Layers",
        "Using the Selection Tool",
        "Using the Shape Tools"
      ]
    },
    {
      number: "04",
      title: "Working with Type Tool, Typography & Pen Tool",
      description: "Create beautiful typography and master the pen tool.",
      lesson : [
        "Introduction to Adobe Illustrator",
        "Understanding the Interface",
        "Creating a New Document",
        "Working with Layers",
        "Using the Selection Tool",
        "Using the Shape Tools"
      ]
    },
    {
      number: "05",
      title: "Logo Design",
      description: "Learn professional logo design principles and techniques.",
      lesson : [
        "Introduction to Adobe Illustrator",
        "Understanding the Interface",
        "Creating a New Document",
        "Working with Layers",
        "Using the Selection Tool",
        "Using the Shape Tools"
      ]
    },
    {
      number: "06",
      title: "Explore Effects Menu, Masking & Transparency",
      description: "Advanced effects and transparency techniques.",
      lesson : [
        "Introduction to Adobe Illustrator",
        "Understanding the Interface",
        "Creating a New Document",
        "Working with Layers",
        "Using the Selection Tool",
        "Using the Shape Tools"
      ]
    },
    {
      number: "07",
      title: "Explore Effects Menu, Masking & Transparency",
      description: "Advanced effects and transparency techniques.",
      lesson : [
        "Introduction to Adobe Illustrator",
        "Understanding the Interface",
        "Creating a New Document",
        "Working with Layers",
        "Using the Selection Tool",
        "Using the Shape Tools"
      ]
    }
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Course Curriculum</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {modules.map((module, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-black/50 rounded-lg bg-primary/10 ">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">{module.number}</span>
                  <PlayCircle className="w-5 h-5 text-primary" />
                  <span className="font-bold fs-3">{module.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 border-t border-black/20">
                {/* 2 col lesson list here */}
                <div className="grid md:grid-cols-2 gap-4 py-3">
                  {module.lesson.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-6">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            See More <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
