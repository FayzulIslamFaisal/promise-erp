// "use client";
// import { useEffect, useState, useRef } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { Search, FilterX } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Filters } from "@/apiServices/courseListPublicService";

// interface CourseFilterSectionProps {
//   filters: Filters;
// }

// const CourseFilterSection = ({ filters }: CourseFilterSectionProps) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Ref to track previous pathname
//   const previousPathnameRef = useRef<string>(pathname);
//   const hasInitializedRef = useRef<boolean>(false);

//   // ------------------ HELPER FUNCTION TO GET PARAM ------------------
//   const getParam = (key: string) => {
//     return searchParams.get(key) || "";
//   };

//   // ------------------ STATES ------------------
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [courseType, setCourseType] = useState("");
//   const [categories, setCategories] = useState("");
//   const [level, setLevel] = useState("");
//   const [budgetScale, setBudgetScale] = useState("");
//   const [coursetrack, setCoursetrack] = useState("");
//   const [deliverymode, setDeliverymode] = useState("");
//   const [batchstatus, setBatchstatus] = useState("");
//   const [hasPriceInteracted, setHasPriceInteracted] = useState(false);
//   const [tempPriceRange, setTempPriceRange] = useState<number[]>([
//     filters.price_range?.min || 0,
//     filters.price_range?.max || 100000,
//   ]);

//   // ------------------ DETECT PAGE NAVIGATION AND RESET FILTERS ------------------
//   useEffect(() => {
//     // Check if user came from a different page
//     const isComingFromDifferentPage = previousPathnameRef.current !== pathname;

//     // Reset filters if coming from different page (not initial load)
//     if (isComingFromDifferentPage && hasInitializedRef.current) {
//       // Clear all filter states
//       setSearch("");
//       setCourseType("");
//       setCategories("");
//       setLevel("");
//       setBudgetScale("");
//       setCoursetrack("");
//       setDeliverymode("");
//       setBatchstatus("");
//       setHasPriceInteracted(false);
//       setTempPriceRange([
//         filters.price_range?.min || 0,
//         filters.price_range?.max || 100000,
//       ]);

//       // Clear URL parameters except 'page'
//       const currentParams = new URLSearchParams(searchParams.toString());
//       const pageParam = currentParams.get("page");
//       const newParams = new URLSearchParams();

//       if (pageParam) {
//         newParams.set("page", pageParam);
//       }

//       // Update URL without filters
//       const newUrl = newParams.toString()
//         ? `${pathname}?${newParams.toString()}`
//         : pathname;
//       router.replace(newUrl, { scroll: false });
//     }

//     // Update previous pathname
//     previousPathnameRef.current = pathname;

//     // Mark as initialized after first load
//     if (!hasInitializedRef.current) {
//       hasInitializedRef.current = true;
//     }
//   }, [pathname, router, searchParams, filters.price_range]);

//   // ------------------ INITIALIZE STATES FROM URL (only on same page navigation) ------------------
//   useEffect(() => {
//     const currentPathWithoutQuery = pathname.split("?")[0];
//     const previousPathWithoutQuery = previousPathnameRef.current.split("?")[0];

//     if (currentPathWithoutQuery === previousPathWithoutQuery) {
//       setSearch(getParam("search"));
//       setCourseType(getParam("course_type"));
//       setCategories(getParam("category_id"));
//       setLevel(getParam("level"));
//       setBudgetScale(getParam("budget_scale"));
//       setCoursetrack(getParam("course_track"));
//       setDeliverymode(getParam("delivery_mode"));
//       setBatchstatus(getParam("batch_status"));

//       // Initialize price range from URL
//       const urlMinPrice = getParam("min_price");
//       const urlMaxPrice = getParam("max_price");

//       if (urlMinPrice && urlMaxPrice) {
//         const minPrice = parseFloat(urlMinPrice);
//         const maxPrice = parseFloat(urlMaxPrice);

