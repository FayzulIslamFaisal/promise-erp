import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Phone } from "lucide-react";
import { AuthButtons, NavLink } from "./HeaderContent";
import Link from "next/link";
import { Category } from "@/apiServices/categoryService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface HeaderNavLinkProps {
  navLinks: NavLink[];
  categories: Category[];
  isStudentDashboard?: boolean;
}

const HeaderNavLink = async ({ navLinks, categories = [], isStudentDashboard = false }: HeaderNavLinkProps) => {
  const session = await getServerSession(authOptions);
  const status = session ? "authenticated" : "unauthenticated";
  return (
    <nav className={`hidden md:flex items-center justify-between w-full`}>
      <div></div>
      <div className={`flex items-center gap-6`}>
        {navLinks.map((link) => (
          <div key={link.name}>
            {link.hasDropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-base font-semibold ease-in-out black-color"
                  >
                    {link.name}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <DropdownMenuItem key={category.id}>
                        <Link
                          href={`/courses?category_id=${category.id}`}
                          className="w-full"
                        >
                          {category.name}
                          {category.total_course && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({category.total_course})
                            </span>
                          )}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      No categories found
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={link.href}
                className="text-base font-semibold ease-in-out black-color"
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </div>
      {isStudentDashboard ? (
        <div className="flex items-center justify-end gap-2 text-sm">
          <AuthButtons
            status={status}
            isAuthenticated={!!session?.accessToken}
            userName={session?.user?.name}
            profileImage={session?.user?.image}
            role={session?.user?.roles}
          />
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2 text-sm w-1/4">
          <Phone className="h-4 w-4 text-secondary" />
          <span className="font-semibold text-secondary text-base">01550-666800</span>
        </div>
      )}
    </nav>
  );
};

export default HeaderNavLink;
