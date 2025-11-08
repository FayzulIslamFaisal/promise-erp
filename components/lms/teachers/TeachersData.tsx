import { getTeachers } from "@/apiServices/teacherService";
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import Pagination from "@/components/common/Pagination";
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
import { Pencil } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function TeachersData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const params = {
    search:
      typeof searchParams.search === "string" ? searchParams.search : undefined,
    sort_order:
      typeof searchParams.sort_order === "string"
        ? searchParams.sort_order
        : undefined,
    is_paid:
      typeof searchParams.is_paid === "string" ? searchParams.is_paid : undefined,
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
    data = await getTeachers(page, params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const teachers = data.data.teachers;
  const pagination = data.data.pagination;

  if (teachers.length === 0) {
    return <NotFoundComponent message="No teachers found." />;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Organization</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {teachers.map((teacher, i) => (
              <TableRow key={teacher.id}>
                <TableCell>{i + 1}</TableCell>

                {/* 🔹 Action Dropdown */}
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
                          href={`/lms/teachers/${teacher.id}/edit`}
                          className="flex items-center cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteButton id={teacher?.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{teacher.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.bn_name}
                    </p>
                  </div>
                </TableCell>

                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>
                  {teacher.subscription_details?.name || "Free Plan"}
                </TableCell>
                <TableCell>
                  {teacher.is_paid ? (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      Paid
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-gray-200 text-gray-700"
                    >
                      Free
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{teacher.organization?.name || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination pagination={pagination} />
    </>
  );
}
