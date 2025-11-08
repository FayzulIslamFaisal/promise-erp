import { getBranches } from "@/apiServices/branchService"
import { getCourses } from "@/apiServices/courseService"
import { getDivisions } from "@/apiServices/divisionService"
import { getCategories } from "@/apiServices/categoryService"
import CourseFilter from "./CourseFilter"

export default async function CourseFilterData() {
  const [divisionsRes, branchesRes, categoriesRes] = await Promise.all([
    getDivisions(),
    getBranches(),
    getCategories(),
  ])

  return (
    <CourseFilter
      divisions={divisionsRes?.data?.divisions}
      branches={branchesRes?.data?.branches}
      categories={categoriesRes?.data?.categories}
    />
  )
}
