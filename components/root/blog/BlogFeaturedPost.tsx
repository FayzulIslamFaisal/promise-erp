import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
interface BlogFeaturedPost {
  image: string;
  title: string;
  excerpt: string;
  category?: string;
  author: string;
  date: string;
  buttonText: string;
}
const blogPosts: BlogFeaturedPost = {
  image: "/images/placeholder_img.jpg",
  title: "ডিজিটাল মার্কেটিং এর ভবিষ্যৎ: ২০২৬ সালে কী আশা করা যায়",
  excerpt:
    "ডিজিটাল মার্কেটিং দ্রুত পরিবর্তন হচ্ছে। AI, অটোমেশন এবং নতুন প্রযুক্তি কিভাবে মার্কেটিং কৌশল পরিবর্তন করছে তা জানুন।",
  category: "Digital Marketing",
  author: "নাফিসা রহমান",
  date: "২০ জুলাই ২০২৬",
  buttonText: "Read More",
};

const BlogFeaturedPost = () => {
  return (
    <div>
      <Card className="shadow py-0 border-0">
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <AspectRatio ratio={14 / 9} className="rounded-lg">
            <Image
              src={blogPosts.image}
              alt={blogPosts.title}
              layout="fill"
              objectFit="cover "
              className="rounded-tl-lg rounded-bl-lg"
            />
          </AspectRatio>

          {/* Content Section */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <Badge className="w-fit mb-4 text-base font-semibold">
              {blogPosts.category}
            </Badge>

            <h2 className="text-xl lg:text-3xl font-bold text-secondary mb-3 leading-normal">
              {blogPosts.title}
            </h2>

            <p className="text-black/60 mb-4 text-base">{blogPosts.excerpt}</p>

            <div className="flex items-center gap-4 text-base text-secondary mb-4">
              <span className="flex items-center gap-1.5 font-medium ">
                <User className="h-5 w-5" />
                {blogPosts.author}
              </span>
              <span className="flex items-center gap-1.5 font-medium ">
                <Calendar className="h-5 w-5" />
                {blogPosts.date}
              </span>
            </div>

            <Button className="w-fit">{blogPosts.buttonText}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogFeaturedPost;
