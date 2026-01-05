import { getBranches } from "@/apiServices/branchService"
import { getCourses } from "@/apiServices/courseService"
import { getBatches } from "@/apiServices/batchService"
import ChapterFilter from "./ChapterFilter"

export default async function ChapterFilterData() {
  const [branchesRes, coursesRes, batchesRes] = await Promise.all([
    getBranches({ per_page: 999 }),
    getCourses({ per_page: 999 }),
    getBatches({ per_page: 999 }),
  ])

  return (
    <ChapterFilter
      branches={branchesRes.data.branches}
      courses={coursesRes.data.courses}
      batches={batchesRes.data.batches}
    />
  )
}
