import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ProjectFilterData from "@/components/lms/courseProject/ProjectFilterData";
import ProjectFilterNav from "./ProjectFilterNav";

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
const params = await searchParams;

  return (
    <div className="mx-auto space-y-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Course Project</h1>
        <Button asChild>
          <Link href="/lms/projects/add">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Project
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading Search...</div>}>
        <ProjectFilterNav/>
      </Suspense>

      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <ProjectFilterData searchParams={params} />
      </Suspense>
    </div>
  )
}

export default ProjectsPage
