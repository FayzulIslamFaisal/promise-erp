import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BadgeCheck, Clock } from "lucide-react";

const AdminCertificateStatus = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xs font-bold uppercase text-muted-foreground">
          Certificates Status
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">Issued Today</span>
          </div>
          <span className="text-lg font-bold">158</span>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-orange-500" />
            <span className="text-xs font-medium">Pending Approval</span>
          </div>
          <span className="text-lg font-bold">42</span>
        </div>

        <button className="w-full rounded-md bg-muted py-2 text-xs font-bold hover:bg-muted/80">
          Go to Verification Center
        </button>
      </CardContent>
    </Card>
  );
};

export default AdminCertificateStatus;
