// components/lms/who-can-join/WhoCanJoinData.tsx
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { getJoins, JoinType } from "@/apiServices/joinService";
import DeleteButton from "./DeleteButton";
import Pagination from "@/components/common/Pagination";

const WhoCanJoinData = async ({
  searchParams,
}: {
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
}) => {
  const resolvedSearchParams = await searchParams;

  const page =
    typeof resolvedSearchParams.page === "string"
      ? Number(resolvedSearchParams.page)
      : 1;

  const params = {
    search:
      typeof resolvedSearchParams.search === "string"
        ? resolvedSearchParams.search
        : undefined,
    status:
      typeof resolvedSearchParams.status === "string"
        ? resolvedSearchParams.status
        : undefined,
  };

  let results;

  try {
    results = await getJoins(page, params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const joins = results?.data?.joins || [];

  if (!joins.length) {
    return <NotFoundComponent message="No join options found." />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {joins.map((join: JoinType, index: number) => (
            <TableRow key={join?.id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
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
                        href={`/lms/who-can-join/${join?.id}/edit`}
                        className="flex items-center cursor-pointer"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Manage
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <DeleteButton id={join?.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              <TableCell className="font-medium">{join?.title}</TableCell>

              <TableCell>
                <Badge variant={join.status === 1 ? "outline" : "destructive"}>
                  {join.status === 1 ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Added */}
      {results?.data?.pagination && (
        <Pagination pagination={results.data.pagination} />
      )}
    </div>
  );
};

export default WhoCanJoinData;
