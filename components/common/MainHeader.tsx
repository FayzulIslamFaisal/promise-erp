// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search, Menu, Funnel } from "lucide-react";
// import { use, useEffect, useState, useTransition } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import HeaderNavLink from "./HeaderNavLink";
// import Image from "next/image";
// import Link from "next/link";
// import { getPublicBranchList, HeaderBranchList } from "@/apiServices/homePageService";
// import { useRouter, useSearchParams } from "next/navigation";

// export interface NavLink {
//   name: string;
//   href: string;
//   hasDropdown?: boolean;
// }
// const MainHeader = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [branchList, setBranchList] = useState<HeaderBranchList[]>([]);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const navLinks: NavLink[] = [
//     { name: "Home", href: "/" },
//     { name: "Courses", href: "/course", hasDropdown: true },
//     { name: "Instructors", href: "/instructors" },
//     { name: "Branch", href: "/branch" },
//     { name: "Blog", href: "/blog" },
//     { name: "Contact", href: "/contact" },
//   ];

//   useEffect(() => {
//     const fetchBranchList = async () => {
//       try {
//         const res = await getPublicBranchList();
//         if (res.success) {
//           setBranchList(res.data.branches);
//         }
//       } catch (err) {
//         console.error("Failed to fetch branch list:", err);
//       }
//     };
//     fetchBranchList();
//   }, []);

//   // Handle branch selection
//   const handleBranchSelect = (branchId: number) => {
//     startTransition(() => {
//       const params = new URLSearchParams(Array.from(searchParams.entries()));
//       params.set("branch", branchId.toString());
//       router.push(`/?${params.toString()}`);
//     });
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <Link href="/">
//               <Image
//                 src="/images/logo.svg"
//                 alt="Logo"
//                 width={213}
//                 height={36}
//               />
//             </Link>
//           </div>

//           {/* Search Bar - Hidden on mobile */}
//           <div className="hidden md:flex items-center flex-1 max-w-3xl mx-2 border border-secondary rounded-md">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="header-branch-filter-btn h-8 px-4 gap-2 bg-transparent hover:bg-transparent border-0">
//                   <span className="text-base flex items-center gap-2 text-secondary">
//                     <Funnel className="h-4 w-4" /> Branch
//                   </span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => handleBranchSelect(0)}>
//                   All Branches
//                 </DropdownMenuItem>
//                 {branchList.map((branch) => (
//                   <DropdownMenuItem
//                     key={branch.id}
//                     onClick={() => handleBranchSelect(branch.id)}
//                   >
//                     {branch.name}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <div className="relative flex-1">
//               <Input
//                 type="search"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="h-11 rounded-none pe-16 border-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//               />
//               <Button
//                 type="button"
//                 className="absolute right-0 top-1/2 -translate-y-1/2 w-14 border-0 rounded-l-none px-8 h-full bg-secondary hover:bg-primary"
//               >
//                 <Search className="h-8 w-10" />
//               </Button>
//             </div>
//           </div>

//           {/* Auth Buttons - Hidden on mobile */}
//           <div className="hidden md:flex items-center gap-3">
//             <Button>
//               <Link href="/login">Login</Link>
//             </Button>
//             <Button>
//               <Link href="/register">Register</Link>
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px]">
//               <div className="flex flex-col gap-4 mt-8">
//                 {/* Mobile Search */}
//                 <div className="relative">
//                   <Input
//                     type="search"
//                     placeholder="Search"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pr-10"
//                   />
//                   <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 </div>

//                 {/* Mobile Navigation */}
//                 <nav className="flex flex-col gap-2">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.name}
//                       href={link.href}
//                       className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
//                     >
//                       {link.name}
//                     </Link>
//                   ))}
//                 </nav>

//                 {/* Mobile Auth Buttons */}
//                 <div className="flex flex-col gap-2 pt-4 border-t">
//                   <Button variant="default" className="w-full">
//                     Login
//                   </Button>
//                   <Button variant="outline" className="w-full">
//                     Register
//                   </Button>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <HeaderNavLink navLinks={navLinks} />
//     </header>
//   );
// };

// export default MainHeader;


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { Suspense, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HeaderNavLink from "./HeaderNavLink";
import Image from "next/image";
import Link from "next/link";
import HeaderBranchDropdown from "./HeaderBranchDropdown";


export interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

const MainHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/course", hasDropdown: true },
    { name: "Instructors", href: "/instructors" },
    { name: "Branch", href: "/branch" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];



  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/images/logo.svg" alt="Logo" width={213} height={36} />
            </Link>
          </div>

          {/* Search & Branch Filter */}
          <div className="hidden md:flex items-center flex-1 max-w-3xl mx-2 border border-secondary rounded-md">
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderBranchDropdown />
            </Suspense>

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
                className="absolute right-0 top-1/2 -translate-y-1/2 w-14 border-0 rounded-l-none px-8 h-full bg-secondary hover:bg-primary"
              >
                <Search className="h-8 w-10" />
              </Button>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button>
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
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

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

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

      <HeaderNavLink navLinks={navLinks} />
    </header>
  );
};

export default MainHeader;

