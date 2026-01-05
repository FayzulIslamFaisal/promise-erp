import { getBranches } from "@/apiServices/branchService"
import { getDivisions } from "@/apiServices/divisionService"
import { getCategories } from "@/apiServices/categoryService"
import CourseFilter from "./CourseFilter"

export default async function CourseFilterData() {
  const [divisionsRes, branchesRes, categoriesRes] = await Promise.all([
    getDivisions({ per_page: 100 }),
    getBranches({ per_page: 100 }),
    getCategories({ per_page: 100 }),
  ])
  return (
    <CourseFilter
      divisions={divisionsRes?.data?.divisions}
      branches={branchesRes?.data?.branches}
      categories={categoriesRes?.data?.categories || []}
    />
  )
}
