// components/RatingStars.tsx
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  starSize?: number;
}

const RatingStars = ({ rating = 0, maxStars = 5, starSize = 16 }: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, i) => {
        const ratingPercentage = rating - i;
        return (
          <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
            <Star 
              className="text-gray-300 absolute top-0 left-0" 
              style={{ width: starSize, height: starSize }} 
            />
            {ratingPercentage > 0 && (
              <Star
                className="text-yellow-400 absolute top-0 left-0 overflow-hidden"
                style={{ 
                  width: starSize, 
                  height: starSize,
                  clipPath: `inset(0 ${ratingPercentage < 1 ? (1 - ratingPercentage) * 100 : 0}% 0 0)` 
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;