"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Funnel } from "lucide-react";
import { getPublicBranchList, HeaderBranchList } from "@/apiServices/homePageService";
import { useRouter, useSearchParams } from "next/navigation";

const HeaderBranchDropdown = () => {
  const [branchList, setBranchList] = useState<HeaderBranchList[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch branches with startTransition
  useEffect(() => {
    startTransition(() => {
      const fetchBranchList = async () => {
        try {
          const res = await getPublicBranchList();
          if (res.success) {
            setBranchList(Array.isArray(res?.data?.branches) ? res.data.branches : []);

            // Set default selected branch from query params
            const branchParam = searchParams.get("branch_id");
            if (branchParam) setSelectedBranch(parseInt(branchParam));
          }
        } catch (err) {
          console.error("Failed to fetch branch list:", err);
        }
      };
      fetchBranchList();
    });
  }, [searchParams]);

  const handleBranchSelect = (branchId: number) => {
    setSelectedBranch(branchId);
    startTransition(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("branch_id", branchId.toString());
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="header-branch-filter-btn h-8 px-4 gap-2 bg-transparent hover:bg-transparent border-0">
          <span className="text-base flex items-center gap-2 text-secondary">
            <Funnel className="h-4 w-4" />{" "}
            {selectedBranch && Array.isArray(branchList)
              ? branchList.find((b) => b.id === selectedBranch)?.name
              : "Branch"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid grid-cols-2 gap-1 p-4 w-full">
        {isPending ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => handleBranchSelect(1)}
              className={selectedBranch === 1 ? "bg-muted" : ""}
            >
              All Branches
            </DropdownMenuItem>
            {branchList.map((branch) => (
              <DropdownMenuItem
                key={branch.id}
                onClick={() => handleBranchSelect(branch.id)}
                className={selectedBranch === branch.id ? "bg-muted" : ""}
              >
                {branch.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderBranchDropdown;

