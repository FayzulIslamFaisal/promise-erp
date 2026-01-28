import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, CreditCard, Clock } from "lucide-react";
const AdminCriticalAlert = () => {
  return (
    <Card className="border-red-200 bg-red-50/60 dark:bg-red-950/30">
      <CardHeader>
        <h3 className="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-400">
          <AlertTriangle className="h-4 w-4" />
          Critical Attention Required
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex gap-3 rounded-lg border border-red-200 bg-background p-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-red-700">
              Low Enrollment Warning
            </p>
            <p className="text-[11px] text-muted-foreground">
              Rangpur Branch B04 has enrollment below <b>10%</b> for the current
              month.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-orange-200 bg-background p-3">
          <CreditCard className="h-5 w-5 text-orange-500 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-orange-700">
              Pending Government Payments
            </p>
            <p className="text-[11px] text-muted-foreground">
              12 government invoices pending approval for the last quarter.
            </p>
          </div>
        </div>


        <div className="flex gap-3 rounded-lg border border-red-200 bg-background p-3">
          <Clock className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-red-700">
              Course Batch Expiry
            </p>
            <p className="text-[11px] text-muted-foreground">
              “Cyber Security Essentials” batch will expire within
              <b> 48 hours</b>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCriticalAlert;
