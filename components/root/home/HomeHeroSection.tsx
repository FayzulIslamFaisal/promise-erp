"use client";

import { useState } from "react";
import { Play, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

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

  const videoUrl = heroData.videoUrl;
  const featureImage = heroData.featureImage;

  return (
    <section
      className="bg-secondary/5 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/images/home/hero-slider.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center pe-0 lg:pe-4 py-8 lg:py-0">
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

              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <Link href="#">
                  ফ্রি সেমিনার
                  <MoveRight className="w-5 h-5 animate-bounce" />
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT VIDEO */}
          <div
            className="group py-14 md:py-18 "
            style={{
              backgroundImage: 'url("/images/home/hero-video-bg-image.png")',
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="rounded-2xl overflow-hidden border-6 border-white relative">
              <ReactPlayer
                className="aspect-video"
                src={videoUrl}
                playing={isPlaying}
                controls={isPlaying}
                width="100%"
                height="100%"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {!isPlaying && (
                <div
                  className="flex items-center justify-center cursor-pointer absolute inset-0"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={featureImage}
                      alt="Feature"
                      fill
                      className="object-cover"
                    />
                    <div className="flex items-center justify-center h-full">
                      <button
                        className="video-play-btn animate-pulse"
                        aria-label="Play video"
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10" />
                      </button>
                    </div>
                    <div className=" absolute inset-0  group-hover:bg-secondary/20 transition-all"></div>
                  </div>
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
