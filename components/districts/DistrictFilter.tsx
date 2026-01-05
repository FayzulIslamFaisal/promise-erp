"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";

interface FilterFormValues {
  search?: string;
  sort_order?: string;
}

const DistrictFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, control, reset, watch } = useForm<FilterFormValues>({
    defaultValues: {
      search: searchParams.get("search") || "",
      sort_order: searchParams.get("sort_order") || "",
    },
  });

  const watchedValues = watch();
useEffect(() => {
  const handler = setTimeout(() => {
    const params = new URLSearchParams(searchParams.toString());

    let filterChanged = false;

    Object.entries(watchedValues).forEach(([key, value]) => {
      const currentValue = searchParams.get(key);

      if (value && value !== "") {
        params.set(key, String(value));
        if (currentValue !== String(value)) {
          filterChanged = true;
        }
      } else {
        if (currentValue) {
          filterChanged = true;
        }
        params.delete(key);
      }
    });

    //  filter change হলে page = 1
    if (filterChanged) {
      params.set("page", "1");
    }

    const newUrl = `${pathname}?${params.toString()}`;

    if (newUrl !== `${pathname}?${searchParams.toString()}`) {
      router.replace(newUrl, { scroll: false });
    }
  }, 800);

  return () => clearTimeout(handler);
}, [watchedValues, pathname]);


  const handleReset = () => {
    reset({
      search: "",
      sort_order: "",
    });
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters =
    !!searchParams.get("search") || !!searchParams.get("sort_order");

  return (
    <div className="p-6 mb-6 border rounded-xl bg-card shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <FilterX className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative col-span-1 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search districts..."
            className="pl-10"
            {...register("search")}
          />
        </div>

        <Controller
          name="sort_order"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">ASC</SelectItem>
                <SelectItem value="desc">DESC</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};



 
  
export default DistrictFilter;


