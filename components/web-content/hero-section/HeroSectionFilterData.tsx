import { getBranches } from "@/apiServices/branchService"
import HeroSectionFilter from "./HeroSectionFilter"

export default async function HeroSectionFilterData() {
  const branchesRes = await getBranches(1, { per_page: 100 })
  const branches = branchesRes?.data?.branches || []

  return (
    <HeroSectionFilter branches={branches} />
  )
}