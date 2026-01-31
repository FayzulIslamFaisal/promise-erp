import { getBranches } from "@/apiServices/branchService"
import { getCategories } from "@/apiServices/categoryService"
import CourseFilter from "./CourseFilter"

export default async function CourseFilterData() {
  const [ branchesRes, categoriesRes] = await Promise.all([
    getBranches({ per_page: 100 }),
    getCategories({ per_page: 100 }),
  ])
  return (
    <CourseFilter
      branches={branchesRes?.data?.branches}
      categories={categoriesRes?.data?.categories || []}
    />
  )
}
