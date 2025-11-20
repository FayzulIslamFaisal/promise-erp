import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Phone } from "lucide-react";
import { NavLink } from "./MainHeader";
import Link from "next/link";

interface HeaderNavLinkProps {
  navLinks: NavLink[];
}

const HeaderNavLink = ({ navLinks }: HeaderNavLinkProps) => {
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
                      <DropdownMenuItem asChild>
                        <Link href="/courses/web-development">
                          Web Development
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/courses/data-science">Data Science</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/courses/business">Business</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/courses/design">Design</Link>
                      </DropdownMenuItem>
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
            <Phone className="h-4 w-4 secondary-color" />
            <span className="font-semibold secondary-color text-base">01550-666800</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderNavLink;
