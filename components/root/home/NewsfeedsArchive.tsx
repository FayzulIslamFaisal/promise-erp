
import {  fetchPublicNewsFeeds, NewsFeedItem } from "@/apiServices/homePageService";
import SectionTitle from "@/components/common/SectionTitle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const NewsfeedsArchive =  async() => {

  const params = {
    per_page: 5,
    page: 1,
  };
  const newsData = await fetchPublicNewsFeeds({ params });
  const newsItems : NewsFeedItem[] = newsData?.data?.news_feeds || [];
  return (
    <section className="py-8 md:py-14 bg-secondary/5">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={newsData?.data?.section_title}
          subtitle={newsData?.data?.section_subtitle}
          iswhite={false}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Main Featured News */}
          <Link href={newsItems[0].news_link} className="group h-full ">
            <Card className="border border-secondary/30 py-0 overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <AspectRatio ratio={1 / 1} className="w-full relative">
                <Image
                  src={newsItems[0].image || "/images/placeholder_img.jpg"}
                  alt={newsItems[0].news_link}
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
              <Link key={item.id} href={item.news_link} className="group">
                <Card className="border border-secondary/30 py-0 overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl">
                  <AspectRatio ratio={1 / 1} className="w-full relative">
                    <Image
                      src={item.image || "/images/placeholder_img.jpg"}
                      alt={item.news_link}
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
