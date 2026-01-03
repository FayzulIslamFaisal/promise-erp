
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import Link from "next/link";
import RegisterUser from "@/apiServices/auth/RegisterUser";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

interface ApiSuccessResponse {
  success: true;
  message: string;
  data?: any;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: number;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

const fieldMapping: Record<string, keyof FormData> = {
  email: "email",
  phone: "phone",
  name: "name",
  password: "password",
  password_confirmation: "password_confirmation",
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const passwordValue = watch("password");

  const clearFieldError = (field: keyof FormData) => {
    if (errors[field]) clearErrors(field);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const result = (await RegisterUser(data)) as ApiResponse;

      if (result.success) {
        toast.success(result.message || "Registration successful!");

        const signInResult = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        reset();

        if (signInResult?.ok) {
          toast.success("Logged in successfully!");
          router.push("/");
        } else {
          router.push("/login");
        }

        return;
      }

      if (result.code === 422 && result.errors) {
        toast.error(result.message || "Validation failed");

        Object.entries(result.errors).forEach(([field, messages]) => {
          const mappedField = fieldMapping[field] || (field as keyof FormData);

          setError(mappedField, {
            type: "server",
            message: messages[0],
          });
        });
        return;
      }

      toast.error(result.message || "Registration failed");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="max-w-[500px] shadow-xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Registration</CardTitle>
          <CardDescription>
            Create an account to start your learning journey today
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              {/* Name */}
              <Field>
                <FieldLabel>Full Name *</FieldLabel>
                <Input
                  {...register("name", { required: "Name is required" })}
                  onChange={() => clearFieldError("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel>Email *</FieldLabel>
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  onChange={() => clearFieldError("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel>Phone *</FieldLabel>
                <Input
                  {...register("phone", { required: "Phone is required" })}
                  onChange={() => clearFieldError("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel>Password *</FieldLabel>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password required" })}
                    onChange={() => clearFieldError("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel>Confirm Password *</FieldLabel>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("password_confirmation", {
                      validate: (v) =>
                        v === passwordValue || "Passwords do not match",
                    })}
                    onChange={() => clearFieldError("password_confirmation")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </Field>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex gap-2 items-center">
                      <Spinner /> Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
