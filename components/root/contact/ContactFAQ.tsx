import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    id: 1,
    question: "How can I enroll in a course?",
    answer:
      "You can enroll in any of our courses through our website's enrollment portal or by visiting our office directly.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including Credit/Debit cards, Mobile Banking (bKash, Nagad), and bank transfers.",
  },
  {
    id: 3,
    question: "Do you offer any discounts?",
    answer:
      "Yes, we offer early-bird discounts and group enrollment discounts. Keep an eye on our social media for seasonal promotions.",
  },
  {
    id: 4,
    question: "What support do you offer after enrollment?",
    answer:
      "Enrolled students get access to 24/7 online support, community forums, and direct mentorship from industry experts.",
  },
];

const ContactFAQ = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto">
        <Card className="shadow-sm border-t-4 border-t-[#1a1c4e]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#1a1c4e]">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="border-b last:border-0"
                >
                  <AccordionTrigger className="text-left font-medium text-[#1a1c4e] hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactFAQ;
