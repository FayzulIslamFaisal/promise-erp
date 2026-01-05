
import { getBatches } from "@/apiServices/batchService";
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
import DeleteButton from "./DeleteBatchButton";
import Pagination from "@/components/common/Pagination";

export default async function BatchesData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const params = {
    page,
    search:
      typeof searchParams.search === "string"
        ? searchParams.search
        : undefined,
    sort_order:
      typeof searchParams.sort_order === "string"
        ? searchParams.sort_order
        : "desc",
    division_id:
      typeof searchParams.division_id === "string"
        ? searchParams.division_id
        : undefined,
    district_id:
      typeof searchParams.district_id === "string"
        ? searchParams.district_id
        : undefined,
    branch_id:
      typeof searchParams.branch_id === "string"
        ? searchParams.branch_id
        : undefined,
    course_id:
      typeof searchParams.course_id === "string"
        ? searchParams.course_id
        : undefined,
    is_online:
      typeof searchParams.is_online === "string"
        ? searchParams.is_online
        : undefined,
    is_offline:
      typeof searchParams.is_offline === "string"
        ? searchParams.is_offline
        : undefined,
    per_page: 15
  };

  let data;
  try {
    data = await getBatches(params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const batches = data?.data?.batches;
  const paginationData = data?.data?.pagination;

  if (batches.length === 0) {
    return <NotFoundComponent message={data?.message} title="Batch List" />;
  }

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead className="text-center w-[100px]">Action</TableHead>
              <TableHead className="min-w-[150px]">Batch Name</TableHead>
              <TableHead className="min-w-[200px]">Course</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Discount</TableHead>
              <TableHead className="text-right">Final Price</TableHead>
              <TableHead className="text-center">Enrolled</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {batches.map((batch, i) => (
              <TableRow key={batch?.id}>
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
                          href={`/lms/batches/${batch?.id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/lms/batches/${batch?.id}/edit`}
                          className="flex items-center cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Manage
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteButton id={batch?.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="font-medium">{batch.name}</TableCell>
                <TableCell>{batch.course?.title}</TableCell>
                <TableCell>{batch?.branch?.name || "N/A"}</TableCell>
                <TableCell className="text-right">{batch.price}</TableCell>
                <TableCell className="text-right">
                  {batch.discount_type === "percentage"
                    ? `${batch.discount}%`
                    : batch.discount || "0"}
                </TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  {batch.after_discount}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{batch.total_enrolled || 0}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">{batch.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {
        paginationData &&  (
          <div className="mt-4">
            <Pagination pagination={paginationData} />
          </div>
        )
      }

    </>
  );
}
