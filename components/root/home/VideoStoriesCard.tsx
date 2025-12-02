
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Video {
  id: number;
  thumbnail: string;
  videoUrl: string;
}

const VideoStoriesCard = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const videos: Video[] = [
    {
      id: 1,
      thumbnail: "/images/home/video-image1.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      thumbnail: "/images/home/video-image2.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 3,
      thumbnail: "/images/home/video-image3.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 4,
      thumbnail: "/images/home/video-image4.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video) => {
        const isPlaying = selectedVideo === video.id;

        return (
          <div
            key={video.id}
            className="relative overflow-hidden group rounded-2xl duration-500 hover:-translate-y-2"
          >
            {isPlaying ? (
              <ReactPlayer
                className="aspect-video"
                src={video.videoUrl}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                onPause={() => setSelectedVideo(null)}
              />
            ) : (
              <div
                className="relative w-full h-full aspect-video cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                {/* THUMBNAIL */}
                <Image
                  src={video.thumbnail}
                  alt="Video Thumbnail"
                  fill
                  className="object-cover"
                />

                {/* OVERLAY EFFECT */}
                <div className="absolute inset-0 group-hover:bg-secondary/20 transition-all rounded-2xl"></div>

                {/* PLAY BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <button
                    className="video-play-btn animate-pulse"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VideoStoriesCard;

