"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DuePaymentPayNow = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Pay Now</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Payment Gateway Coming Soon</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              এই মুহূর্তে অনলাইন payment gateway সক্রিয় নেই।
              অনুগ্রহ করে আপনার কোর্সের payment সম্পন্ন করার জন্য
              admin-এর সাথে যোগাযোগ করুন।
            </p>
            <p>
              🚀 <strong>Coming Soon:</strong> আমরা খুব শীঘ্রই payment gateway
              যুক্ত করতে যাচ্ছি। আমাদের developers টিম এই বিষয়টি নিয়ে কাজ করছে।
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DuePaymentPayNow;
