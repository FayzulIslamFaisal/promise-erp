import { getLessons } from "@/apiServices/lessonService"; // This will be created later
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./DeleteButton"; // This will be created later
import Pagination from "@/components/common/Pagination";

export default async function LessonsData({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const resolvedSearchParams = await searchParams;
  const page =
    typeof resolvedSearchParams.page === "string" ? Number(resolvedSearchParams.page) : 1;

  const params = {
    search:
      typeof resolvedSearchParams.search === "string"
        ? resolvedSearchParams.search
        : undefined,
    sort_order:
      typeof resolvedSearchParams.sort_order === "string"
        ? resolvedSearchParams.sort_order
        : undefined,
    status:
      typeof resolvedSearchParams.status === "string"
        ? resolvedSearchParams.status
        : undefined,
    chapter_id:
      typeof resolvedSearchParams.chapter_id === "string"
        ? resolvedSearchParams.chapter_id
        : undefined,
    course_id:
      typeof resolvedSearchParams.course_id === "string"
        ? resolvedSearchParams.course_id
        : undefined,
    batch_id:
      typeof resolvedSearchParams.batch_id === "string"
        ? resolvedSearchParams.batch_id
        : undefined,
    type:
      typeof resolvedSearchParams.type === "string"
        ? resolvedSearchParams.type
        : undefined,
  };

  let data;
  try {
    data = await getLessons(page, params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const lessons = data.data.lessons;
  const pagination = data.data.pagination;

  if (lessons.length === 0) {
    return <NotFoundComponent message="No lessons found." />;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Video</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {lessons.map((lesson: any, i: number) => (
              <TableRow key={lesson?.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="text-center">
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

                    <DropdownMenuContent align="center">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/lms/lessons/${lesson?.id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/lms/lessons/${lesson?.id}/edit`}
                          className="flex items-center cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteButton id={lesson?.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {lesson?.title}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{lesson?.lm_chapter_name ?? "-"}</TableCell>
                <TableCell>{lesson?.course_name ?? "-"}</TableCell>
                <TableCell>{lesson?.type_text}</TableCell>
                <TableCell>{lesson?.duration}</TableCell>
                <TableCell>
                  {(() => {
                    const sanitizeVideoUrl = (url?: string) =>
                      typeof url === "string" ? url.replace(/[`\s]/g, "").trim() : "";
                    const url = sanitizeVideoUrl(lesson?.video_url);
                    return url ? (
                      <Link href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Open Video
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    );
                  })()}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      lesson?.status === 1 ? "bg-green-600" : "bg-red-600"
                    }
                  >
                    {lesson?.status === 1 ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination pagination={pagination} />
    </>
  );
}
