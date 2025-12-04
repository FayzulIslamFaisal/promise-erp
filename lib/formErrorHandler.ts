import { toast } from "sonner";
import { UseFormSetError, Path } from "react-hook-form";
import { ApiErrorResponse } from "./apiErrorHandler";

/**
 * Handle form errors and display them
 * Shows field-level errors in form and toast notifications
 */
export function handleFormErrors<T extends Record<string, any>>(
  response: ApiErrorResponse | { success: false; message: string; errors?: Record<string, string[] | string>; code?: number },
  setError: UseFormSetError<T>,
  options?: {
    showToast?: boolean;
    toastMessage?: string;
  }
): void {
  const { showToast = true, toastMessage } = options || {};

  // Handle validation errors (field-level)
  if (response.errors) {
    let hasFieldErrors = false;

    Object.entries(response.errors).forEach(([field, messages]) => {
      const errorMessage = Array.isArray(messages) ? messages[0] : messages;
      
      if (errorMessage) {
        setError(field as Path<T>, {
          type: "server",
          message: errorMessage,
        });
        hasFieldErrors = true;
      }
    });

    // Show toast for validation errors
    if (showToast) {
      toast.error(toastMessage || response.message || "Please fix the errors below.");
    }
  } else {
    // Show general error toast
    if (showToast) {
      toast.error(response.message || "Something went wrong.");
    }
  }
}

/**
 * Handle form success
 */
export function handleFormSuccess(
  message?: string,
  defaultMessage: string = "Operation completed successfully!"
): void {
  toast.success(message || defaultMessage);
}

