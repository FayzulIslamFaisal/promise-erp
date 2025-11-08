"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getDivisions } from "@/apiServices/divisionService";
import { Branch } from "@/apiServices/branchService";

interface BranchFormProps {
  title: string;
  onSubmit: (
    jsonData: any,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => void | Promise<void>;
  initialData?: Branch | null;
}

interface SocialLink {
  title: string;
  url: string;
}

interface FormValues {
  name: string;
  division_id: string;
  address?: string;
  phone: { value: string }[];
  email: { value: string }[];
  google_map?: string;
  social_links: SocialLink[];
}

const SOCIAL_MEDIA_OPTIONS = [
  "Facebook",
  "Twitter",
  "Instagram",
  "LinkedIn",
  "YouTube",
  "Other",
];
export default function BranchForm({
  title,
  onSubmit,
  initialData,
}: BranchFormProps) {
  const [divisions, setDivisions] = useState<Array<{ id: number; name: string }>>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: initialData?.name || "",
      division_id: initialData?.division_id?.toString() || "",
      address: initialData?.address || "",
      phone: initialData?.phone?.map((p) => ({ value: p })) || [{ value: "" }],
      email: initialData?.email?.map((e) => ({ value: e })) || [{ value: "" }],
      google_map: initialData?.google_map || "",
      social_links:
        initialData?.social_links?.map((social) => ({
          title: social?.title,
          url: social?.url,
        })) || [{ title: "Facebook", url: "" }],
    },
  });

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control,
    name: "phone",
  });

  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control,
    name: "email",
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: "social_links",
  });

  // Load divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await getDivisions();
        if (res.success) setDivisions(res.data.divisions);
      } catch (error) {
        console.error("Failed to fetch divisions:", error);
      }
    };
    fetchDivisions();
  }, []);

  // Reset when editing existing branch
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData?.name || "",
        division_id: initialData?.division_id?.toString() || "",
        address: initialData?.address || "",
        phone: initialData?.phone?.map((p) => ({ value: p })) || [{ value: "" }],
        email: initialData?.email?.map((e) => ({ value: e })) || [{ value: "" }],
        google_map: initialData?.google_map || "",
        social_links:
          initialData?.social_links?.map((social) => ({
            title: social?.title,
            url: social?.url,
          })) || [{ title: "Facebook", url: "" }],
      });
    }
  }, [initialData, reset]);

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  /**
   * ✅ Submit Form as JSON (not FormData)
   * so backend receives arrays properly.
   */
  const submitForm = async (data: FormValues) => {
    const payload = {
      name: data.name,
      division_id: Number(data.division_id),
      address: data.address || null,
      phone: data.phone.map((p) => p.value.trim()).filter(Boolean),
      email: data.email.map((e) => e.value.trim()).filter(Boolean),
      google_map: data.google_map || null,
      social_links: data.social_links
        .filter((social) => social.title && social.url.trim() !== "")
        .map((social) => ({
          title: social.title,
          url: social.url.trim(),
        })),
    };

    await onSubmit(payload, setFormError, () => reset());
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="grid gap-6">
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Branch Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Branch Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter branch name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-sm text-red-600">{errors.name.message}</span>
              )}
            </div>

            {/* Division */}
            <div className="grid gap-2">
              <Label htmlFor="division_id">
                Select Division<span className="text-red-500">*</span>
              </Label>
              <select
                id="division_id"
                {...register("division_id")}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="" disabled>
                  -- Select a division --
                </option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
              {errors.division_id && (
                <span className="text-sm text-red-600">{errors.division_id.message}</span>
              )}
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Branch address" {...register("address")} />
            </div>

            {/* Google Map */}
            <div className="grid gap-2">
              <Label htmlFor="google_map">Google Map URL</Label>
              <Input
                id="google_map"
                placeholder="Google Map link"
                {...register("google_map")}
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phones */}
            <div className="grid gap-2">
              <Label>Phone Numbers</Label>
              {phoneFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="01XXXXXXXXX"
                    {...register(`phone.${index}.value` as const)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removePhone(index)}
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendPhone({ value: "" })}
              >
                + Add Phone
              </Button>
            </div>

            {/* Emails */}
            <div className="grid gap-2">
              <Label>Emails</Label>
              {emailFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    {...register(`email.${index}.value` as const)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeEmail(index)}
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendEmail({ value: "" })}
              >
                + Add Email
              </Button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="grid gap-2">
            <Label>Social Media Links</Label>
            {socialFields.map((field, index) => (
              <div key={field.id} className="flex flex-col md:flex-row gap-2">
                <select
                  {...register(`social_links.${index}.title` as const)}
                  className="border border-gray-300 rounded px-2 py-1 w-full md:w-1/3"
                >
                  {SOCIAL_MEDIA_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <Input
                  placeholder="https://facebook.com/branch"
                  {...register(`social_links.${index}.url` as const)}
                  className="w-full"
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeSocial(index)}
                >
                  -
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendSocial({ title: "Facebook", url: "" })}
            >
              + Add Social Link
            </Button>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              variant="default"
              size="default"
              type="submit"
              className="w-32"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
