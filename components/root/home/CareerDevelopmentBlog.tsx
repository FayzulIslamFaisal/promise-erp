import {
  BlogApiResponse,
  fetchPublicHomeBlog,
} from "@/apiServices/homePageService";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import SectionTitle from "@/components/common/SectionTitle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Calendar, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CareerDevelopmentBlog = async () => {

  const blogData: BlogApiResponse | null = await fetchPublicHomeBlog();
  const blogPosts = blogData?.data?.blogs || [];
  return (
    <section className="py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={blogData?.data?.section_title}
          subtitle={blogData?.data?.section_subtitle}
          iswhite={false}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {blogPosts && blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden h-full py-0 gap-0 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl shadow-md"
              >
                {/* Image Wrapper */}
                <AspectRatio ratio={11 / 6} className="w-full overflow-hidden">
                  <Image
                    src={post?.thumbnail || "/images/placeholder_img.jpg"}
                    alt={post.title || ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </AspectRatio>

                {/* Card Content */}
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  <Badge className="bg-primary text-white px-3 py-0 rounded-full text-sm">
                    {post?.category?.title}
                  </Badge>

                  <h3 className="text-base md:text-xl font-bold text-secondary leading-tight">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <div className="flex items-center font-normal gap-2 text-secondary text-base mt-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{post.published_at}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <NotFoundComponent message="No Blogs Found" />
          )}
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

export default CareerDevelopmentBlog;
