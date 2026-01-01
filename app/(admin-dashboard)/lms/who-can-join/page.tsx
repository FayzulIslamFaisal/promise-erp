import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import WhoCanJoinData from "@/components/lms/who-can-join/WhoCanJoinData";
import JoinFilterData from "@/components/lms/who-can-join/JoinFilterData";

const WhoCanJoinPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Who Can Join</h1>

        <Button asChild>
          <Link href="/lms/who-can-join/add">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Join
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading Filter...</div>}>
        <JoinFilterData />
      </Suspense>

      <Suspense fallback={<TableSkeleton columns={4} rows={8} />}>
        <WhoCanJoinData searchParams={params} />
      </Suspense>
    </div>
  );
};

export default WhoCanJoinPage;
