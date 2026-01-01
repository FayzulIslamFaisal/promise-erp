import { StDuePayments } from "@/apiServices/studentDashboardService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface DuePaymentsProps {
  duePayments: StDuePayments;
}
const DuePayments = ({ duePayments }: DuePaymentsProps) => {
  const payments = duePayments;
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-secondary">
            Due Payments
          </CardTitle>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white">
            Total ৳ {payments?.total_due}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {payments?.payments.map((payment, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div>
              <h3 className="font-semibold text-secondary">
                {payment.course_title}
              </h3>
              <p className="text-sm text-secondary">Due: {payment.due_date}</p>
            </div>
            <div className="text-lg font-bold text-secondary">
              ৳ {payment.amount}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DuePayments;