//         if (!isNaN(minPrice) && !isNaN(maxPrice)) {
//           setTempPriceRange([minPrice, maxPrice]);
//           setHasPriceInteracted(true);
//         } else {
//           setTempPriceRange([
//             filters.price_range?.min || 0,
//             filters.price_range?.max || 100000,
//           ]);
//           setHasPriceInteracted(false);
//         }
//       } else {
//         setTempPriceRange([
//           filters.price_range?.min || 0,
//           filters.price_range?.max || 100000,
//         ]);
//         setHasPriceInteracted(false);
//       }

//       // Set debounced search
//       setTimeout(() => {
//         setDebouncedSearch(getParam("search"));
//       }, 100);
//     }
//   }, [searchParams, filters.price_range, pathname]);

//   // ------------------ UPDATE URL ONLY IF DIFFERENT ------------------
//   const updateUrlParams = (newParams: URLSearchParams) => {
//     const currentParams = new URLSearchParams(searchParams.toString());
//     if (newParams.toString() === currentParams.toString()) {
//       return;
//     }
//     const newUrl = newParams.toString()
//       ? `${pathname}?${newParams.toString()}`
//       : pathname;
//     router.replace(newUrl, { scroll: false });
//   };

//   // ------------------ SEARCH DEBOUNCE ------------------
//   useEffect(() => {
//     const timeout = setTimeout(() => setDebouncedSearch(search), 600);
//     return () => clearTimeout(timeout);
//   }, [search]);

//   // ------------------ PRICE SLIDER DEBOUNCE ------------------
//   const [debouncedPriceRange, setDebouncedPriceRange] =
//     useState(tempPriceRange);

//   useEffect(() => {
//     if (!hasPriceInteracted) return;
//     const timeout = setTimeout(() => {
//       setDebouncedPriceRange(tempPriceRange);
//     }, 600);
//     return () => clearTimeout(timeout);
//   }, [tempPriceRange, hasPriceInteracted]);

//   // ------------------ SYNC FILTERS → URL ------------------
//   useEffect(() => {
//     const params = new URLSearchParams();

//     if (debouncedSearch) params.set("search", debouncedSearch);
//     if (courseType) params.set("course_type", courseType);
//     if (categories) params.set("category_id", categories);
//     if (level) params.set("level", level);
//     if (budgetScale) params.set("budget_scale", budgetScale);
//     if (hasPriceInteracted) {
//       params.set("min_price", String(debouncedPriceRange[0]));
//       params.set("max_price", String(debouncedPriceRange[1]));
//     }
//     if (coursetrack) params.set("course_track", coursetrack);
//     if (deliverymode) params.set("delivery_mode", deliverymode);
//     if (batchstatus) params.set("batch_status", batchstatus);

//     // Keep page parameter if it exists
//     const pageParam = searchParams.get("page");
//     if (pageParam) {
//       params.set("page", pageParam);
//     }

//     updateUrlParams(params);
//   }, [
//     debouncedSearch,
//     courseType,
//     categories,
//     level,
//     budgetScale,
//     debouncedPriceRange,
//     coursetrack,
//     deliverymode,
//     batchstatus,
//     hasPriceInteracted,
//     searchParams,
//   ]);

//   // ------------------ HANDLERS ------------------
//   const handlePriceRangeChange = (value: number[]) => {
//     setTempPriceRange(value);
//     setHasPriceInteracted(true);
//   };

//   const handleCheckboxChange = (
//     currentValue: string,
//     id: string,
//     checked: boolean
//   ) => {
//     const currentArray = currentValue ? currentValue.split(",") : [];
//     const newArray = checked
//       ? [...currentArray, id]
//       : currentArray.filter((item) => item !== id);
//     return newArray.join(",");
//   };

//   const handleReset = () => {
//     // Clear all states
//     setSearch("");
//     setCourseType("");
//     setCategories("");
//     setLevel("");
//     setBudgetScale("");
//     setCoursetrack("");
//     setDeliverymode("");
//     setBatchstatus("");
//     setHasPriceInteracted(false);
//     setTempPriceRange([
//       filters.price_range?.min || 0,
//       filters.price_range?.max || 100000,
//     ]);

