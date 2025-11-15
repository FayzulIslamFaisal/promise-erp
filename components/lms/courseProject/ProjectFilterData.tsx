
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CourseProject, getCourseProject } from "@/apiServices/courseProjectsService";
import DeleteButton from "./DeleteButton";


const ProjectFilterData = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
})=> {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === "string" ? Number(resolvedSearchParams.page) : 1;
  const params = {
    search:
      typeof resolvedSearchParams.search === "string"
        ? resolvedSearchParams.search
        : undefined,
    sort_order:
      typeof resolvedSearchParams.sort_order === "string"
        ? resolvedSearchParams.sort_order
        : undefined,
    status:
      typeof resolvedSearchParams.status === "string"
        ? resolvedSearchParams.status
        : undefined,
    division_id:
      typeof resolvedSearchParams.division_id === "string"
        ? resolvedSearchParams.division_id
        : undefined,
    branch_id:
      typeof resolvedSearchParams.branch_id === "string"
        ? resolvedSearchParams.branch_id
        : undefined,
    course_id:
      typeof resolvedSearchParams.course_id === "string"
        ? resolvedSearchParams.course_id
        : undefined,
  };

  let results;
  try {
    results = await getCourseProject( page, params );
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    } else {
      return <ErrorComponent message="An unexpected error occurred." />;
    }
  }

  const courseProjects = results?.data?.course_projects || [];
  
  if (!courseProjects.length) {
    return <NotFoundComponent message="No Course Projects Found." />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Branch</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courseProjects.map((project: CourseProject , index: number) => (
            <TableRow key={project?.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge
                        variant="default"
                        role="button"
                        tabIndex={0}
                        className="cursor-pointer select-none"
                      >
                        Action
                      </Badge>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="center">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/lms/projects/${project?.id}/edit`}
                          className="flex items-center cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Manage
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteButton id={project?.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </TableCell>
              <TableCell className="font-medium">
                <Image
                  src={project?.image || "/images/placeholder.png"}
                  alt={project?.title}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{project?.title}</TableCell>
              <TableCell>{project?.batch?.name}</TableCell>
              <TableCell>{project?.branch?.name}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ProjectFilterData;

