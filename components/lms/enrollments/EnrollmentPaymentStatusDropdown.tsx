"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PAYMENT_STATUS_PENDING,
  PAYMENT_STATUS_PAID,
  PAYMENT_STATUS_REFUNDED,
} from "@/apiServices/paymentConstants";
import { updateEnrollmentPaymentStatus } from "@/apiServices/enrollmentService";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface EnrollmentPaymentStatusDropdownProps {
  enrollmentId: number;
  currentStatus?: number;
}

export default function EnrollmentPaymentStatusDropdown({
  enrollmentId,
  currentStatus,
}: EnrollmentPaymentStatusDropdownProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const statusValue = currentStatus ?? PAYMENT_STATUS_PENDING;

  const handleStatusChange = (newStatus: string) => {
    const statusNum = Number(newStatus);
    
    startTransition(async () => {
      try {
        await updateEnrollmentPaymentStatus(enrollmentId, {
          payment_status: statusNum,
        });
        
        const statusNames: Record<number, string> = {
          [PAYMENT_STATUS_PENDING]: "Pending",
          [PAYMENT_STATUS_PAID]: "Paid",
          [PAYMENT_STATUS_REFUNDED]: "Refunded",
        };
        
        toast.success(`Payment status changed to ${statusNames[statusNum]}`);
        router.refresh();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to update payment status");
        }
      }
    });
  };

  return (
    <Select
      value={statusValue.toString()}
      onValueChange={handleStatusChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[130px] h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={PAYMENT_STATUS_PENDING.toString()}>Pending</SelectItem>
        <SelectItem value={PAYMENT_STATUS_PAID.toString()}>Paid</SelectItem>
        <SelectItem value={PAYMENT_STATUS_REFUNDED.toString()}>Refunded</SelectItem>
      </SelectContent>
    </Select>
  );
}
