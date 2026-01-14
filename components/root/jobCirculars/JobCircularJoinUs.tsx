import { TrendingUp, Users, BadgeCheck, Clock } from "lucide-react";
import JobCircularState from "./JobCircularState";
export interface JobCircularsState {
  id: number;
  title: string;
  description?: string;
  icon: React.ReactNode;
}

const categories: JobCircularsState[] = [
  {
    id: 1,
    title: "Career Growth",
    description:
      "Continuous learning opportunities and clear advancement paths",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "Great Culture",
    description: "Collaborative environment with passionate professionals",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 3,
    title: "Benefits Package",
    description: "Competitive salary, bonuses, and comprehensive benefits",
    icon: <BadgeCheck className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "Flexible Work",
    description: "Remote-friendly setup with flexible working hours",
    icon: <Clock className="w-8 h-8" />,
  },
];

const JobCircularJoinUs = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-secondary pb-8">
          <h2 className="text-2xl lg:text-5xl mb-5 font-bold">Why Join Us?</h2>
          <p className="text-secondary/60">
            We believe in nurturing talent and creating opportunities for growth
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4">
          { categories.map((category, index) => (
            <JobCircularState key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCircularJoinUs;
