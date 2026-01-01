import HomeHeroSkeleton from "@/components/common/HomeHeroSkeleton";
import HighlightsSkeleton from "@/components/common/HighlightsSkeleton";
import CourseCategorySkeleton from "@/components/common/CourseCategorySkeleton";
import ServicesSkeleton from "@/components/common/ServicesSkeleton";

export default function Loading() {
    return (
        <>
            <HomeHeroSkeleton />
            <HighlightsSkeleton />
            <CourseCategorySkeleton />
            <ServicesSkeleton />
        </>
    );
}
