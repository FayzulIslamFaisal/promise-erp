import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export const WhoCanJoinSection = () => {
  const participants = [
    "Beginners",
    "UI/UX Designer/ Learners",
    "Artists",
    "Brand/ Graphic Makers",
    "Aspiring Aesthetics",
    "Creative Thinkers",
    "Students",
    "Learning/ New Seekers"
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Who Can Join</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>{participant}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
