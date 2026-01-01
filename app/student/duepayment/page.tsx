import DuePaymentSkeleton from "@/components/student-dashboard/DuePaymentSkeleton";
import PaymentCard from "@/components/student-dashboard/PaymentCard";
import { Suspense } from "react";

const DuePaymentpage = () => {
  return (
    <section className="py-4 px-4">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Due Payments
      </h2>
      <div className="py-4 px-4">
        <Suspense fallback={<DuePaymentSkeleton />}>
          <PaymentCard />
        </Suspense>
      </div>
    </section>
  );
};

export default DuePaymentpage;
