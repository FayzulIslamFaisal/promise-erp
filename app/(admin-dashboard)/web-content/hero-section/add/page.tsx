"use client";

import HeroSectionForm from "@/components/web-content/hero-section/HeroSectionForm";
import { useRouter } from "next/navigation";
import { createHeroSection } from "@/apiServices/homePageAdminService";
import { toast } from "sonner";

const HeroSectionAddPage = () => {
  const router = useRouter();

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await createHeroSection(formData);

    if (res.success) {
      toast.success(res.message);
      resetForm();
      router.push("/web-content/hero-section");
    } else {
      if (res.errors) {
        Object.entries(res.errors).forEach(([field, message]) => {
          setFormError(field, message as string);
        });
        toast.error(res.message);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <HeroSectionForm title="Add Hero Section" onSubmit={handleSubmit} />
  );
};

export default HeroSectionAddPage;