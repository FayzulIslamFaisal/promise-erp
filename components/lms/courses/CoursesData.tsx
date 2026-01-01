import Image from "next/image";
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
import { Eye, Pencil, Trash2 } from "lucide-react";
import { getCourses } from "@/apiServices/courseService";
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import AssignBranchesButton from "./AssignBranchesButton";

export default async function CoursesData({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === "string" ? Number(resolvedSearchParams.page) : 1;

  const params = {
    search: typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : undefined,
    sort_order: typeof resolvedSearchParams.sort_order === "string" ? resolvedSearchParams.sort_order : undefined,
    // level: typeof resolvedSearchParams.level === "string" ? resolvedSearchParams.level : undefined,
    division_id: typeof resolvedSearchParams.division_id === "string" ? resolvedSearchParams.division_id : undefined,
    branch_id: typeof resolvedSearchParams.branch_id === "string" ? resolvedSearchParams.branch_id : undefined,
    category_id: typeof resolvedSearchParams.category_id === "string" ? resolvedSearchParams.category_id : undefined,
  };

  let data;
  try {
    console.log("Fetching courses with params:", params, "and page:", page);
    data = await getCourses(page, params);
    console.log("Courses Data:", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const courses = data.data.courses;
  const pagination = data.data.pagination;

  if (courses.length === 0) {
    return <NotFoundComponent message="No courses found." />;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="text-center">#</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead className="text-center">Course</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Ratings</TableHead>
              <TableHead className="text-center">Enrolled</TableHead>
              <TableHead className="text-center">Branches</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course.id}>
                <TableCell className="text-center">{index + 1}</TableCell>

                {/* Action Dropdown */}
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
                        <Link href={`/lms/courses/${course.id}`}>
                          <Eye className="mr-2 h-4 w-4" /> Details
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href={`/lms/courses/${course.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" /> Manage
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <DeleteButton id={course.id} />
                      </DropdownMenuItem>

                      <AssignBranchesButton
                        courseId={String(course.id)}
                        initialAssignedBranches={course.branches}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                {/* 🔹 Course Info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-md border">
                      <Image
                        src={course.featured_image || "/images/placeholder_img.jpg"}
                        alt={course.title}
                        height={80}
                        width={100}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      {course.latest_batch && (
                        <p className="text-xs text-blue-600 font-semibold mt-1">
                          Latest: {course.latest_batch.name}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-end">
                  <small>
                    <del>{course.price} ৳</del>
                  </small>{" "}
                  <br />
                  {(Number(course.price) - Number(course.discount)).toFixed(2)} ৳
                </TableCell>

                <TableCell className="text-center">{course.category?.name || "N/A"}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{course.ratings || "0.00"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-end">{course.total_enrolled}</TableCell>
                <TableCell className="text-end">{course.branch_count || 0}</TableCell>

                <TableCell className="text-center">
                  {course.status === "Published" ? (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      Published
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-gray-200 text-gray-700"
                    >
                      {course.status}
                    </Badge>
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
