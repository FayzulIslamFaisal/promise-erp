import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { getVideoGalleries, VideoGallery } from "@/apiServices/homePageAdminService";
import DeleteButton from "./DeleteButton";
import Image from "next/image";
import Pagination from "@/components/common/Pagination";

const VideoGalleryData = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) => {
    const resolvedSearchParams = await searchParams;
    const page = typeof resolvedSearchParams.page === "string" ? Number(resolvedSearchParams.page) : 1;
    const params = {
        search:
            typeof resolvedSearchParams.search === "string"
                ? resolvedSearchParams.search
                : undefined,
        type:
            typeof resolvedSearchParams.type === "string"
                ? resolvedSearchParams.type
                : undefined,
        status:
            typeof resolvedSearchParams.status === "string"
                ? resolvedSearchParams.status
                : undefined,
        sort_by:
            typeof resolvedSearchParams.sort_by === "string"
                ? resolvedSearchParams.sort_by
                : "created_at",
        sort_order:
            typeof resolvedSearchParams.sort_order === "string"
                ? resolvedSearchParams.sort_order
                : "desc",
        per_page: 15
    };

    let results;
    try {
        results = await getVideoGalleries(page, params);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return <ErrorComponent message={error.message} />;
        } else {
            return <ErrorComponent message="An unexpected error occurred." />;
        }
    }

    const videoGalleries = results?.data?.video_galleries || [];
    const pagination = results?.data?.pagination;

    if (!videoGalleries.length) {
        return <NotFoundComponent message="No video galleries found." />;
    }

    const getYouTubeThumbnail = (url: string | null | undefined) => {
        if (!url) return null;
        try {
            const urlObj = new URL(url);
            let videoId = urlObj.searchParams.get("v");
            if (!videoId && urlObj.hostname === "youtu.be") {
                videoId = urlObj.pathname.slice(1);
            }
            return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
        } catch {
            return null;
        }
    };

    return (
        <>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Sl</TableHead>
                            <TableHead>Thumbnail</TableHead>
                            <TableHead>YouTube Link</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videoGalleries.map((item: VideoGallery, index: number) => {
                            const youtubeThumbnail = getYouTubeThumbnail(item.youtube_link);
                            const displayThumbnail = item.thumbnail_image || youtubeThumbnail;

                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{(page - 1) * 15 + index + 1}</TableCell>
                                    <TableCell>
                                        {displayThumbnail ? (
                                            <div className="relative h-12 w-20 border rounded overflow-hidden">
                                                <Image
                                                    src={displayThumbnail}
                                                    alt={`Video ${item.id}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-12 w-20 bg-muted border rounded flex items-center justify-center text-[10px] text-muted-foreground">
                                                No Image
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-[300px] truncate">
                                        <a href={item.youtube_link || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            {item.youtube_link}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {item.type === 1 ? "Success" : "Video"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 1 ? "outline" : "destructive"}>
                                            {item.status === 1 ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Badge
                                                    variant="default"
                                                    role="button"
                                                    tabIndex={0}
                                                    className="cursor-pointer select-none"
                                                >
                                                    Action
                                                </Badge>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/web-content/video-galleries/${item.id}/edit`}
                                                        className="flex items-center cursor-pointer w-full"
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Manage
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                    <DeleteButton id={item.id} />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            {pagination && (
                <div className="mt-4">
                    <Pagination pagination={pagination} />
                </div>
            )}
        </>
    );
};

export default VideoGalleryData;
