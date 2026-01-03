import Image from "next/image";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  // CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getCourseWiseDuePayments } from "@/apiServices/studentDashboardService";
// import NotFoundComponent from "../common/NotFoundComponent";



const PaymentCard = async () => {
  const duePayments = await getCourseWiseDuePayments();
  const duePayment = duePayments?.data?.due_payments || [];
  if (duePayment.length === 0) {
    // return <NotFoundComponent message="No due payments found." />;
    return null;
  }

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      {duePayment.map((payment) => (
      <Card key={payment.id} className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-md overflow-hidden bg-muted shrink-0">
            <Image
              src={payment.course_image || "/images/placeholder_img.jpg"}
              alt={payment.course_title}
              width={100}
              height={70}
              className="w-full h-full object-cover"
            />
          </div>

          <CardTitle className="text-base text-secondary font-semibold leading-snug">
            {payment.course_title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary font-semibold">Course Price</span>
            <span className="font-semibold text-black/80 ">
              {payment.price}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-secondary font-semibold">Total Paid</span>
            <span className="font-semibold text-black/80">
              {payment.total_paid}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-secondary font-semibold">Due Amount</span>
            <span className="font-semibold">{payment.due_amount}</span>
          </div>

          {/* <div className="flex justify-between">
            <span className="text-secondary font-semibold">Next Payment</span>
            <span className="font-semibold text-black/80 ">
              {payment.next_payment_date || "N/A"}
            </span>
          </div> */}
        </CardContent>
        {/* <CardFooter className="mx-auto">
          <Button>Pay Now</Button>
        </CardFooter> */}
      </Card>
      ))}
    </div>
  );
};

export default PaymentCard;
