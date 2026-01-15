import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const qualifications = [
  "Competitive salary with performance bonuses",
  "Professional development opportunities",
  "Annual leave and festival bonuses",
  "Health insurance coverage",
  "Flexible work environment",
  "Collaborative team culture"
];

const JobQualifications = () => {
  return (
    <Card className="gap-4 shadow-sm py-0">
      <div className="h-2 bg-linear-to-r from-secondary via-primary to-secondary rounded-tl-xl rounded-tr-xl "></div>
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold text-secondary flex items-center gap-2">
          Qualifications
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {qualifications.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-3 rounded-lg bg-primary/15 hover:bg-primary/20 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-black">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobQualifications;

