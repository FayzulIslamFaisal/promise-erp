import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminPerformanceTable = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          District / Branch Performance
        </h3>
        <Button variant="link" className="text-xs px-0">
          View Full Report
        </Button>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">District</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-center">Students</th>
              <th className="px-4 py-3 text-center">Courses</th>
              <th className="px-4 py-3 text-right">Revenue</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-3 font-medium">Dhaka Central</td>
              <td className="px-4 py-3">Branch A1</td>
              <td className="px-4 py-3 text-center">1,240</td>
              <td className="px-4 py-3 text-center">46</td>
              <td className="px-4 py-3 text-right font-bold text-primary">
                ৳1.85 কোটি
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium">Chattogram South</td>
              <td className="px-4 py-3">Branch C2</td>
              <td className="px-4 py-3 text-center">980</td>
              <td className="px-4 py-3 text-center">32</td>
              <td className="px-4 py-3 text-right font-bold text-primary">
                ৳1.21 কোটি
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium">Sylhet North</td>
              <td className="px-4 py-3">Branch S5</td>
              <td className="px-4 py-3 text-center">760</td>
              <td className="px-4 py-3 text-center">28</td>
              <td className="px-4 py-3 text-right font-bold text-primary">
                ৳0.98 কোটি
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium">Rajshahi West</td>
              <td className="px-4 py-3">Branch R1</td>
              <td className="px-4 py-3 text-center">620</td>
              <td className="px-4 py-3 text-center">21</td>
              <td className="px-4 py-3 text-right font-bold text-primary">
                ৳0.72 কোটি
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default AdminPerformanceTable;
