
import HeaderNavLink from "./HeaderNavLink";
import HeaderContent, { NavLink } from "./HeaderContent";
import { CategoriesResponse, Category, getCategories } from "@/apiServices/categoryService";

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/course", hasDropdown: true },
  { name: "Instructors", href: "/instructors" },
  { name: "Branch", href: "/branch" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

interface MainHeaderProps {
  navLinks: NavLink[];
  categories: Category[];
}
/* ================= MAIN HEADER ================= */
const MainHeader = async () => {
  const categoriesResponse:CategoriesResponse = await getCategories();
  const categories = categoriesResponse.data?.categories || [];


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <HeaderContent navLinks={navLinks} />
        </div>
        <div className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <HeaderNavLink navLinks={navLinks} categories={categories} />
          </div>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
