"use client";
import { useEffect, useState, useTransition } from "react";
const StatsForm = dynamic(() => import('@/components/web-content/stats/StatsForm'), {
  ssr: false,
});
import { Branch, BranchResponse, getBranches } from "@/apiServices/branchService";
import dynamic from "next/dynamic";

const StatsAddWrapper = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res:BranchResponse = await getBranches({ per_page: 100 });
        setBranches(res?.data?.branches ?? []);
      } catch (error) {
        console.error("Failed to load branches", error);
      }
    });
  }, []);
  return (
    <StatsForm
      title="Add New Statistics"
      branches={branches}
      loading={isPending}
    />
  )
}

export default StatsAddWrapper
