import { getDistricts } from "@/apiServices/districtService"
import BranchFilter from "./BranchFilter"

export default async function BranchFilterData() {
  const [districtsRes] = await Promise.all([getDistricts()])

  return <BranchFilter districts={districtsRes.data.districts} />
}