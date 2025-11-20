import CourseFilterSidebar from "@/components/root/courseList/CourseFilterSidebar"
import CourseListData from "@/components/root/courseList/CourseListData"
import HeaderBanner from "@/components/root/courseList/HeaderBanner"

const CoursesPage = () => {
  return (
    <>
        <HeaderBanner />
        <div className="container mx-auto px-4 py-10 md:py-16">
            <h2 className="text-2xl md:text-4xl capitalize font-bold secondary-color mb-5 md:mb-8">All Courses</h2>
            <div className="flex flex-col lg:flex-row gap-8 ">
                <aside className="lg:w-80">
                    <CourseFilterSidebar/>
                </aside>
                <div className="flex-1">
                    <CourseListData/>
                </div>

            </div>
        </div>
    </>
  )
}

export default CoursesPage
