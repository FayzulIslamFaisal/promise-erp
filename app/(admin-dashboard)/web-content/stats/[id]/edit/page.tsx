import StatsForm from "@/components/web-content/stats/StatsForm";
import { getStatsById } from "@/apiServices/statsService";

export default async function EditStatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const statsRes = await getStatsById(id);
  const stats = statsRes?.data ?? {};

  return (
    <StatsForm
      title="Edit Statistics"
      stats={stats}
    />
  );
}
