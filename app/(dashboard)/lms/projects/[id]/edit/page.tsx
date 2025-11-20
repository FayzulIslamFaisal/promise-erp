import ProjectForm, { Batch, Course } from '@/components/lms/courseProject/ProjectForm'
import { getCourseProjectById } from '@/apiServices/courseProjectsService'
import { getBatches } from '@/apiServices/batchService'
import { getCourses } from '@/apiServices/courseService'

interface EditProjectPageProps {
  params: { id: number }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const {id} = await params
  try {
    // Fetch all data server-side in parallel
    const [batchRes, courseRes, projectRes] = await Promise.all([
      getBatches(),
      getCourses(),
      getCourseProjectById(id),
    ])

    const batches: Batch[] = batchRes.data?.batches || []
    const courses: Course[] = courseRes.data?.courses || []
    const project = projectRes.data

    if (!project) return <div>No project data found.</div>

    return (
      <ProjectForm
        title="Edit Project"
        batches={batches}
        courses={courses}
        project={project}
      />
    )
  } catch (error: any) {
    return <div>Error: {error?.message || 'Something went wrong.'}</div>
  }
}
