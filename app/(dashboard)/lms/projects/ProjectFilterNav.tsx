import ProjectFilter from './ProjectFilter'
import { getBranches } from "@/apiServices/branchService"
import { getDivisions } from "@/apiServices/divisionService"
import { getCourses } from "@/apiServices/courseService"
const ProjectFilterNav = async() => {
    const [divisionsRes, branchesRes, coursesRes] = await Promise.all([getDivisions(),getBranches(), getCourses(),])
  return (
    <ProjectFilter
        divisions={divisionsRes.data.divisions}
        branches={branchesRes.data.branches}
        courses={coursesRes?.data?.courses}
    />
  )
}

export default ProjectFilterNav
