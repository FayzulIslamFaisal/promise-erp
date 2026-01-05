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

import { getReviews, Review } from "@/apiServices/reviewService";
import DeleteButton from "./DeleteButton";
import Pagination from "@/components/common/Pagination";

const ReviewsData = async ({
  searchParams,
}: {
 searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const resolvedSearchParams = await searchParams;

  const page =
    typeof resolvedSearchParams?.page === "string"
      ? Number(resolvedSearchParams.page)
      : 1;

  const params = {
    page,
    search:
      typeof resolvedSearchParams?.search === "string"
        ? resolvedSearchParams.search
        : undefined,
    status:
      typeof resolvedSearchParams?.status === "string"
        ? resolvedSearchParams.status
        : undefined,
    is_featured:
      typeof resolvedSearchParams?.is_featured === "string"
        ? resolvedSearchParams.is_featured
        : undefined,
  };

  let results;
  try {
    results = await getReviews( params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const reviews: Review[] = results?.data?.reviews || [];
  const pagination = results?.data?.pagination;

  if (!reviews.length) {
    return <NotFoundComponent message={results?.message} title="Review List" />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviews.map((review: Review, index: number) => (
            <TableRow key={review.id}>
              <TableCell>{(page - 1) * 15 + (index + 1)}</TableCell>

              {/* ACTION */}
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
                        href={`/lms/reviews/${review.id}/edit`}
                        className="flex items-center cursor-pointer"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Manage
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <DeleteButton id={review.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              {/* USER */}
              <TableCell className="font-medium">
                {review.user?.name}
              </TableCell>

              {/* COURSE */}
              <TableCell className="font-medium">
                {review.course?.title}
              </TableCell>

              {/* BATCH */}
              <TableCell className="font-medium">
                {review.batch?.name ?? "No Batch"}
              </TableCell>

              {/* RATING */}
              <TableCell>{review.rating} ⭐</TableCell>

              {/* FEEDBACK */}
              <TableCell className="max-w-[250px] truncate">
                {review.feedback}
              </TableCell>

              {/* STATUS */}
              <TableCell>
                <Badge
                  variant={review.status === 1 ? "default" : "destructive"}
                >
                  {review.status === 1 ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              {/* FEATURED */}
              <TableCell>
                <Badge
                  variant={review.is_featured === 1 ? "default" : "outline"}
                >
                  {review.is_featured === 1 ? "Featured" : "Normal"}
                </Badge>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
       {pagination && (
              <Pagination pagination={pagination} />
            )}
    </div>
    
  );
};

export default ReviewsData;
