"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, Loader2 } from "lucide-react";
import { Suspense, useEffect, useState, useTransition } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import HeaderBranchDropdown from "./HeaderBranchDropdown";
import {
  CourseSearchResponse,
  getPublicCourseSearch,
} from "@/apiServices/homePageService";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";

export interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

interface AuthButtonsProps {
  status: "loading" | "authenticated" | "unauthenticated";
  isAuthenticated: boolean;
  userName?: string | null;
  profileImage?: string | null;
  role?: string | string[] | null;
}

interface HeaderContentProps {
  navLinks: NavLink[];
}

/* ================= ROLE BASED DASHBOARD ================= */
const getDashboardUrl = (role: string | string[] | null | undefined) => {
  if (!role) return "/student/dashboard";

  const roles = Array.isArray(role) ? role : [role];

  if (roles.includes("super-admin")) {
    return "/dashboard";
  }

  return "/student/dashboard";
};

/* ================= AUTH BUTTONS ================= */
const AuthButtons = ({
  status,
  isAuthenticated,
  userName,
  profileImage,
  role,
}: AuthButtonsProps) => {
  if (status === "loading") {
    return <Loader2 className="h-5 w-5 animate-spin" />;
  }

  if (isAuthenticated) {
    const dashboardUrl = getDashboardUrl(role);

    return (
      <div className="flex items-center gap-3">
        <Button onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </Button>

        <Link href={dashboardUrl}>
          <div className="flex items-center gap-1 cursor-pointer">
            <Image
              src={profileImage || "/images/profile_avatar.png"}
              alt={userName || ""}
              width={30}
              height={30}
              className="rounded-full border-2 border-secondary object-cover"
            />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/register">Register</Link>
      </Button>
    </>
  );
};

/* ================= HEADER CONTENT ================= */
const HeaderContent = ({ navLinks }: HeaderContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [results, setResults] = useState<CourseSearchResponse | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const isAuthenticated = !!session?.accessToken;

  const debouncedSearch = useDebounce(searchQuery, 800);
  const router = useRouter();

  // Debounced search effect
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults(null);
      return;
    }

    startTransition(async () => {
      try {
        const res = await getPublicCourseSearch({
          params: { search: debouncedSearch },
        });

        if (
          res &&
          (res?.data?.courses?.length > 0 || res?.data?.categories?.length > 0)
        ) {
          setResults(res);
          setOpenModal(true);
        } else {
          setResults(null);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setResults(null);
      }
    });
  }, [debouncedSearch]);

  const handleSearchClick = () => {
    if (!searchQuery.trim()) return;

    if (results) {
      setOpenModal(true);
    } else {
      startTransition(async () => {
        try {
          const res = await getPublicCourseSearch({
            params: { search: searchQuery },
          });
          if (res) {
            setResults(res);
            setOpenModal(true);
          }
        } catch (error) {
          console.error("Search failed:", error);
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={213}
              height={36}
            />
          </Link>
        </div>

        {/* Search & Branch Filter */}
        <div className="hidden lg:flex items-center flex-1 max-w-3xl mx-2 border border-secondary rounded-md">
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderBranchDropdown />
          </Suspense>

          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-11 rounded-none pe-16 border-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-14 border-0 rounded-l-none px-8 h-full bg-secondary hover:bg-primary"
              onClick={handleSearchClick}
              disabled={!searchQuery.trim() || isPending}
            >
              {isPending ? (
                <Loader2 className="h-8 w-10 animate-spin" />
              ) : (
                <Search className="h-8 w-10" />
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex gap-3">
          <AuthButtons
            status={status}
            isAuthenticated={isAuthenticated}
            userName={session?.user?.name}
            profileImage={session?.user?.image}
            role={session?.user?.roles}
          />
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="px-4">
            <nav className="mt-14 space-y-2 flex flex-col ">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-4 flex gap-2">
              <AuthButtons
                status={status}
                isAuthenticated={isAuthenticated}
                userName={session?.user?.name}
                profileImage={session?.user?.image}
                role={session?.user?.roles}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Result Modal */}
      <Dialog
        open={openModal}
        onOpenChange={(isOpen) => {
          setOpenModal(isOpen);
          if (!isOpen) {
            setSearchQuery("");
            setResults(null);
          }
        }}
      >
        <DialogContent className="max-w-lg z-99999 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Search Results for "{searchQuery}"
              {isPending && (
                <Loader2 className="ml-2 h-4 w-4 inline animate-spin" />
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* No Results */}
            {!isPending &&
              (!results ||
                (results?.data?.courses?.length === 0 &&
                  results?.data?.categories?.length === 0)) && (
                <div className="text-center text-2xl py-8 text-secondary">
                  No results found
                </div>
              )}

            {/* Loading State */}
            {isPending && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}

            {/* Courses */}
            {!isPending &&
              results?.data?.courses &&
              results.data.courses.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Courses</h3>
                  <div className="space-y-2">
                    {results.data.courses.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setOpenModal(false);
                          router.push(`/courses/${item.slug}`);
                        }}
                        className="p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.image || "/images/placeholder_img.jpg"}
                            alt={item.title}
                            width={50}
                            height={50}
                            className="object-cover rounded-full"
                          />
                          <span className="font-base">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Categories */}
            {!isPending &&
              results?.data?.categories &&
              results.data.categories.length > 0 && (
                <div>
                  <h3 className="font-semibold mt-4 mb-2 text-lg">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {results.data.categories.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setOpenModal(false);
                          router.push(`/courses/${item.slug}`);
                        }}
                        className="p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.image || "/images/placeholder_img.jpg"}
                            alt={item.title}
                            width={50}
                            height={50}
                            className="object-cover rounded-full"
                          />
                          <span className="font-base">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderContent;
