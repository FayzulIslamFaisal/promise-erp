import { Card, CardContent, CardHeader } from "@/components/ui/card";
const AdminOfflineBatchSnapshot = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xs font-bold uppercase text-muted-foreground">
          Offline Batch Snapshot
        </h3>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-2xl font-bold text-secondary">42</p>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">
            Running Batches
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span>Today Attendance</span>
              <span className="font-bold text-primary">88%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[88%] bg-primary" />
            </div>
          </div>

          <div className="flex justify-between text-xs">
            <span>Upcoming Batches (7 days)</span>
            <span className="font-bold">12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminOfflineBatchSnapshot;
