import ChaptersData from "@/components/lms/chapters/ChaptersData";
import ChapterFilterData from "@/components/lms/chapters/ChapterFilterData";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ChaptersPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    return (
        <div className="mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold tracking-tight">Chapters</h1>

                <Button asChild>
                    <Link href="/lms/chapters/add">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Chapter
                    </Link>
                </Button>
            </div>
            <Suspense fallback={<div>Loading filters...</div>}>
                <ChapterFilterData />
            </Suspense>

            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <ChaptersData searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
