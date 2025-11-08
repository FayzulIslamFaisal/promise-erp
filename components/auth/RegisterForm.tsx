"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import Link from "next/link"
import RegisterUser from "@/apiServices/auth/RegisterUser"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Spinner } from "@/components/ui/spinner"

interface FormData {
  name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormData>({ mode: "onTouched" })

  const passwordValue = watch("password")

  const onSubmit = async (data: FormData) => {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    password_confirmation: data.password_confirmation,
  }
  try {
    const result = await RegisterUser(payload)
    if (result?.success) {
      toast.success("Registration successful")
      reset()
      router.push("/")
    } else {
      toast.error(result?.message || "Registration failed")
    }
  } catch (error: any) {
    toast.error(error.message || "Registration failed")
  }
}


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
              {/* Full Name */}
              <Field>
                <FieldLabel>
                  Full Name<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...register("name", { required: "Name is Required" })}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel>
                  Email<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel>
                  Phone<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message: "Phone number is invalid",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel>
                  Password<span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel>
                  Confirm Password<span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    {...register("password_confirmation", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === passwordValue || "Passwords don't match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
                )}
              </Field>

              {/* Terms & Conditions */}
              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox
                    id="agreeToTerms"
                    // {...register("agreeToTerms", {
                    //   required: "You must agree to the terms",
                    // })}
                  />
                  <FieldLabel htmlFor="agreeToTerms" className="font-normal">
                    <p>
                      I agree to the{" "}
                      <Link className="text-blue-600 hover:underline" href="#">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link className="text-blue-600 hover:underline" href="#">
                        Privacy Policy
                      </Link>
                    </p>
                  </FieldLabel>
                </Field>
                {/* {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>
                )} */}
              </FieldGroup>

              {/* Submit */}
              <FieldGroup>
                <Field orientation="horizontal">
                  <Button 
                    className="w-auto mx-auto" 
                    variant="default" 
                    type="submit"
                    size="default"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <><Spinner /> Creating Account...</> : "Create Account"}
                  </Button>
                </Field>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link className="text-blue-600 hover:underline" href="/login">
                    Login
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterForm
