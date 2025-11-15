import { getDivisions } from "@/apiServices/divisionService";
import { getDistricts } from "@/apiServices/districtService";
import { getBranches } from "@/apiServices/branchService";
import { getCourses } from "@/apiServices/courseService";
import { getBatches } from "@/apiServices/batchService";
import GroupFilter from "./GroupFilter";

export default async function GroupFilterData() {
  const divisions = await getDivisions().then(res => res.data?.divisions || []);
  const districts = await getDistricts().then(res => res.data?.districts || []);
  const branches = await getBranches().then(res => res.data?.branches || []);
  const courses = await getCourses().then(res => res.data?.courses || []);
  const batches = await getBatches().then(res => res.data?.batches || []);

  return (
    <GroupFilter 
      divisions={divisions}
      districts={districts}
      branches={branches}
      courses={courses}
      batches={batches}
    />
  )
}