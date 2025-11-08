import { getBranches } from "@/apiServices/branchService"
import { getCourses } from "@/apiServices/courseService"
import { getDivisions } from "@/apiServices/divisionService"
import StudentFilter from "./StudentFilter"

export default async function StudentFilterData() {
  const [divisionsRes, branchesRes, coursesRes] = await Promise.all([
    getDivisions(),
    getBranches(),
    getCourses(),
  ])

  return (
    <StudentFilter
      divisions={divisionsRes.data.divisions}
      branches={branchesRes.data.branches}
      courses={coursesRes?.data?.courses}
    />
  )
}
