"use client";

import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { VideoPlayer } from "./VideoPlayer";

interface Video {
  id: number;

  thumbnail: string;
  videoUrl: string;
}

const VideoStoriesCard = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: 1,
      thumbnail:"/images/home/video-image1.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      thumbnail:"/images/home/video-image2.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 3,
      thumbnail:"/images/home/video-image3.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 4,
      thumbnail:"/images/home/video-image4.png",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            thumbnail={video.thumbnail}
            videoUrl={video.videoUrl}
            onPlay={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayer
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.videoUrl}
        />
      )}
    </>
  );
};

export default VideoStoriesCard;
