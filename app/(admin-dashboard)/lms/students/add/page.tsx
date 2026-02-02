import { getBranches } from "@/apiServices/branchService";
import StudentForm from "@/components/lms/students/StudentForm";

export default async function AddStudentPage() {
  const branchesRes = await getBranches({ per_page: 999 });

  return (
    <StudentForm
      title="Add New Student"
      branches={branchesRes?.data?.branches || []}
    />
  );
}
