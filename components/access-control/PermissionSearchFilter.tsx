"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFormValues {
  search?: string;
}

const PermissionSearchFilter = ({
  placeholder = "Search...",
  debounce = 800,
}: {
  placeholder?: string;
  debounce?: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, watch, reset } = useForm<SearchFormValues>({
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  });

  const searchValue = watch("search") || "";
  const debouncedSearch = useDebounce(searchValue, debounce);
  const hasSearch = (searchParams.get("search") || "") !== "";

  /**
   * Sync debounced search → URL
   */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSearch = params.get("search") || "";

    if (debouncedSearch !== currentSearch) {
      params.delete("page");

      if (debouncedSearch.trim() !== "") {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  /**
   * Clear Filters
   */
  const handleClear = () => {
    reset({ search: "" });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          {...register("search")}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>

      {/* Clear Filters */}
      {hasSearch && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <FilterX className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default PermissionSearchFilter;
