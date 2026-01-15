import { Users, Briefcase, BookOpen, Headset } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EmployeeCategory {
  title: string;
  price: number | string;
  icon: React.ReactNode;
}


const categories: EmployeeCategory[] = [
  {
    title: "Executive Management",
    price: "25000-40000",
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    title: "Location",
    price: "Dhaka, Bangladesh",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Job Type",
    price: "Full-time",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    title: "Deadline",
    price: "20 January, 2026",
    icon: <Headset className="w-8 h-8" />,
  },
];

const JobInfoCardBySlug = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="bg-linear-to-r to-[#009F41] from-0% via-[#1C833E] via-40% from-[#0B5B28] to-100% border-none shadow-lg text-white"
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="bg-white backdrop-blur-sm text-primary p-2 rounded-xl mb-4">
                {category.icon}
              </div>
              <h4 className="text-base font-semibold mb-2">{category.title}</h4>
              <p className="text-sm text-emerald-100 leading-relaxed">
                {category.price}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default JobInfoCardBySlug
