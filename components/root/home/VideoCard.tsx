import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface VideoCardProps {
//   title: string;
  thumbnail: string;
  videoUrl: string;
  onPlay: () => void;
}

export const VideoCard = ({ thumbnail, onPlay }: VideoCardProps) => {
  return (
    <Card 
      className="relative py-0 overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-[1.02] border-0"
      onClick={onPlay}
    >
      <div className="relative w-full h-[250px] md:h-[340px] lg:h-[390px]">
        <Image
          src={thumbnail}
          alt={thumbnail}
            fill
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-video-overlay/40 group-hover:bg-video-overlay/60 transition-all duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary group-hover:bg-secondary group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg animate-pulse">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
          </div>
        </div>
      </div>
    </Card>
  );
};
