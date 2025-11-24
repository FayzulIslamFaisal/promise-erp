"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, Funnel } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HeaderNavLink from "./HeaderNavLink";
import Image from "next/image";
import Link from "next/link";

export interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
}
const MainHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses", hasDropdown: true },
    { name: "Instructors", href: "/instructors" },
    { name: "Branch", href: "/branch" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/images/logo.svg" alt="Logo" width={213} height={36} />
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-3xl mx-2 border border-secondary rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className=" header-branch-filter-btn h-8 px-4 gap-2 cursor-pointer bg-transparent hover:bg-transparent"
                >
                  <span className="text-base flex items-center gap-2 text-secondary"><Funnel className="h-4 w-4" /> Branch</span>
                  
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Branches</DropdownMenuItem>
                <DropdownMenuItem>Main Campus</DropdownMenuItem>
                <DropdownMenuItem>Downtown Branch</DropdownMenuItem>
                <DropdownMenuItem>Online Campus</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-none pe-16 border-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
                <Button
                    type="button"
                    className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 w-14 rounded-l-none px-8 h-full bg-secondary hover:bg-primary"
                >
                    <Search className="h-8 w-10" />
                </Button>
            </div>
            
          </div>

          {/* Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="primary" >
              Login
            </Button>
            <Button variant="primaryOutline" >
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                {/* Mobile Search */}
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Button variant="default" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Navigation Bar */}
      <HeaderNavLink navLinks={navLinks} />
    </header>
  );
};

export default MainHeader;

