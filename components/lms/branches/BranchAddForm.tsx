"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getDistricts } from "@/apiServices/districtService";
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
  district_id: string;
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
  const [districts, setDistricts] = useState<Array<{ id: number; name: string }>>([]);

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
      district_id: initialData?.district?.id?.toString() || "",
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

  // Load districts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await getDistricts({per_page: 999});
        if (res.success) setDistricts(res.data.districts || res.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  // Reset form when editing an existing branch
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData?.name || "",
        district_id: initialData?.district?.id?.toString() || "",
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

  // Submit as JSON
  const submitForm = async (data: FormValues) => {
    const payload = {
      name: data.name,
      district_id: Number(data.district_id),
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
              <Input id="name" placeholder="Enter branch name" {...register("name")} />
              {errors.name && (
                <span className="text-sm text-red-600">{errors.name.message}</span>
              )}
            </div>

            {/* District Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="district_id">
                Select District<span className="text-red-500">*</span>
              </Label>
              <select
                id="district_id"
                {...register("district_id")}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="" disabled>
                  -- Select a district --
                </option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district_id && (
                <span className="text-sm text-red-600">{errors.district_id.message}</span>
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

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 w-full">
            {/* Phones */}
            <div className="flex-1 flex flex-col gap-2 w-full">
              <Label>Phone Numbers</Label>
              <div className="flex flex-col gap-2">
                {phoneFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <Input
                      placeholder="01XXXXXXXXX"
                      className="flex-1"
                      {...register(`phone.${index}.value` as const)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      className="shrink-0 h-10 w-10"
                      onClick={() => removePhone(index)}
                    >
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit"
                  onClick={() => appendPhone({ value: "" })}
                >
                  + Add Phone
                </Button>
              </div>
            </div>

            {/* Emails */}
            <div className="flex-1 flex flex-col gap-2 w-full">
              <Label>Emails</Label>
              <div className="flex flex-col gap-2">
                {emailFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <Input
                      type="email"
                      placeholder="example@mail.com"
                      className="flex-1"
                      {...register(`email.${index}.value` as const)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      className="shrink-0 h-10 w-10"
                      onClick={() => removeEmail(index)}
                    >
                      -
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit"
                  onClick={() => appendEmail({ value: "" })}
                >
                  + Add Email
                </Button>
              </div>
            </div>
          </div>



          {/* Social Media Links */}
          <div className="grid gap-2">
            <Label>Social Media Links</Label>

            {socialFields.map((field, index) => (
              <div key={field.id} className="flex flex-col md:flex-row gap-2 items-start">
                {/*  Social Media Type Dropdown */}
                <select
                  {...register(`social_links.${index}.title` as const)}
                  className="border border-gray-300 rounded px-2 py-2 w-full md:w-1/3"
                  defaultValue="" // placeholder selected initially
                >
                  {/* Default placeholder option */}
                  <option value="" defaultChecked>
                    -- Select Social Media --
                  </option>

                  {SOCIAL_MEDIA_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {/* URL input */}
                <Input
                  placeholder="https://facebook.com/branch"
                  {...register(`social_links.${index}.url` as const)}
                  className="flex-1 w-full"
                />

                {/* Remove button */}
                <Button
                  type="button"
                  variant="destructive"
                  className="shrink-0 h-10 w-10"
                  onClick={() => removeSocial(index)}
                >
                  -
                </Button>
              </div>
            ))}

            {/* Add new social link */}
            <Button
              type="button"
              variant="outline"
              className="w-fit"
              onClick={() => appendSocial({ title: "", url: "" })} // empty title to show placeholder
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