//     // Navigate to clean URL (keep only page parameter if exists)
//     const pageParam = searchParams.get("page");
//     const newParams = new URLSearchParams();

//     if (pageParam) {
//       newParams.set("page", pageParam);
//     }

//     const newUrl = newParams.toString()
//       ? `${pathname}?${newParams.toString()}`
//       : pathname;
//     router.replace(newUrl, { scroll: false });
//   };

//   const currentCategoriesArray = categories.split(",").filter(Boolean);
//   const currentLevelsArray = level.split(",").filter(Boolean);

//   const hasActiveFilters =
//     search ||
//     courseType ||
//     categories ||
//     level ||
//     budgetScale ||
//     (hasPriceInteracted && tempPriceRange.some((v) => v !== 0)) ||
//     coursetrack ||
//     deliverymode ||
//     batchstatus;

//   // ------------------ JSX ------------------
//   return (
//     <div className="space-y-4">
//       <Accordion
//         type="multiple"
//         defaultValue={[
//           "search",
//           "course-type",
//           "course-category",
//           "price-range",
//           "level",
//           "budget-scale",
//           "course_track",
//         ]}
//       >
//         {/* Search */}
//         <AccordionItem value="search">
//           <AccordionTrigger className="text-base font-semibold text-secondary">
//             Search by Course
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search by course name..."
//                 className="pl-10"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Course Type */}
//         <AccordionItem value="course-type">
//           <AccordionTrigger className="text-base font-semibold text-secondary">
//             Course Type ({filters?.course_types?.length || 0})
//           </AccordionTrigger>
//           <AccordionContent className="space-y-3">
//             {filters?.course_types?.map((item) => (
//               <div key={item?.id} className="flex items-center space-x-2">
//                 <Checkbox
//                   className="green-checkbox"
//                   id={`course-type-radio-${item?.id}`}
//                   checked={courseType === item?.name.toString()}
//                   onCheckedChange={() =>
//                     setCourseType(
//                       courseType === item?.name.toString()
//                         ? ""
//                         : item?.name.toString()
//                     )
//                   }
//                 />
//                 <Label
//                   htmlFor={`course-type-radio-${item?.id}`}
//                   className="text-sm cursor-pointer"
//                 >
//                   {item.name}
//                 </Label>
//               </div>
//             ))}
//           </AccordionContent>
//         </AccordionItem>

//         {/* Categories */}
//         <AccordionItem value="course-category">
//           <AccordionTrigger className="text-base font-semibold text-secondary">
//             Course Category ({filters?.categories?.length || 0})
//           </AccordionTrigger>
//           <AccordionContent className="space-y-3 max-h-60 overflow-y-auto">
//             {filters?.categories?.map((item) => (
//               <div key={item?.id} className="flex items-center space-x-2">
//                 <Checkbox
//                   className="green-checkbox"
//                   id={`category-checkbox-${item?.id}`}
//                   checked={currentCategoriesArray.includes(item?.id.toString())}
//                   onCheckedChange={(checked) =>
//                     setCategories(
//                       handleCheckboxChange(
//                         categories,
//                         item?.id.toString(),
//                         checked as boolean
//                       )
//                     )
//                   }
//                 />
//                 <Label
//                   htmlFor={`category-checkbox-${item?.id}`}
//                   className="text-sm cursor-pointer"
//                 >
//                   {item.name}
//                 </Label>
//               </div>
//             ))}
//           </AccordionContent>
//         </AccordionItem>

