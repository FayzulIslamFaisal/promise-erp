// app/lms/lessons/page.tsx
import LessonsData from "@/components/lms/lessons/LessonsData";
import LessonFilterData from "@/components/lms/lessons/LessonFilterData";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Lessons</h1>
        <Button asChild>
          <Link href="/lms/lessons/add">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Lesson
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <LessonFilterData />
      </Suspense>

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <LessonsData searchParams={params} />
      </Suspense>
    </div>
  );
}
