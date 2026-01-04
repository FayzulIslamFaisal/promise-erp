import HeaderNavLink from '../common/HeaderNavLink'
import { NavLink } from '../common/HeaderContent'
import { CategoriesResponse, getCategories } from '@/apiServices/categoryService'

const StudentDashboardHeader = async () => {
    const navLinks: NavLink[] = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/course", hasDropdown: true },
        { name: "Instructors", href: "/instructors" },
        { name: "Branch", href: "/branch" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]

    const categoriesResponse: CategoriesResponse = await getCategories();
    const categories = categoriesResponse.data?.categories || [];

    return (
        <div className="w-full">
            <HeaderNavLink navLinks={navLinks} categories={categories} isStudentDashboard={true} />
        </div>
    );
};

export default StudentDashboardHeader;
