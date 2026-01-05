import { getBranches } from "@/apiServices/branchService"
import { getCourses } from "@/apiServices/courseService"
import { getDivisions } from "@/apiServices/divisionService"
import StudentFilter from "./StudentFilter"

export default async function StudentFilterData() {
  const [divisionsRes, branchesRes, coursesRes] = await Promise.all([
    getDivisions({ per_page: 999 }),
    getBranches({ per_page: 999 }),
    getCourses({ per_page: 999 }),
  ])

  return (
    <StudentFilter
      divisions={divisionsRes.data.divisions}
      branches={branchesRes.data.branches}
      courses={coursesRes?.data?.courses}
    />
  )
}
