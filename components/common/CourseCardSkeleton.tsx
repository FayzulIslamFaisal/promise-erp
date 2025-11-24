import { Book, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
interface Props {
  columns: number;
  rows: number;
}

const CourseCardSkeleton = ({ columns, rows }: Props) => {
  const total = columns * rows;
  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {[...Array(total)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="w-full h-48" />

          <CardContent className="p-5 space-y-4">
            {/* Title + Rating */}
            <div className="space-y-3">
              <Skeleton className="h-7 w-3/4" />

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-muted-foreground" />
                ))}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Book className="w-4 h-4" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Button */}
            <Skeleton className="w-full h-10" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default CourseCardSkeleton;
