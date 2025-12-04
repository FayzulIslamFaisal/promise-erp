"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import CourseAddForm from "./CourseAddForm";
import ChapterLessonAddForm from "./ChapterLessonAddForm";
import FAQSelection from "./FAQSelection";
import FacilitiesSelection from "./FacilitiesSelection";
import { createCourse } from "@/apiServices/courseService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";


// ------------------------------
// Step Header Component
// ------------------------------
interface StepHeaderProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

function StepHeader({ number, title, isActive, isCompleted }: StepHeaderProps) {
  const circleClass = isCompleted
    ? "bg-green-500 text-white border-green-500"
    : isActive
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-background text-muted-foreground border-muted";

  const textColor =
    isActive || isCompleted ? "text-foreground" : "text-muted-foreground";

  return (
    <div className="flex items-center space-x-4 mb-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${circleClass}`}
      >
        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : number}
      </div>
      <h3 className={`text-lg font-medium ${textColor}`}>{title}</h3>
    </div>
  );
}

// ------------------------------
// Wizard Page
// ------------------------------
export default function CourseCreationWizard() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [courseId, setCourseId] = useState<number | null>(null);

  const goNext = () => setStep((prev) => prev + 1);

  // --------------------------------------------
  // Step 1 — Create Course (Form Submit Handler)
  // --------------------------------------------
  const handleCourseSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res = await createCourse(formData);
      
      if (res.success) {
        const newCourseId = res.data?.id;
        if (newCourseId) {
          setCourseId(Number(newCourseId));
          handleFormSuccess(res.message || "Course created successfully!");
          goNext();
        } else {
          handleFormErrors(
            { success: false, message: "Course created but ID not found" },
            setFormError as UseFormSetError<any>
          );
        }
      } else {
        handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
      }
    } catch (error) {
      handleFormErrors(
        { success: false, message: error instanceof Error ? error.message : "Failed to create course" },
        setFormError as UseFormSetError<any>
      );
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Create Course</CardTitle>
      </CardHeader>

      <CardContent>
        {/* STEP 1 */}
        <StepHeader
          number={1}
          title="Course"
          isActive={step === 1}
          isCompleted={step > 1}
        />

        {step === 1 && (
          <div className="mt-4">
            <CourseAddForm title="Create Course" onSubmit={handleCourseSubmit} />
          </div>
        )}

        <Separator className="my-6" />

        {/* STEP 2 */}
        <StepHeader
          number={2}
          title="Chapters & Lessons"
          isActive={step === 2}
          isCompleted={step > 2}
        />

        {step === 2 && courseId && (
          <div className="mt-4">
            <ChapterLessonAddForm courseId={courseId} onSuccess={goNext} />
          </div>
        )}

        <Separator className="my-6" />

        {/* STEP 3 */}
        <StepHeader
          number={3}
          title="FAQs"
          isActive={step === 3}
          isCompleted={step > 3}
        />

        {step === 3 && courseId && (
          <div className="mt-4">
            <FAQSelection courseId={courseId} onSuccess={goNext} />
          </div>
        )}

        <Separator className="my-6" />

        {/* STEP 4 */}
        <StepHeader
          number={4}
          title="Facilities"
          isActive={step === 4}
          isCompleted={step > 4}
        />

        {step === 4 && courseId && (
          <div className="mt-4">
            <FacilitiesSelection
              courseId={courseId}
              onSuccess={() => router.push("/lms/courses")}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