//         {/* Course Track */}
//         <AccordionItem value="course_track">
//           <AccordionTrigger className="text-base font-semibold text-secondary">
//             Course Track ({filters?.course_track?.length || 0})
//           </AccordionTrigger>
//           <AccordionContent className="space-y-3 max-h-60 overflow-y-auto">
//             {filters?.course_track?.map((item) => (
//               <div key={item?.id} className="flex items-center space-x-2">
//                 <Checkbox
//                   className="green-checkbox"
//                   id={`course-track-radio-${item?.id}`}
//                   checked={coursetrack === item?.id.toString()}
//                   onCheckedChange={() =>
//                     setCoursetrack(
//                       coursetrack === item?.id.toString()
//                         ? ""
//                         : item?.id.toString()
//                     )
//                   }
//                 />
//                 <Label
//                   htmlFor={`course-track-radio-${item?.id}`}
//                   className="text-sm cursor-pointer"
//                 >
//                   {item?.name}
//                 </Label>
//               </div>
//             ))}
//           </AccordionContent>
//         </AccordionItem>

//         {/* Price Range */}
//         <AccordionItem value="price-range">
//           <AccordionTrigger className="text-base font-semibold text-secondary">
//             Price Range
//           </AccordionTrigger>
//           <AccordionContent>
//             <Slider
//               min={filters.price_range?.min || 0}
//               max={filters.price_range?.max || 100000}
//               step={100}
//               value={tempPriceRange}
//               onValueChange={handlePriceRangeChange}
//               className="py-4"
//             />
//             <div className="flex justify-between text-sm text-muted-foreground">
//               <span className="text-base text-secondary">
//                 ৳ {tempPriceRange[0]}
//               </span>
//               <span className="text-base text-secondary">
//                 ৳ {tempPriceRange[1]}
//               </span>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Level */}
//         <AccordionItem value="level">
//           <AccordionTrigger className="text-base font-semibold text-secondary">
//             Level ({filters.levels?.length || 0})
//           </AccordionTrigger>
//           <AccordionContent className="space-y-3">
//             {filters.levels?.map((item) => (
//               <div key={item?.id} className="flex items-center space-x-2">
//                 <Checkbox
//                   className="green-checkbox"
//                   id={`level-checkbox-${item?.id}`}
//                   checked={currentLevelsArray.includes(item?.id.toString())}
//                   onCheckedChange={(checked) =>
//                     setLevel(
//                       handleCheckboxChange(
//                         level,
//                         item?.id.toString(),
//                         checked as boolean
//                       )
//                     )
//                   }
//                 />
//                 <Label
//                   htmlFor={`level-checkbox-${item?.id}`}
//                   className="text-sm cursor-pointer"
//                 >
//                   {item.name}
//                 </Label>
//               </div>
//             ))}
//           </AccordionContent>
//         </AccordionItem>

//         {/* Budget Scale */}
//         <AccordionItem value="budget-scale">
//           <AccordionTrigger className="text-base font-semibold text-secondary">
//             Budget Scale ({filters.budget_scale?.length || 0})
//           </AccordionTrigger>
//           <AccordionContent className="space-y-3">
//             {filters.budget_scale?.map((item) => (
//               <div key={item?.id} className="flex items-center space-x-2">
//                 <Checkbox
//                   className="green-checkbox"
//                   id={`budget-scale-radio-${item?.id}`}
//                   checked={budgetScale === item?.id.toString()}
//                   onCheckedChange={() =>
//                     setBudgetScale(
//                       budgetScale === item?.id.toString()
//                         ? ""
//                         : item?.id.toString()
//                     )
//                   }
//                 />
//                 <Label
//                   htmlFor={`budget-scale-radio-${item?.id}`}
//                   className="text-sm cursor-pointer"
//                 >
//                   {item.label}
//                 </Label>
//               </div>
//             ))}
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>

//       {/* Clear Button */}
//       {hasActiveFilters && (
//         <Button className="w-full" onClick={handleReset}>
//           <FilterX className="h-4 w-4 mr-2" />
//           Clear Query Filters
//         </Button>
//       )}
//     </div>
//   );
// };

// export default CourseFilterSection;

