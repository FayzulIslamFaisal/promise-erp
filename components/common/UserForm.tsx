"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface UserFormProps {
  title: string;
  onSubmit: (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => void | Promise<void>;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    profile_image?: string | null;
  };
}

interface FormValues {
  name: string;
  email: string;
  password?: string;
  phone: string;
  profile_image?: FileList;
}

export default function UserForm({ title, onSubmit, user }: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const [preview, setPreview] = useState<string | null>(user?.profile_image || null);

  useEffect(() => {
    // reset form when user data changes
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      setPreview(user.profile_image || null);
    }
  }, [user, reset]);

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submitForm = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    // password should only be added if provided
    if (data.password) {
      formData.append("password", data.password);
    }

    if (data.profile_image && data.profile_image[0]) {
      formData.append("profile_image", data.profile_image[0]);
    }

    await onSubmit(formData, setFormError, () => reset());
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(submitForm)}>
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              required
            />
            {errors.name && (
              <span className="text-sm text-red-600">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
              required
            />
            {errors.email && (
              <span className="text-sm text-red-600">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">
              {user ? "Password (optional)" : "Password"}{" "}
              {!user && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              {...register("password")}
              required={!user}
            />
            {errors.password && (
              <span className="text-sm text-red-600">{errors.password.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="01XXXXXXXXX"
              {...register("phone")}
              required
            />
            {errors.phone && (
              <span className="text-sm text-red-600">{errors.phone.message}</span>
            )}
          </div>

          {/* Profile Image */}
          <div className="grid gap-2">
            <Label htmlFor="profile_image">
              Profile Image {user ? "(optional)" : <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="profile_image"
              type="file"
              accept="image/*"
              {...register("profile_image")}
              onChange={handleImageChange}
            />
            {errors.profile_image && (
              <span className="text-sm text-red-600">
                {errors.profile_image.message as string}
              </span>
            )}

            {/* Preview */}
            {preview && (
              <div className="flex justify-center mt-2">
                <Image
                  src={preview}
                  alt="Preview"
                  width={90}
                  height={90}
                  className="rounded-2xl object-cover border shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            variant="default"
            size="default"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
