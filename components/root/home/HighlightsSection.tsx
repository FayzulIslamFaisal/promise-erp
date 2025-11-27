
import { GraduationCap, BookOpen, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    icon: GraduationCap,
    value: "১,০০,০০০+",
    label: "শিক্ষার্থী",
  },
  {
    icon: BookOpen,
    value: "৬০০+",
    label: "কোর্স",
  },
  {
    icon: Users,
    value: "২০০+",
    label: "দক্ষ প্রশিক্ষক",
  },
  {
    icon: TrendingUp,
    value: "৯৮%",
    label: "সফলতার হার",
  },
];

 const HighlightsSection = () => {
  return (
    <section className="py-8 md:py-14 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden bg-primary hover:bg-primary-light transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8 text-center relative z-10">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/20">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-primary-foreground/90 font-medium">
                  {stat.label}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/0 to-primary-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HighlightsSection;