"use client";
import { useEffect, useState, useRef } from "react";
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

  const previousPathnameRef = useRef<string>(pathname);
  const hasInitializedRef = useRef<boolean>(false);

  const getParam = (key: string) => searchParams.get(key) || "";

  // ------------------ STATES ------------------
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [courseType, setCourseType] = useState("");
  const [categories, setCategories] = useState("");
  const [level, setLevel] = useState("");
  const [budgetScale, setBudgetScale] = useState("");
  const [coursetrack, setCoursetrack] = useState("");
  const [deliverymode, setDeliverymode] = useState("");
  const [batchstatus, setBatchstatus] = useState("");

  const [hasPriceInteracted, setHasPriceInteracted] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState<number[]>([
    filters.price_range?.min || 0,
    filters.price_range?.max || 100000,
  ]);

  // ------------------ RESET ON PAGE CHANGE ------------------
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      previousPathnameRef.current = pathname;
      return;
    }

    if (previousPathnameRef.current !== pathname) {
      setSearch("");
      setDebouncedSearch("");
      setCourseType("");
      setCategories("");
      setLevel("");
      setBudgetScale("");
      setCoursetrack("");
      setDeliverymode("");
      setBatchstatus("");
      setHasPriceInteracted(false);
      setTempPriceRange([
        filters.price_range?.min || 0,
        filters.price_range?.max || 100000,
      ]);

      router.replace(pathname, { scroll: false });
      previousPathnameRef.current = pathname;
    }
  }, [pathname, router, filters.price_range]);

  // ------------------ INITIALIZE FROM URL ------------------
  useEffect(() => {
    setSearch(getParam("search"));
    setCourseType(getParam("course_type"));
    setCategories(getParam("category_id"));
    setLevel(getParam("level"));
    setBudgetScale(getParam("budget_scale"));
    setCoursetrack(getParam("course_track"));
    setDeliverymode(getParam("delivery_mode"));
    setBatchstatus(getParam("batch_status"));

    const minPrice = getParam("min_price");
    const maxPrice = getParam("max_price");

    if (minPrice && maxPrice) {
      const min = Number(minPrice);
      const max = Number(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        setTempPriceRange([min, max]);
        setHasPriceInteracted(true);
      }
    } else {
      setHasPriceInteracted(false);
      setTempPriceRange([
        filters.price_range?.min || 0,
        filters.price_range?.max || 100000,
      ]);
    }

    setTimeout(() => {
      setDebouncedSearch(getParam("search"));
    }, 100);
  }, [searchParams, filters.price_range]);

  // ------------------ SEARCH DEBOUNCE ------------------
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 600);
    return () => clearTimeout(timeout);
  }, [search]);

  // ------------------ PRICE DEBOUNCE ------------------
  const [debouncedPriceRange, setDebouncedPriceRange] =
    useState(tempPriceRange);

  useEffect(() => {
    if (!hasPriceInteracted) return;
    const timeout = setTimeout(() => {
      setDebouncedPriceRange(tempPriceRange);
    }, 600);
    return () => clearTimeout(timeout);
  }, [tempPriceRange, hasPriceInteracted]);

  // ------------------ SYNC STATE → URL ------------------
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (courseType) params.set("course_type", courseType);
    if (categories) params.set("category_id", categories);
    if (level) params.set("level", level);
    if (budgetScale) params.set("budget_scale", budgetScale);
    if (coursetrack) params.set("course_track", coursetrack);
    if (deliverymode) params.set("delivery_mode", deliverymode);
    if (batchstatus) params.set("batch_status", batchstatus);

    if (hasPriceInteracted) {
      params.set("min_price", String(debouncedPriceRange[0]));
      params.set("max_price", String(debouncedPriceRange[1]));
    }

    const pageParam = searchParams.get("page");
    if (pageParam) params.set("page", pageParam);

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl, { scroll: false });
  }, [
    debouncedSearch,
    courseType,
    categories,
    level,
    budgetScale,
    coursetrack,
    deliverymode,
    batchstatus,
    debouncedPriceRange,
    hasPriceInteracted,
    pathname,
    router,
    searchParams,
  ]);

  // ------------------ HELPERS ------------------
  const handleCheckboxChange = (
    currentValue: string,
    id: string,
    checked: boolean
  ) => {
    const arr = currentValue ? currentValue.split(",") : [];
    return checked
      ? [...arr, id].join(",")
      : arr.filter((v) => v !== id).join(",");
  };

  const handleReset = () => {
    router.replace(pathname, { scroll: false });
  };

  const currentCategoriesArray = categories.split(",").filter(Boolean);
  const currentLevelsArray = level.split(",").filter(Boolean);

  const hasActiveFilters =
    search ||
    courseType ||
    categories ||
    level ||
    budgetScale ||
    coursetrack ||
    deliverymode ||
    batchstatus ||
    hasPriceInteracted;

  // ------------------ JSX ------------------
  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        defaultValue={[
          "search",
          "course-type",
          "course-category",
          "course_track",
          "price-range",
          "level",
          "budget-scale",
        ]}
      >
        {/* SEARCH */}
        <AccordionItem value="search">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Search by Course
          </AccordionTrigger>
          <AccordionContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search by course name..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* COURSE TYPE */}
        <AccordionItem value="course-type">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Course Type ({filters.course_types?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {filters.course_types?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`course-type-${item.id}`}
                  checked={courseType === item.name}
                  onCheckedChange={() =>
                    setCourseType(courseType === item.name ? "" : item.name)
                  }
                />
                <Label
                  htmlFor={`course-type-${item.id}`}
                  className="cursor-pointer"
                >
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* CATEGORY */}
        <AccordionItem value="course-category">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Course Category ({filters.categories?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3 max-h-60 overflow-y-auto">
            {filters.categories?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-checkbox-${item.id}`}
                  checked={currentCategoriesArray.includes(item.id.toString())}
                  onCheckedChange={(checked) =>
                    setCategories(
                      handleCheckboxChange(
                        categories,
                        item.id.toString(),
                        checked as boolean
                      )
                    )
                  }
                />
                <Label
                  htmlFor={`category-checkbox-${item.id}`}
                  className="cursor-pointer"
                >
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* COURSE TRACK */}
        <AccordionItem value="course_track">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Course Track ({filters.course_track?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {filters.course_track?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`course-track-${item.id}`}
                  checked={coursetrack === item.id.toString()}
                  onCheckedChange={() =>
                    setCoursetrack(
                      coursetrack === item.id.toString()
                        ? ""
                        : item.id.toString()
                    )
                  }
                />
                <Label
                  htmlFor={`course-track-${item.id}`}
                  className="cursor-pointer"
                >
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* PRICE */}
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
              onValueChange={(v) => {
                setTempPriceRange(v);
                setHasPriceInteracted(true);
              }}
              className="py-4"
            />
            <div className="flex justify-between text-sm">
              <span>৳ {tempPriceRange[0]}</span>
              <span>৳ {tempPriceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* LEVEL */}
        <AccordionItem value="level">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Level ({filters.levels?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {filters.levels?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${item.id}`}
                  checked={currentLevelsArray.includes(item.id.toString())}
                  onCheckedChange={(checked) =>
                    setLevel(
                      handleCheckboxChange(
                        level,
                        item.id.toString(),
                        checked as boolean
                      )
                    )
                  }
                />
                <Label htmlFor={`level-${item.id}`} className="cursor-pointer">
                  {item.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* BUDGET SCALE */}
        <AccordionItem value="budget-scale">
          <AccordionTrigger className="text-base font-semibold text-secondary">
            Budget Scale ({filters.budget_scale?.length || 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {filters.budget_scale?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`budget-scale-${item.id}`}
                  checked={budgetScale === item.id.toString()}
                  onCheckedChange={() =>
                    setBudgetScale(
                      budgetScale === item.id.toString()
                        ? ""
                        : item.id.toString()
                    )
                  }
                />
                <Label
                  htmlFor={`budget-scale-${item.id}`}
                  className="cursor-pointer"
                >
                  {item.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {hasActiveFilters && (
        <Button className="w-full" onClick={handleReset}>
          <FilterX className="h-4 w-4 mr-2" />
          Clear Query Filters
        </Button>
      )}
    </div>
  );
};

export default CourseFilterSection;
