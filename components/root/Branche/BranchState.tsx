import { Warehouse, School, BookCopy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const contactDetails = [
  {
    icon: Warehouse,
    count: 8,
    title: "Divisions",
  },
  {
    icon: School,
    count: 64,
    title: "Districts",
  },
  {
    icon: BookCopy,
    count: 70,
    title: "Branches",
  },

];
const BranchState = () => {
  return (
    <section className="pt-8 md:pt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 w-full">
          {contactDetails.map((item, index) => (
            <Card
              key={index}
              className="py-3 gap-2 bg-linear-to-r to-[#009F41] from-0% via-[#1C833E] via-40% from-[#0B5B28] to-100% border-none shadow-lg text-white"
            >
              <CardContent className="p-0 flex flex-col items-center text-center">
                <div className="bg-white p-2 rounded-lg mb-2 shadow-xl border border-secondary/50">
                  <item.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-xl xl:text-2xl">{item.count}</h3>
                <h3 className="font-bold text-xl xl:text-2xl">{item.title}</h3>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchState;
