"use client";

import { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { getStats, Pagination, Stats } from "@/apiServices/statsService";
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
import PagePagination from "@/components/common/Pagination";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const StatsData = () => {
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<Stats[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  const fetchStats = async () => {
    startTransition(async () => {
      try {
        const token = session?.accessToken; // or session?.user?.token if you stored it differently

        if (!token) {
          setError("No valid session or access token found.");
          return;
        }
        const params = {
          page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
          search: searchParams.get("search") ?? undefined,
          branch_id: searchParams.get("branch_id") ?? undefined,
          sort_order: searchParams.get("sort_order") ?? undefined,
          type: searchParams.get("type") ?? undefined,
          status: searchParams.get("status") ?? undefined,
        };

        const response = await getStats(token, params);
        if (response.success && response?.data?.stats) {
          setStats(response?.data?.stats ?? []);
          setPagination(response?.data?.pagination ?? null);
        } else {
          setError(response?.message || "Failed to fetch stats.");
          toast.error(response?.message || "Failed to fetch stats.");
        }
      } catch (err) {
        setError((err as Error).message);
      }
    });
  };

  useEffect(() => {
    fetchStats();
    // searchParams এর কোন পরিবর্তন হলে আবার fetch করবে
  }, [searchParams]);

  if (error) return <ErrorComponent message={error} />;

  if (!stats || stats.length === 0) {
    return <NotFoundComponent message="No stats found." />;
  }
  if (isPending) return <div className="text-center">Loading...</div>;

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {stats.map((statData: Stats, index: number) => (
              <TableRow key={statData?.id}>
                <TableCell>
                  {((pagination?.current_page ?? 1) - 1) *
                    (pagination?.per_page ?? 10) +
                    index +
                    1}
                </TableCell>
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
                          href={`/lms/stats/${statData?.id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/lms/stats/${statData?.id}/edit`}
                          className="flex items-center cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteButton id={statData?.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {statData?.title}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{statData?.count ?? "-"}</TableCell>
                <TableCell>
                  <Image
                    src={statData?.image || "/images/placeholder.png"}
                    alt={statData?.title}
                    width={40}
                    height={40}
                    className="object-cover rounded-md border"
                  />
                </TableCell>
                <TableCell>{statData?.branch?.name ?? "-"}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      statData?.status === 1 ? "bg-primary" : "bg-red-600"
                    }
                  >
                    {statData?.status === 1 ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && <PagePagination pagination={pagination} />}
    </>
  );
};
export default StatsData;
