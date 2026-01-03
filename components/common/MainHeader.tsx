"use client";

import HeaderNavLink from "./HeaderNavLink";
import HeaderContainer from "./HeaderContainer";
import HeaderContent, { NavLink } from "./HeaderContent";

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/course", hasDropdown: true },
  { name: "Instructors", href: "/instructors" },
  { name: "Branch", href: "/branch" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

/* ================= MAIN HEADER ================= */
const MainHeader = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <HeaderContent navLinks={navLinks} />
        </div>
        <HeaderNavLink navLinks={navLinks} />
      </header>
    </>
  );
};

export default MainHeader;
