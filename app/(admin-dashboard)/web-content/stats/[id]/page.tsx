import { getStatsById } from "@/apiServices/statsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function StatsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const statsRes = await getStatsById(id);
  const stats = statsRes?.data ?? {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>{stats.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>Title:</strong> {stats.title}
        </p>
        <p>
          <strong>Count:</strong> {stats.count}
        </p>
        <p>
          <strong>Image:</strong> {stats.image}
        </p>
        <p>
          <strong>Status:</strong> {stats.status}
        </p>
      </CardContent>
    </Card>
  );
}
