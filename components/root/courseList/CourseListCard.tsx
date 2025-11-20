import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Clock } from "lucide-react";
const CourseListCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="group overflow-hidden transition-all hover:shadow-lg py-0 gap-0">
          <CardHeader className="p-0 relative gap-0 overflow-hidden">
            <img
              src="/images/hero-banner/courselist.png"
              alt="Course List Card"
              className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <Badge className="absolute top-3 z-10 right-3 bg-primary-color white-color">
              10 % OFF
            </Badge>
            <div className="absolute inset-0 bg-secondary-color opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
          </CardHeader>

          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium secondary-color text-base tracking-tight capitalize ">
              Advance CPA Marketing
            </h3>

            <div className="flex items-center gap-1 justify-end pb-1 ">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rating text-rating" />
              ))}
            </div>

            <div className="flex justify-between items-center gap-4 text-sm secondary-color">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>16 Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2 Months</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold primary-color">
                ৳ 6000
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ৳ 6000
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 justify-center">
            <Button className="">View Details</Button>
          </CardFooter>
        </Card>

        <Card className="group overflow-hidden transition-all hover:shadow-lg py-0 gap-0">
          <CardHeader className="p-0 relative gap-0 overflow-hidden">
            <img
              src="/images/hero-banner/courselist.png"
              alt="Course List Card"
              className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <Badge className="absolute top-3 z-10 right-3 bg-primary-color white-color">
              10 % OFF
            </Badge>
            <div className="absolute inset-0 bg-secondary-color opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
          </CardHeader>

          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium secondary-color text-base tracking-tight capitalize ">
              Advance CPA Marketing
            </h3>

            <div className="flex items-center gap-1 justify-end pb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rating text-rating" />
              ))}
            </div>

            <div className="flex justify-between items-center gap-4 text-sm secondary-color">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>16 Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2 Months</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold primary-color">
                ৳ 6000
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ৳ 6000
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 justify-center">
            <Button className="">View Details</Button>
          </CardFooter>
        </Card>

        <Card className="group overflow-hidden transition-all hover:shadow-lg py-0 gap-0">
          <CardHeader className="p-0 relative gap-0 overflow-hidden">
            <img
              src="/images/hero-banner/courselist.png"
              alt="Course List Card"
              className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <Badge className="absolute top-3 z-10 right-3 bg-primary-color white-color">
              10 % OFF
            </Badge>
            <div className="absolute inset-0 bg-secondary-color opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
          </CardHeader>

          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium secondary-color text-base tracking-tight capitalize ">
              Advance CPA Marketing
            </h3>

            <div className="flex items-center gap-1 justify-end pb-1 ">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rating text-rating" />
              ))}
            </div>

            <div className="flex justify-between items-center gap-4 text-sm secondary-color">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>16 Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2 Months</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold primary-color">
                ৳ 6000
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ৳ 6000
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 justify-center">
            <Button className="">View Details</Button>
          </CardFooter>
        </Card>

        <Card className="group overflow-hidden transition-all hover:shadow-lg py-0 gap-0">
          <CardHeader className="p-0 relative gap-0 overflow-hidden">
            <img
              src="/images/hero-banner/courselist.png"
              alt="Course List Card"
              className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <Badge className="absolute top-3 z-10 right-3 bg-primary-color white-color">
              10 % OFF
            </Badge>
            <div className="absolute inset-0 bg-secondary-color opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
          </CardHeader>

          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium secondary-color text-base tracking-tight capitalize ">
              Advance CPA Marketing
            </h3>

            <div className="flex items-center gap-1 justify-end pb-1 ">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rating text-rating" />
              ))}
            </div>

            <div className="flex justify-between items-center gap-4 text-sm secondary-color">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>16 Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2 Months</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold primary-color">
                ৳ 6000
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ৳ 6000
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 justify-center">
            <Button className="">View Details</Button>
          </CardFooter>
        </Card>

        <Card className="group overflow-hidden transition-all hover:shadow-lg py-0 gap-0">
          <CardHeader className="p-0 relative gap-0 overflow-hidden">
            <img
              src="/images/hero-banner/courselist.png"
              alt="Course List Card"
              className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <Badge className="absolute top-3 z-10 right-3 bg-primary-color white-color">
              10 % OFF
            </Badge>
            <div className="absolute inset-0 bg-secondary-color opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
          </CardHeader>

          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium secondary-color text-base tracking-tight capitalize ">
              Advance CPA Marketing
            </h3>

            <div className="flex items-center gap-1 justify-end pb-1 ">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rating text-rating" />
              ))}
            </div>

            <div className="flex justify-between items-center gap-4 text-sm secondary-color">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>16 Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2 Months</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold primary-color">
                ৳ 6000
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ৳ 6000
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 justify-center">
            <Button className="">View Details</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CourseListCard;
