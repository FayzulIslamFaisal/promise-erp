import { Card, CardContent, CardHeader } from "@/components/ui/card";
const AdminModeProgress = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-sm font-bold uppercase text-muted-foreground">
          Online vs Offline Delivery
        </h3>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Online */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium">Online Courses</span>
            <span className="font-bold text-primary">82%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[82%] bg-primary" />
          </div>
        </div>

        {/* Offline */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium">Offline Courses</span>
            <span className="font-bold text-secondary">18%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[18%] bg-secondary" />
          </div>
        </div>

        {/* Insight */}
        <div className="pt-2 border-t text-[11px] text-muted-foreground">
          Majority of enrollments are driven by online programs,
          indicating strong digital adoption nationwide.
        </div>
      </CardContent>
    </Card>

  )
}

export default AdminModeProgress
