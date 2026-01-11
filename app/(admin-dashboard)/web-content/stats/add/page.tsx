import StatsForm from "@/components/web-content/stats/StatsForm";
import { getBranches } from "@/apiServices/branchService";

export default async function AddStatsPage() {
  const branchesRes = await getBranches();
  const branches = branchesRes?.data?.branches ?? [];

  return (
    <StatsForm
      title="Add New Statistics"
      branches={branches}
    />
  );
}
