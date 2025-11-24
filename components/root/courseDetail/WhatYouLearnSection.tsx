import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export const WhatYouLearnSection = () => {
  const learningPoints = [
    "Graphic design fundamentals (color, typography, layout, composition)",
    "Finishing a documentary creative",
    "Inside working post-treatment design",
    "Create typography and poster-learning templates",
    "Designs + time-saving client specs",
    "Building a economically design portfolio"
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">What You'll Learn in This Course</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {learningPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-medium">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
