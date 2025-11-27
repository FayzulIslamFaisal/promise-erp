"use client";

import { useState } from "react";
import { Play, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

type HeroVideoData = {
  videoUrl: string;
  featureImage: string;
};

const HomeHeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const heroData: HeroVideoData = {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featureImage: "/images/home/hero-banner.png",
  };

  const videoUrl = heroData.videoUrl || "";
  const featureImage = heroData.featureImage || "/images/default.jpg";

  return (
    <section
      className="py-8 md:py-14 bg-secondary/5 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/images/home/hero-slider.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-secondary capitalize font-bold text-2xl md:text-4xl xl:text-6xl leading-normal">
              বাংলাদেশের সেরা অনলাইন ও অফলাইন কোর্সগুলো এক জায়গায়
            </h1>
            <p className="md:text-2xl text-xl font-medium text-black/75">
              শেখো নিজের গতিতে, অনলাইন ও অফলাইন ক্লাসে।
            </p>

            <div className="flex items-center gap-4 mt-6">
              <Button asChild className="flex items-center gap-2">
                <Link href="#">
                  কোর্স ব্রাউজ করুন
                  <MoveRight className="w-5 h-5 animate-bounce" />
                </Link>
              </Button>

              <Button asChild className="flex items-center gap-2">
                <Link href="#">
                  ফ্রি সেমিনার
                  <MoveRight className="w-5 h-5 animate-bounce" />
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT VIDEO */}
          <div className="relative w-full bg-secondary rounded-3xl shadow-2xl overflow-hidden group">
            <div className="relative w-full pt-[56.25%] bg-secondary">

              {/* VIDEO */}
              <div className="absolute inset-0">
                <ReactPlayer
                  url={videoUrl}             
                  playing={isPlaying}
                  controls={isPlaying}
                  width="100%"
                  height="100%"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>

              {/* OVERLAY */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0">
                    <Image
                      src={featureImage}
                      alt="Feature"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/30 transition-all"></div>

                  {/* PLAY BUTTON (1 LINE CLASSNAME) */}
                  <button
                    className="relative z-30 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:bg-secondary group-hover:scale-110 transition-all duration-300 animate-pulse"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
