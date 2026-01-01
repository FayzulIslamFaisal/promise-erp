"use client";
import { CourseCategory } from "@/apiServices/studentDashboardService";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryPillProps {
  category: CourseCategory;
}
export default function CategoryPill({ category }: CategoryPillProps) {
  const { name, image, slug } = category;
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeSlug = searchParams.get("category_slug");
  const isActive = activeSlug === slug;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isActive) {
      params.delete("category_slug");
    } else {
      params.set("category_slug", slug);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-4 py-6 ${isActive ? "bg-primary" : "bg-secondary"} rounded-2xl`}
    >
      <div className="bg-white text-primary rounded-full w-12 h-12 flex items-center justify-center">
        <Image
          src={image || "/images/placeholder_img.jpg"}
          alt={name}
          width={68}
          height={68}
          className="object-cover rounded-md"
        />
      </div>
      <span className="font-medium text-white text-lg">{name}</span>
    </div>
  );
}
