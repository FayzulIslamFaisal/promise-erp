import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "What is the duration of the course?",
      answer: "The course spans 3 months with 54 live classes and lifetime access to course materials."
    },
    {
      question: "Do I need prior design experience?",
      answer: "No prior experience is needed. This course is designed for beginners and intermediate learners."
    },
    {
      question: "What software will I need?",
      answer: "You'll need Adobe Photoshop, Illustrator, InDesign, and Figma. Trial versions are available."
    },
    {
      question: "Will I receive a certificate?",
      answer: "Yes, you'll receive a professional certificate upon successful completion of the course."
    },
    {
      question: "Is there any support available?",
      answer: "Yes, you get 24/7 support and 3 months of dedicated mentorship after course completion."
    }
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in duration-500">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
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
