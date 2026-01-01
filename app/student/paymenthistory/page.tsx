import { PaymentHistoryCard } from "@/components/student-dashboard/PaymentHistoryCard";
import PaymentHistoryCardSkeleton from "@/components/student-dashboard/PaymentHistoryCardSkeleton";
import { Suspense } from "react";

const PaymentHistoryPage = () => {
  return (
    <section className="py-4 px-4">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Payment History
      </h2>
      <div className="py-4 px-4">
        <Suspense fallback={<PaymentHistoryCardSkeleton />}>
          <PaymentHistoryCard />
        </Suspense>
      </div>
    </section>
  );
};

export default PaymentHistoryPage;
