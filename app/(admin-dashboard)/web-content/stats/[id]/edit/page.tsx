import StatsForm from "@/components/web-content/stats/StatsForm";
import { getStatsById } from "@/apiServices/statsService";
import { getBranches } from "@/apiServices/branchService";

export default async function EditStatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const statsRes = await getStatsById(id);
  const branchesRes = await getBranches();
  const stats = statsRes?.data ?? {};
  const branches = branchesRes?.data?.branches ?? [];

  return (
    <StatsForm
      title="Edit Statistics"
      stats={stats}
      branches={branches}
    />
  );
}
