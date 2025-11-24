import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const InstructorsSection = () => {
  const instructors = [
    {
      name: "Nidisha Talpara Agrawal",
      role: "Graphics Designer",
      certified: true,
      experience: "10+ years of teaching",
      tools: ["Ps", "Ai"]
    },
    {
      name: "Md. Mustaraf Hossen",
      role: "Graphics Designer",
      certified: true,
      experience: "10+ years of teaching",
      tools: ["Ps", "Ai"]
    }
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Instructors</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {instructors.map((instructor, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex gap-6">
                <div className="w-50 h-50 bg-muted rounded-lg">
                  {/* Placeholder for instructor image */}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                  <p className="text-muted-foreground mb-3">{instructor.role}</p>
                  <p className="text-sm mb-3">Certified Trainer</p>
                  <p className="text-sm text-muted-foreground mb-4">{instructor.experience}</p>
                  <div className="flex gap-2">
                    <Badge className="bg-primary text-primary-foreground">Expert in</Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {instructor.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center text-xs font-bold">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
