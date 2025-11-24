import { Card, CardContent } from "@/components/ui/card";

export const ToolsSection = () => {
  const tools = [
    {
      icon: "Ps",
      name: "Adobe Photoshop",
      description: "You will learn a wide range of creative ways to use Photoshop"
    },
    {
      icon: "Ai",
      name: "Adobe Illustrator",
      description: "Master illustration and design with in-city tools"
    },
    {
      icon: "Id",
      name: "Adobe InDesign",
      description: "Understand layout, page management and design layouts"
    },
    {
      icon: "Fg",
      name: "Figma",
      description: "Learn UI/UX design and collaborate"
    }
  ];

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Tools & Technologies You Will Master</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{tool.icon}</span>
                </div>
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
