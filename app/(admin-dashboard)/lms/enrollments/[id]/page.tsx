import EnrollmentDetails from "@/components/lms/enrollments/EnrollmentDetails";
import { getEnrollmentById } from "@/apiServices/enrollmentService";
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";

export default async function EnrollmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const response = await getEnrollmentById(id);
    const enrollment = response?.data;

    if (!enrollment) {
      return (
        <NotFoundComponent
          title="Enrollment"
          message="Enrollment details not found."
        />
      );
    }

    return <EnrollmentDetails enrollment={enrollment} />;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    }
    return <ErrorComponent message="Failed to load enrollment details." />;
  }
}
