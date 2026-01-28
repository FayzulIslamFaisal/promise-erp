import { Card, CardContent, CardHeader } from "@/components/ui/card";

const activities = [
  {
    title: "New student registration",
    meta: "Ahmed Khan • Branch A1 • 2 mins ago",
    color: "bg-primary",
  },
  {
    title: "Payment processed (৳45,000)",
    meta: "Batch 042 • S. Jesmin • 15 mins ago",
    color: "bg-secondary",
  },
  {
    title: "Offline batch created",
    meta: "Graphic Design • Branch C1 • 1 hour ago",
    color: "bg-orange-400",
  },
  {
    title: "New instructor onboarded",
    meta: "M. Kamal • Dhaka West • 3 hours ago",
    color: "bg-primary",
  },
];

const AdminRecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xs font-bold uppercase text-muted-foreground">
          Recent Activity
        </h3>
      </CardHeader>

      <CardContent className="space-y-4 max-h-[300px] overflow-y-auto">
        {activities.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className={`mt-1.5 h-2 w-2 rounded-full ${item.color}`} />
            <div>
              <p className="text-xs font-semibold">{item.title}</p>
              <p className="text-[11px] text-muted-foreground">{item.meta}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivity;
