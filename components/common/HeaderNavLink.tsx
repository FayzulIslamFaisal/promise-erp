import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Phone } from "lucide-react";
import { NavLink } from "./HeaderContent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "@/apiServices/categoryService";
import { Category } from "@/apiServices/categoryService";

interface HeaderNavLinkProps {
  navLinks: NavLink[];
}

const HeaderNavLink = ({ navLinks }: HeaderNavLinkProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data?.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [])

  return (
    <div className="border-t bg-muted/30">
      <div className="container mx-auto px-4">
        <nav className="hidden md:flex items-center py-3">
          <div className="flex items-center justify-center gap-6 w-3/4">
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
                      {loading ? (
                        <DropdownMenuItem disabled>
                          Loading categories...
                        </DropdownMenuItem>
                      ) : categories.length > 0 ? (
                        categories.map((category) => (
                          <DropdownMenuItem key={category.id}>
                            <Link
                              href={`/courses?category=${category.slug}`}
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
          <div className="flex items-center justify-end gap-2 text-sm w-1/4">
            <Phone className="h-4 w-4 text-secondary" />
            <span className="font-semibold text-secondary text-base">01550-666800</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderNavLink;
