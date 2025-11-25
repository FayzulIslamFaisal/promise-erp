
import { GraduationCap, BookOpen, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    icon: GraduationCap,
    value: "১,০০0+",
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
    <section className="py-8 md:py-14 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative py-0 overflow-hidden bg-primary hover:bg-primary-light transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:-translate-y-2 group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="px-4 py-5 text-center relative z-10">
                <div className="mb-3 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white">
                  <stat.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="text-2xl md:text-4xl font-bold capitalize text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xl text-white font-normal">
                  {stat.label}
                </div>
              </div>
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HighlightsSection;

