
"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EnrollmentsData, postEnrollmentSubmit } from "@/apiServices/studentEnrollmentService";

type PaymentGateway = "paylater" | "rocket" | "nagad" | "bkash";
/**
 * Backend expects number
 * 0 = paylater
 * 1 = rocket
 * 2 = nagad
 * 3 = bkash
 */
const paymentMethodMap: Record<PaymentGateway, number> = {
  paylater: 0,
  rocket: 1,
  nagad: 2,
  bkash: 3,
};

const gateways: {
  id: PaymentGateway;
  img: string;
  alt: string;
}[] = [
  { id: "bkash", img: "/images/payment1.png", alt: "bKash" },
  { id: "nagad", img: "/images/payment2.png", alt: "Nagad" },
  { id: "rocket", img: "/images/payment3.png", alt: "Rocket" },
  { id: "paylater", img: "/images/payment4.png", alt: "Pay Later" },
];

interface Props {
  enrollmentDetails: EnrollmentsData;
  savedCouponCode: string | null;
  token?: string;
}

const EnrollPaymentMethod = ({
  enrollmentDetails,
  savedCouponCode,
  token,
}: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentGateway | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSelectMethod = (method: PaymentGateway) => {
    if (method !== "paylater") {
      toast.info("Currently Pay Later is available. Please select Pay Later.");
      return;
    }
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    startTransition(async () => {
      try {
        const res = await postEnrollmentSubmit({
          batch_id: enrollmentDetails.batch.id,
          coupon_code: savedCouponCode,
          payment_method: paymentMethodMap[selectedMethod],
          payment_type: 0, // 0 = full payment
          partial_payment_amount: 0,
        }, token);

        if (res.success) {
          toast.success(res?.data?.message || "Enrollment successful");
          router.push("/student/dashboard");
          // future redirect here
        } else {
          toast.error(res?.message || "Payment failed");
        }
      } catch (error:unknown) {
        console.log("Enrollment submission failed", error);
        toast.error("Enrollment submission failed");  
        
      }
    });
  };


  return (
    <Card className="py-0">
      <CardContent className="p-6">
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Payment Method
          </h2>

          <p className="text-secondary mb-4">Select Payment Method</p>

          <div className="space-y-3 mb-6">
            {gateways.map((gateway) => (
              <button
                key={gateway.id}
                onClick={() => handleSelectMethod(gateway.id)}
                className={`w-full h-14 rounded-lg flex items-center px-6 bg-white transition-all
                  ${
                    selectedMethod === gateway.id
                      ? "ring-2 ring-primary ring-offset-2"
                      : "ring-2 ring-secondary"
                  }`}
              >
                <Image
                  src={gateway.img}
                  alt={gateway.alt}
                  width={110}
                  height={40}
                  className="object-contain"
                />
              </button>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedMethod || isPending}
            className="w-full capitalize"
          >
            {isPending ? "Processing..." : `Pay Now (${selectedMethod})`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollPaymentMethod;

