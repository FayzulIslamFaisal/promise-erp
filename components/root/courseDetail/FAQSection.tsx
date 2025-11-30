import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";

interface FAQSectionProps {
  course: CourseDetail;
}

export const FAQSection = ({ course }: FAQSectionProps) => {
  const faqs = course.faqs || [];

  if (faqs.length === 0) return null;

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in duration-500">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={`faq-${faq.id}`}
              className="border-b animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <span className="font-semibold text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
