// components/RatingStars.tsx
import { Star } from "lucide-react";
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  starSize?: number;
}

const RatingStars = ({ rating = 0, maxStars = 5, starSize = 4 }: RatingStarsProps) => {
  
  return (
    <div className="flex gap-1 mt-1">
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          className={cn(`w-${starSize} h-${starSize}`, i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
        />
      ))}
    </div>
  );
};

export default RatingStars;