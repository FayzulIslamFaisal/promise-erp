import { Blog } from "@/apiServices/homePageService";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardItemsProps {
  post: Blog;
}
const BlogCardItems = ({post}:BlogCardItemsProps) => {
  return (
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
  );
};

export default BlogCardItems;
