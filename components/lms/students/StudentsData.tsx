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
import ExportData from "./ExportData";

export default async function StudentsData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const params = {
    search:
      typeof searchParams.search === "string"
        ? searchParams.search
        : undefined,
    sort_order:
      typeof searchParams.sort_order === "string"
        ? searchParams.sort_order
        : undefined,
    is_paid:
      typeof searchParams.is_paid === "string"
        ? searchParams.is_paid
        : undefined,
    is_blocked:
      typeof searchParams.is_blocked === "string"
        ? searchParams.is_blocked
        : undefined,
    division_id:
      typeof searchParams.division_id === "string"
        ? searchParams.division_id
        : undefined,
    branch_id:
      typeof searchParams.branch_id === "string"
        ? searchParams.branch_id
        : undefined,
    course_id:
      typeof searchParams.course_id === "string"
        ? searchParams.course_id
        : undefined,
  };

  let data;
  try {
    data = await getStudents(page, params);
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
      {/* <div className="flex justify-end mb-4">
        <ExportData data={students} />
      </div> */}
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
              <TableHead>Enrolled Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student, i) => (
              <TableRow key={student?.id}>
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
                  {student?.enrollment_status === "Enrolled" ? (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      Enrolled
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-gray-200 text-gray-700"
                    >
                      {student?.enrollment_status}
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
