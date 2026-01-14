import { Users, Briefcase, BookOpen, Headset } from "lucide-react";
import { Card } from "@/components/ui/card";
interface EmployeeCategory {
  count: number;
  title: string;
  description?: string;
  icon: React.ReactNode;
}

const categories: EmployeeCategory[] = [
  {
    count: 400,
    title: "Expert Trainers",
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    count: 100000,
    title: "Students Trained",
    icon: <Users className="w-8 h-8" />,
  },
  {
    count: 4000,
    title: "Courses",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    count: 50,
    title: "populous courses",
    icon: <Headset className="w-8 h-8" />,
  },
];
const TrainerStates = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="bg-linear-to-r to-[#009F41] from-0% via-[#1C833E] via-40% from-[#0B5B28] to-100% border-none shadow-lg text-white"
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="bg-white backdrop-blur-sm text-primary p-3 rounded-xl mb-4">
                {category.icon}
              </div>

              {/* Employee Count */}
              <h3 className="text-4xl font-bold mb-2">{category.count}</h3>

              {/* Title */}
              <h4 className="text-lg font-semibold mb-2">{category.title}</h4>

              {/* Description */}
              <p className="text-sm text-emerald-100 leading-relaxed">
                {category.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default TrainerStates
