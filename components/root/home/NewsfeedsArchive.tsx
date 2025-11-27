"use client";

import SectionTitle from "@/components/common/SectionTitle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "Featured News",
    image: "/images/home/news1.png",
    link: "#",
  },
  {
    id: 2,
    title: "News Item 1",
    image: "/images/home/news2.png",
    link: "#",
  },
  {
    id: 3,
    title: "News Item 2",
    image: "/images/home/news3.png",
    link: "#",
  },
  {
    id: 4,
    title: "News Item 3",
    image: "/images/home/news4.png",
    link: "#",
  },
  {
    id: 5,
    title: "News Item 4",
    image: "/images/home/news5.png",
    link: "#",
  },
];

const NewsfeedsArchive = () => {
  return (
    <section className="py-8 md:py-14 bg-secondary/5">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="In the Newsfeeds Archive"
          subtitle={"Find previous news, insights, and important announcements"}
          iswhite={false}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Main Featured News */}
          <Link href={newsItems[0].link} className="group h-full ">
            <Card className="border border-secondary/30 py-0 overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <AspectRatio ratio={1 / 1} className="w-full relative">
                <Image
                  src={newsItems[0].image}
                  alt={newsItems[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </AspectRatio>
            </Card>
          </Link>

          {/* Other News Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {newsItems.slice(1).map((item) => (
              <Link key={item.id} href={item.link} className="group">
                <Card className="border border-secondary/30 py-0 overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl">
                  <AspectRatio ratio={1 / 1} className="w-full relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority
                    />
                  </AspectRatio>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild className="cursor-pointer flex items-center gap-2">
            <Link href="#">
              আরও পড়ুন
              <MoveRight className="w-5 h-5 animate-bounce" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsfeedsArchive;
