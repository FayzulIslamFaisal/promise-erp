import { getStudents } from "@/apiServices/studentService";
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
import DeleteButton from "./DeleteButton";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Pagination from "@/components/common/Pagination";

export default async function StudentsData({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const resolvedSearchParams = await searchParams;
  const page =
    typeof resolvedSearchParams.page === "string" ? Number(resolvedSearchParams.page) : 1;

  const params = {
    page,
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
    is_govt:
      typeof resolvedSearchParams.is_govt === "string"
        ? resolvedSearchParams.is_govt
        : undefined,
    is_blocked:
      typeof resolvedSearchParams.is_blocked === "string"
        ? resolvedSearchParams.is_blocked
        : undefined,
    division_id:
      typeof resolvedSearchParams.division_id === "string"
        ? resolvedSearchParams.division_id
        : undefined,
    branch_id:
      typeof resolvedSearchParams.branch_id === "string"
        ? resolvedSearchParams.branch_id
        : undefined,
    course_id:
      typeof resolvedSearchParams.course_id === "string"
        ? resolvedSearchParams.course_id
        : undefined,
  };

  let data;
  try {
    data = await getStudents(params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const students = data.data.students;
  const pagination = data.data.pagination;

  if (students.length === 0) {
    return <NotFoundComponent message="No students found." />;
  }

  return (
    <>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Name & Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Courses & Batches</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Divisions</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student, i) => (
              <TableRow key={student?.id}>
                <TableCell>{(page - 1) * 15 + (i + 1)}</TableCell>
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
                          href={`/lms/students/${student?.id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/lms/students/${student?.id}/edit`}
                          className="flex items-center cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Manage
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteButton id={student?.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8 bg-gray-300 rounded-full overflow-hidden">
                      <AvatarImage
                        src={student?.profile_image || "/images/profile_avatar.png"}
                        alt={student?.name}
                      />
                      {/* <AvatarFallback className="text-lg font-semibold bg-primary-custom p-1">
                        {student?.name
                          ? student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                          : "NA"}
                      </AvatarFallback> */}
                    </Avatar>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {student?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student?.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{student?.phone}</TableCell>
                <TableCell>
                  {student?.courses?.map((course, index) => (
                    <span key={index}>
                      {course.title} - {course.batch},
                      <br />
                    </span>
                  ))}
                </TableCell>
                <TableCell>{student?.branches}</TableCell>
                <TableCell>{student?.divisions}</TableCell>
                <TableCell>
                  {student?.status === "PAID_COURSE_ENROLLED" ? (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      PAID_COURSE_ENROLLED
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-gray-200 text-gray-700"
                    >
                      {student?.status}
                    </Badge>
                  )}
                  <br />
                  {student?.is_govt ? (
                    <Badge className="bg-blue-600 hover:bg-blue-700 mt-1">
                      Govt
                    </Badge>
                  ) : null}
                  <br />
                  {student?.is_blocked ? (
                    <Badge className="bg-red-600 hover:bg-red-700 mt-1">
                      Blocked
                    </Badge>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {
        pagination && (
          <div className="mt-4">
            <Pagination pagination={pagination} />
          </div>
        )
      }

    </>
  );
}
