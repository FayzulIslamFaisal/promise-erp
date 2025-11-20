
import { getBranches } from "@/apiServices/branchService"
import { getCourses } from "@/apiServices/courseService"
import { getDistricts } from "@/apiServices/districtService"
import { getDivisions } from "@/apiServices/divisionService"
import BatchFilter from "./BatchFilter"

export default async function BatchFilterData() {
  const [divisionsRes, districtsRes, branchesRes, coursesRes] = await Promise.all([
    getDivisions(),
    getDistricts(),
    getBranches(),
    getCourses(),
  ])

  return (
    <BatchFilter
      divisions={divisionsRes.data.divisions}
      districts={districtsRes.data.districts}
      branches={branchesRes.data.branches}
      courses={coursesRes?.data?.courses}
    />
  )
}
