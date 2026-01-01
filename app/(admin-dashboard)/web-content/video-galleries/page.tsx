import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";  
import VideoGalleryFilterData from "@/components/web-content/video-galleries/VideoGalleryFilterData";
import VideoGalleryData from "@/components/web-content/video-galleries/VideoGalleryData";  
const VideoGalleriesPage = ({
  searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Video Galleries</h1>
        <Button asChild>
            <Link href="/web-content/video-galleries/add">  
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Video Gallery
            </Link>
        </Button>
        </div>
        <Suspense fallback={<div>Loading Search...</div>}>
        <VideoGalleryFilterData />
      </Suspense>
      <Suspense fallback={<TableSkeleton columns={4} rows={8} />}>
        <VideoGalleryData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};  
export default VideoGalleriesPage;