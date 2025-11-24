"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, FilterX } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filters } from "@/apiServices/courseListPublicService";

interface CourseFilterSectionProps {
  filters: Filters;
}

const CourseFilterSection = ({ filters }: CourseFilterSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ------------------ STATES ------------------
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [courseType, setCourseType] = useState(searchParams.get("course_type") || "");
  const [categories, setCategories] = useState(searchParams.get("category_id") || "");
  const [level, setLevel] = useState(searchParams.get("level") || "");
  const [budgetScale, setBudgetScale] = useState(searchParams.get("budget_scale") || "");
  const [coursetrack, setCoursetrack] = useState(searchParams.get("course_track") || "");
  const [deliverymode, setDeliverymode] = useState(searchParams.get("delivery_mode") || "");
  const [batchstatus, setBatchstatus] = useState(searchParams.get("batch_status") || "");

  const [hasPriceInteracted, setHasPriceInteracted] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState<number[]>([
    filters.price_range?.min || 0,
    filters.price_range?.max || 100000,
  ]);

  // ------------------ UPDATE URL ONLY IF DIFFERENT ------------------
  const updateUrlParams = (newParams: URLSearchParams) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (newParams.toString() === currentParams.toString()) {
      return; 
    }

    const newUrl = newParams.toString()
      ? `${pathname}?${newParams.toString()}`
      : pathname;

    router.replace(newUrl, { scroll: false });
  };

  // ------------------ INIT PRICE RANGE ------------------
  useEffect(() => {
    const urlMinPrice = searchParams.get("min_price");
    const urlMaxPrice = searchParams.get("max_price");

    if (urlMinPrice && urlMaxPrice) {
      setTempPriceRange([Number(urlMinPrice), Number(urlMaxPrice)]);
      setHasPriceInteracted(true);
    } else {
      setTempPriceRange([filters.price_range?.min || 0, filters.price_range?.max || 100000]);
      setHasPriceInteracted(false);
    }
  }, [filters.price_range, searchParams]);

  // ------------------ SEARCH DEBOUNCE ------------------
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 600);
    return () => clearTimeout(timeout);
  }, [search]);

  // ------------------ PRICE SLIDER DEBOUNCE ------------------
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(tempPriceRange);

  useEffect(() => {
    if (!hasPriceInteracted) return;

    const timeout = setTimeout(() => {
      setDebouncedPriceRange(tempPriceRange);
    }, 600);

    return () => clearTimeout(timeout);
  }, [tempPriceRange, hasPriceInteracted]);

  // ------------------ SYNC FILTERS → URL ------------------
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (courseType) params.set("course_type", courseType);
    if (categories) params.set("category_id", categories);
    if (level) params.set("level", level);
    if (budgetScale) params.set("budget_scale", budgetScale);

    if (hasPriceInteracted) {
      params.set("min_price", String(debouncedPriceRange[0]));
      params.set("max_price", String(debouncedPriceRange[1]));
    }

    if (coursetrack) params.set("course_track", coursetrack);
    if (deliverymode) params.set("delivery_mode", deliverymode);
    if (batchstatus) params.set("batch_status", batchstatus);

    updateUrlParams(params);
  }, [debouncedSearch, courseType, categories, level, budgetScale, debouncedPriceRange, coursetrack, deliverymode, batchstatus, hasPriceInteracted]);
  
    

  // ------------------ HANDLERS ------------------
  const handlePriceRangeChange = (value: number[]) => {
    setTempPriceRange(value);
    setHasPriceInteracted(true);
  };

  const handleCheckboxChange = (currentValue: string, id: string, checked: boolean) => {
    const currentArray = currentValue ? currentValue.split(",") : [];
    const newArray = checked
      ? [...currentArray, id]
      : currentArray.filter((item) => item !== id);

    return newArray.join(",");
  };

  const handleReset = () => {
    setSearch("");
    setCourseType("");
    setCategories("");
    setLevel("");
    setBudgetScale("");
    setCoursetrack("");
    setDeliverymode("");
    setBatchstatus("");
    setHasPriceInteracted(false);

    setTempPriceRange([filters.price_range?.min || 0, filters.price_range?.max || 100000]);
  };

  const currentCategoriesArray = categories.split(",").filter(Boolean);
  const currentLevelsArray = level.split(",").filter(Boolean);

  const hasActiveFilters =
    search ||
    courseType ||
    categories ||
    level ||
    budgetScale ||
    (hasPriceInteracted && tempPriceRange.some((v) => v !== 0)) ||
    coursetrack ||
    deliverymode ||
    batchstatus;

  // ------------------ JSX ------------------
  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        defaultValue={[
          "search",
          "course-type",
          "course-category",
          "price-range",
          "level",
          "budget-scale",
          "course_track",
        ]}
      >
        {/* Search */}
        <AccordionItem value="search">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Search by Course
          </AccordionTrigger>
          <AccordionContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by course name..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Course Type */}
        <AccordionItem value="course-type">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Course Type ({filters?.course_types?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {filters?.course_types?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-2">
                <Checkbox
                  className="green-checkbox"
                  id={`course-type-radio-${item?.id}`}
                  checked={courseType === item?.name.toString()}
                  onCheckedChange={() => setCourseType(item?.name.toString())}
                />
                <Label htmlFor={`course-type-radio-${item?.id}`} className="text-sm cursor-pointer">
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="course-category">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Course Category ({filters?.categories?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3 max-h-60 overflow-y-auto">
            {filters?.categories?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-2">
                <Checkbox
                  className="green-checkbox"
                  id={`category-checkbox-${item?.id}`}
                  checked={currentCategoriesArray.includes(item?.id.toString())}
                  onCheckedChange={(checked) =>
                    setCategories(
                      handleCheckboxChange(categories, item?.id.toString(), checked as boolean)
                    )
                  }
                />
                <Label htmlFor={`category-checkbox-${item?.id}`} className="text-sm cursor-pointer">
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Course Track */}
        <AccordionItem value="course_track">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Course Track ({filters?.course_track?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3 max-h-60 overflow-y-auto">
            {filters?.course_track?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-2">
                <Checkbox
                  className="green-checkbox"
                  id={`course-track-radio-${item?.id}`}
                  checked={coursetrack === item?.id.toString()}
                  onCheckedChange={() => setCoursetrack(item?.id.toString())}
                />
                <Label
                  htmlFor={`course-track-radio-${item?.id}`}
                  className="text-sm cursor-pointer"
                >
                  {item?.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price-range">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <Slider
              min={filters.price_range?.min || 0}
              max={filters.price_range?.max || 100000}
              step={100}
              value={tempPriceRange}
              onValueChange={handlePriceRangeChange}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="text-base text-secondary">৳ {tempPriceRange[0]}</span>
              <span className="text-base text-secondary">৳ {tempPriceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Level */}
        <AccordionItem value="level">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Level ({filters.levels?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {filters.levels?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-2">
                <Checkbox
                  className="green-checkbox"
                  id={`level-checkbox-${item?.id}`}
                  checked={currentLevelsArray.includes(item?.id.toString())}
                  onCheckedChange={(checked) =>
                    setLevel(handleCheckboxChange(level, item?.id.toString(), checked as boolean))
                  }
                />
                <Label htmlFor={`level-checkbox-${item?.id}`} className="text-sm cursor-pointer">
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Budget Scale */}
        <AccordionItem value="budget-scale">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Budget Scale ({filters.budget_scale?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {filters.budget_scale?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-2">
                <Checkbox
                  className="green-checkbox"
                  id={`budget-scale-radio-${item?.id}`}
                  checked={budgetScale === item?.id.toString()}
                  onCheckedChange={() => setBudgetScale(item?.id.toString())}
                />
                <Label htmlFor={`budget-scale-radio-${item?.id}`} className="text-sm cursor-pointer">
                  {item.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Clear Button */}
      {hasActiveFilters && (
        <Button className="w-full" variant="primary" onClick={handleReset}>
          <FilterX className="h-4 w-4 mr-2" />
          Clear Query Filters
        </Button>
      )}
    </div>
  );
};

export default CourseFilterSection;




