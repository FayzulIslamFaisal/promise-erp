"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ENROLLMENT_STATUS_PENDING, ENROLLMENT_STATUS_ACTIVE, ENROLLMENT_STATUS_EXPIRED } from "@/apiServices/enrollmentConstants";
import { approveEnrollment } from "@/apiServices/enrollmentService";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EnrollmentStatusDropdownProps {
  enrollmentId: number;
  currentStatus?: number;
}

export default function EnrollmentStatusDropdown({
  enrollmentId,
  currentStatus,
}: EnrollmentStatusDropdownProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingStatus, setPendingStatus] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusValue = currentStatus ?? ENROLLMENT_STATUS_PENDING;

  const handleStatusChange = (newStatus: string) => {
    const statusNum = Number(newStatus);

    // If status is not changing, do nothing
    if (statusNum === statusValue) {
      return;
    }

    setPendingStatus(statusNum);
    setIsDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatus === null) return;

    startTransition(async () => {
      try {
        await approveEnrollment(enrollmentId, {
          status: pendingStatus,
        });

        const statusNames: Record<number, string> = {
          [ENROLLMENT_STATUS_PENDING]: "Pending",
          [ENROLLMENT_STATUS_ACTIVE]: "Active",
          [ENROLLMENT_STATUS_EXPIRED]: "Expired",
        };

        toast.success(`Enrollment status changed to ${statusNames[pendingStatus]}`);
        setIsDialogOpen(false);
        setPendingStatus(null);
        router.refresh();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to update enrollment status");
        }
        setIsDialogOpen(false);
        setPendingStatus(null);
      }
    });
  };

  const statusNames: Record<number, string> = {
    [ENROLLMENT_STATUS_PENDING]: "Pending",
    [ENROLLMENT_STATUS_ACTIVE]: "Active",
    [ENROLLMENT_STATUS_EXPIRED]: "Expired",
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case ENROLLMENT_STATUS_ACTIVE:
        return "bg-green-100 text-green-700 hover:bg-green-200 border-green-200";
      case ENROLLMENT_STATUS_PENDING:
        return "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200";
      case ENROLLMENT_STATUS_EXPIRED:
        return "bg-red-100 text-red-700 hover:bg-red-200 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200";
    }
  };

  return (
    <>
      <Select
        value={statusValue.toString()}
        onValueChange={handleStatusChange}
        disabled={isPending}
      >
        <SelectTrigger className={`w-[130px] h-8 font-medium ${getStatusColor(statusValue)}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ENROLLMENT_STATUS_PENDING.toString()}>Pending</SelectItem>
          <SelectItem value={ENROLLMENT_STATUS_ACTIVE.toString()}>Active</SelectItem>
          <SelectItem value={ENROLLMENT_STATUS_EXPIRED.toString()}>Expired</SelectItem>
        </SelectContent>
      </Select>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Enrollment Status?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the enrollment status to{" "}
              <strong>{pendingStatus !== null ? statusNames[pendingStatus] : ""}</strong>?
              This action will update the enrollment status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending} onClick={() => setPendingStatus(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={confirmStatusChange} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Yes, Change Status"
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
