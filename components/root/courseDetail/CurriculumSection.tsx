import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronDown, PlayCircle } from "lucide-react";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";

interface CurriculumSectionProps {
  course: CourseDetail;
}

export const CurriculumSection = ({ course }: CurriculumSectionProps) => {
  const chapters = course.chapters || [];

  if (chapters.length === 0) return null;

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in duration-500">Course Curriculum</h2>
        <Accordion type="single" collapsible className="space-y-3 border-b-2 border-black/20 rounded-lg">
          {chapters.map((chapter, index) => (
            <AccordionItem
              key={chapter.id}
              value={`item-${chapter.id}`}
              className="border-2 border-black/20 rounded-lg bg-primary/10 animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <PlayCircle className="w-5 h-5 text-primary" />
                  <span className="font-bold fs-3">{chapter.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 border-t border-black/10">
                {chapter.description && (
                  <p className="text-muted-foreground mb-3">{chapter.description}</p>
                )}
                {chapter.lessons && chapter.lessons.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-4 py-3">
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span>{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
