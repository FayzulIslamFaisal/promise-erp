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
import { Pencil } from "lucide-react";
import Link from "next/link";
import { CouponItem, getCoupons } from "@/apiServices/couponsService";
import DeleteButton from "./DeleteButton";
import Pagination from "@/components/common/Pagination";
import page from "@/app/(admin-dashboard)/hr/employees/page";

const CouponsData = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;

  const params: Record<string, unknown> = {};

  if (resolvedSearchParams.page) params.page = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page, 10) : 1;
  if (resolvedSearchParams.search) params.search = resolvedSearchParams.search;
  if (resolvedSearchParams.sort_order) params.sort_order = resolvedSearchParams.sort_order;
  if (resolvedSearchParams.status) params.status = resolvedSearchParams.status;
  if (resolvedSearchParams.course_id) params.course_id = resolvedSearchParams.course_id;

  let results;
  try {
    results = await getCoupons(params);
  } catch (error: unknown) {
    return <ErrorComponent message={error instanceof Error ? error.message : "An unexpected error occurred."} />;
  }

  const coupons = results?.data?.coupons || [];

  if (!coupons.length) {
    return <NotFoundComponent message="No coupons found." />;
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[50px] font-bold">Sl</TableHead>
            <TableHead className="font-bold">Action</TableHead>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Code</TableHead>
            <TableHead className="font-bold">Discount</TableHead>
            <TableHead className="font-bold">Used/Limit</TableHead>
            <TableHead className="font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coupons.map((coupon: CouponItem, index: number) => (
            <TableRow key={coupon.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Badge
                      variant="default"
                      className="cursor-pointer select-none px-3 py-1 hover:bg-primary/90"
                    >
                      Action
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/lms/coupons/${coupon.id}/edit`}
                        className="flex items-center cursor-pointer py-2"
                      >
                        <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                        Manage
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <DeleteButton id={coupon.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="font-semibold">{coupon.title}</TableCell>
              <TableCell>
                <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                  {coupon.coupon_code}
                </code>
              </TableCell>
              <TableCell>
                <span className="text-green-600 font-bold">{coupon.discount_percentage}%</span>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                {coupon.used_count} / {coupon.usage_limit}
              </TableCell>
              <TableCell>
                <Badge variant={coupon.status === 1 ? "outline" : "destructive"} className="rounded-full">
                  {coupon.status === 1 ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {results?.data?.pagination && (
        <div className="p-4 border-t bg-muted/20">
          <Pagination pagination={results.data.pagination} />
        </div>
      )}
    </div>
  );
};

export default CouponsData;
