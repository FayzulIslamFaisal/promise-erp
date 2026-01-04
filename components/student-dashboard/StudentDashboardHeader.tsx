import HeaderNavLink from '../common/HeaderNavLink'
import { NavLink } from '../common/HeaderContent'

const StudentDashboardHeader = () => {
    const navLinks: NavLink[] = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/course", hasDropdown: true },
        { name: "Instructors", href: "/instructors" },
        { name: "Branch", href: "/branch" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <div className="w-full">
            <HeaderNavLink navLinks={navLinks} isStudentDashboard={true} />
        </div>
    );
};

export default StudentDashboardHeader;
