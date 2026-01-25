"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { userForgotPasswordEmail } from "@/apiServices/auth/RegisterUser";
import { toast } from "sonner";

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    clearErrors();

    startTransition(async () => {
      try {
        const res = await userForgotPasswordEmail(values.email);
        if (!res.success) {
          if (res.errors) {
            Object.entries(res.errors).forEach(([field, message]) => {
              setError(field as keyof ForgotPasswordFormValues, {
                type: "server",
                message: Array.isArray(message) ? message[0] : message,
              });
            });
          } else {
            setError("root", {
              type: "server",
              message: res.message || "Failed to send reset link",
            });
          }
          return;
        }

        reset();
        toast.success(
          res.message || "If the email exists, a reset link has been sent.",
        );
      } catch (error: unknown) {
        setError("root", {
          type: "server",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            Forgot Password?
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Email (Registered)
              </label>

              <Input
                type="email"
                placeholder="Please enter registered email"
                className="h-11"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}

              {errors.root && (
                <p className="text-sm text-red-500">{errors.root.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send reset link"}
            </Button>
          </form>

          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
