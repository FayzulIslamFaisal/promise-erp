import { getBranches } from "@/apiServices/branchService"
import { getCourses } from "@/apiServices/courseService"
import { getBatches, Batch } from "@/apiServices/batchService"
import EnrollmentFilter from "./EnrollmentFilter"

export default async function EnrollmentFilterData() {
  try {
    const [branchesRes, coursesRes, batchesRes] = await Promise.all([
      getBranches({ per_page: 999 }),
      getCourses({ per_page: 999 }),
      getBatches({ per_page: 999 }),
    ])

    // Map batches to include only id, name, and course_id for the filter
    const batches = batchesRes.data?.batches?.map((batch: Batch) => ({
      id: batch.id,
      name: batch.name,
      course_id: batch.course_id,
    })) || []

    return (
      <EnrollmentFilter
        branches={branchesRes.data?.branches || []}
        courses={coursesRes?.data?.courses || []}
        batches={batches}
      />
    )
  } catch (error) {
    console.error("Error loading enrollment filters:", error)
    return (
      <EnrollmentFilter
        branches={[]}
        courses={[]}
        batches={[]}
      />
    )
  }
}
