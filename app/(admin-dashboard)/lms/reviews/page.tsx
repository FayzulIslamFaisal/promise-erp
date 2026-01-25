// ReviewsPage.tsx

import TableSkeleton from "@/components/TableSkeleton";
import NextAuthGuardWrapper from "@/components/auth/NextAuthGuardWrapper";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import ReviewsFilterData from "@/components/lms/reviews/ReviewsFilterData";
import ReviewsData from "@/components/lms/reviews/ReviewsData";

const ReviewsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  return (
    <NextAuthGuardWrapper requiredPermissions={["view-reviews"]}>
      <div className="mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Reviews</h1>

          <Button asChild>
            <Link href="/lms/reviews/add">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Review
            </Link>
          </Button>
        </div>

        {/* Filter section */}
        <Suspense fallback={<div>Loading Filters...</div>}>
          <ReviewsFilterData />
        </Suspense>

        {/* Data Table */}
        <Suspense fallback={<TableSkeleton columns={9} rows={8} />}>
          <ReviewsData searchParams={params} />
        </Suspense>
      </div>
    </NextAuthGuardWrapper>
  );
};

export default ReviewsPage;
