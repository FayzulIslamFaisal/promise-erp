"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { changeStudentPasswordClient } from "@/apiServices/studentDashboardService"

interface PasswordFormData {
  current_password: string
  password: string
  password_confirmation: string
}

// Field mapping for backend error fields to form fields
const fieldMapping: Record<string, keyof PasswordFormData> = {
  current_password: "current_password",
  password: "password",
  password_confirmation: "password_confirmation",
}

const PasswordTab = () => {
  const { data: session } = useSession()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<PasswordFormData>({
    mode: "onTouched",
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  })

  const onSubmit = async (data: PasswordFormData) => {
    if (!session?.accessToken) {
      toast.error("Unauthorized: Please login again")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await changeStudentPasswordClient(
        {
          current_password: data.current_password,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
        session.accessToken
      )

      if (response.success) {
        toast.success(response.message || "Password changed successfully!")
        reset()
        setShowCurrentPassword(false)
        setShowNewPassword(false)
        setShowConfirmPassword(false)
        return
      }

      // Handle validation errors from backend
      if (response.errors) {
        toast.error(response.message || "Validation failed")

        Object.entries(response.errors).forEach(([field, messages]) => {
          const errorMessage = Array.isArray(messages) ? messages[0] : messages
          setError(field as keyof PasswordFormData, {
            type: "server",
            message: errorMessage as string,
          })
        })
        return
      }

      // Handle other errors
      toast.error(response.message || "Failed to change password")
    } catch (error) {
      console.error("Password change error:", error)
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred while changing password")
      } else {
        toast.error("An unexpected error occurred")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-gray-200 text-secondary shadow-sm py-0">
      <CardHeader className="px-8 pt-6 pb-2">
        <CardTitle className="text-xl font-semibold text-secondary">Change Password</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-base font-normal text-secondary">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Provide your current password"
                  {...register("current_password")}
                  className={`border-gray-200 text-secondary pr-10 ${
                    errors.current_password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.current_password && (
                <p className="text-sm text-red-500 mt-1">{errors.current_password.message}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-base font-normal text-secondary">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Set a new password"
                  {...register("password")}
                  className={`border-gray-200 text-secondary pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-base font-normal text-secondary">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Write the new password"
                  {...register("password_confirmation")}
                  className={`border-gray-200 text-secondary pr-10 ${
                    errors.password_confirmation ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password_confirmation && (
                <p className="text-sm text-red-500 mt-1">{errors.password_confirmation.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <Button type="submit" className="px-6" disabled={isSubmitting}>
                {isSubmitting ? "Changing Password..." : "Change Password"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PasswordTab
