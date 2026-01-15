import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
interface Categories {
  id: number;
  name: string;
  count: number;
  active: boolean;
}
const categories: Categories[] = [
  {
    id: 1,
    name: "All Posts",
    count: 48,
    active: true,
  },
  {
    id: 2,
    name: "Digital Marketing",
    count: 12,
    active: false,
  },
  {
    id: 3,
    name: "Web Development",
    count: 15,
    active: false,
  },
  {
    id: 4,
    name: "Content Writing",
    count: 8,
    active: false,
  },

  {
    id: 5,
    name: "Career",
    count: 13,
    active: true,
  },
  {
    id: 6,
    name: "Tips",
    count: 8,
    active: false,
  },
];
const tags = [
  "Tips",
  "Career",
  "Marketing",
  "SEO",
  "Graphics Design",
  "React",
  "Javascript",
  "Outsourcing",
  "Skill Development",
];
const BlogCategorySidebar = () => {
  return (
    <div className="space-y-6">
      {/* Categories Card */}
      <Card className="shadow-sm gap-2">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-semibold text-secondary">
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-1">
            {categories.map((category, ) => (
              <li key={category.id} className="group cursor-pointer capitalize  flex items-center justify-between bg-secondary/5 hover:bg-primary px-3 py-2 rounded-lg text-secondary hover:text-white mb-2 last:mb-0">
                <span className="font-bold text-base">{category.name}</span>
                <span
                  className="bg-secondary/20 text-secondary px-2 py-1 rounded-md group-hover:bg-white group-hover:text-secondary"
                >
                  {category.count}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Popular Tags Card */}
       <Card className="shadow-sm gap-2">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-semibold text-secondary flex items-center gap-2">
            <Tag className="h-5 w-5 text-secondary" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                className={`px-3 py-1.5 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 ${
                  index === 0
                    ? "bg-primary text-white "
                    : "border border-secondary text-secondary"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCategorySidebar;
