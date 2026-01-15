import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ResponsibilitySection {
  title: string;
  items: string[];
}

const responsibilities: ResponsibilitySection[] = [
  {
    title: "Strategic Content Development",
    items: [
      "Develop high-impact website content, landing pages, service pages & product narratives",
      "Plan and execute content strategies aligned with brand positioning and business goals",
      "Lead content calendar planning for website, social media, and digital campaigns"
    ]
  },
  {
    title: "SEO & Performance Optimization",
    items: [
      "Create SEO-optimized content following advanced on-page standards",
      "Monitor keyword performance, analytics & audience behavior",
      "Collaborate with SEO team to boost search engine ranking"
    ]
  },
  {
    title: "Digital Content Operations",
    items: [
      "Produce high-quality blogs, technical content, scripts, micro-copy & marketing materials",
      "Ensure brand consistency across all channels",
      "Perform competitive analysis to guide content improvements"
    ]
  },
  {
    title: "Research & Data-Driven Work",
    items: [
      "Conduct deep market research, competitor study & trend analysis",
      "Use analytics to improve engagement and conversion",
      "Stay updated with latest content trends and algorithm changes"
    ]
  }
];

const JobKeyResponsibilities = () => {
  return (
    <Card className="gap-4 shadow-sm py-0">
      <div className="h-2 bg-linear-to-r from-secondary via-primary to-secondary rounded-tl-xl rounded-tr-xl "></div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-secondary flex items-center gap-2">
          Key Responsibilities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pb-4">
        {responsibilities.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2 border-l border-primary">
            <h4 className="font-semibold text-secondary pl-3">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-2 flex items-start gap-2 text-secondary text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default JobKeyResponsibilities;

