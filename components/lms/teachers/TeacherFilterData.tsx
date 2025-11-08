import { getBranches } from "@/apiServices/branchService"
import { getCourses } from "@/apiServices/courseService"
import { getDivisions } from "@/apiServices/divisionService"
import TeacherFilter from "./TeacherFilter"

export default async function TeacherFilterData() {
  const [divisionsRes, branchesRes, coursesRes] = await Promise.all([
    getDivisions(),
    getBranches(),
    getCourses(),
  ])

  return (
    <TeacherFilter
      divisions={divisionsRes.data.divisions}
      branches={branchesRes.data.branches}
      courses={coursesRes?.data?.courses}
    />
  )
}
