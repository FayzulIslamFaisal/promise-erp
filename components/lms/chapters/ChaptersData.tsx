import { getChapters } from "@/apiServices/chaptersService";
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
import Pagination from "@/components/common/Pagination";
import DeleteButton from "@/components/lms/chapters/DeleteButton";


// Type of search params
type SearchParams = Record<string, string | string[] | undefined>;

export default async function ChaptersData({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const paramsObj = await searchParams;

    const page = typeof paramsObj.page === "string" ? Number(paramsObj.page) : 1;

    const params = {
        search: typeof paramsObj.search === "string" ? paramsObj.search : undefined,

        sort_order: typeof paramsObj.sort_order === "string" ? paramsObj.sort_order : "desc",

        division_id:
            typeof paramsObj.division_id === "string"
                ? paramsObj.division_id
                : undefined,

        district_id:
            typeof paramsObj.district_id === "string"
                ? paramsObj.district_id
                : undefined,

        branch_id:
            typeof paramsObj.branch_id === "string"
                ? paramsObj.branch_id
                : undefined,

        course_id:
            typeof paramsObj.course_id === "string"
                ? paramsObj.course_id
                : undefined,

        batch_id:
            typeof paramsObj.batch_id === "string"
                ? paramsObj.batch_id
                : undefined,

        status:
            typeof paramsObj.status === "string" ? paramsObj.status : undefined,

        per_page: 15,
        page,
    };

    let data;

    try {
        data = await getChapters(page, params);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return <ErrorComponent message={error.message} />;
        }
        return <ErrorComponent message="An unexpected error occurred." />;
    }

    const chapters = data?.data?.chapters ?? [];
    const pagination = data?.data?.pagination;

    if (!chapters.length) {
        return <NotFoundComponent message={data?.message} title="Chapter List" />;
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
                            <TableHead>Course</TableHead>
                            <TableHead>Batch</TableHead>
                            <TableHead>Branch</TableHead>
                            <TableHead>Lessons</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {chapters.map((chapter: any, index: number) => (
                            <TableRow key={chapter.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Badge variant="default" className="cursor-pointer">
                                                Action
                                            </Badge>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="center">
                                              

                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/lms/chapters/${chapter.id}/edit`}
                                                    className="flex items-center"
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Manage
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <DeleteButton id={chapter?.id} />
                                            </DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                                <TableCell>{chapter.title}</TableCell>
                                <TableCell>{chapter.course?.title ?? "—"}</TableCell>
                                <TableCell>{chapter.batch?.name ?? "—"}</TableCell>
                                <TableCell>{chapter.branch?.name ?? "—"}</TableCell>
                                <TableCell>{chapter.lessons_count}</TableCell>

                                <TableCell>
                                    {chapter.status === 1 ? (
                                        <Badge className="bg-green-600">Active</Badge>
                                    ) : (
                                        <Badge variant="destructive">Inactive</Badge>
                                    )}
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
