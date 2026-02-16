"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface ApiResponse {
  success: boolean;
  message?: string;
}

interface DeleteButtonProps {
  id: number;
  deleteAction: (id: number) => Promise<ApiResponse>;
  itemName?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  triggerClassName?: string;
  showRefresh?: boolean;
}

const DeleteButton = ({
  id,
  deleteAction,
  itemName = "item",
  successMessage,
  errorMessage,
  onSuccess,
  triggerClassName,
  showRefresh = true,
}: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteAction(id);
        if (res.success) {
          toast.success(successMessage || res.message || `${itemName} deleted successfully`);
          if (showRefresh) {
            router.refresh();
          }
          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast.error(errorMessage || res.message || "Delete failed");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "An unexpected error occurred.";
        toast.error(message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className={
            triggerClassName ||
            "text-red-600 hover:text-red-800 flex items-center cursor-pointer"
          }
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner className="h-4 w-4 mr-2" /> Deleting...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </>
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The {itemName} will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;

