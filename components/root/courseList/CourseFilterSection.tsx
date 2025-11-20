// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Slider } from "@/components/ui/slider";
// import { Search } from 'lucide-react'


// const CourseFilterSection = () => {
//   return (
//     <div className="space-y-4">
//       {/* Search */}
//       <div className="space-y-3">
//         <Label className="text-base capitalize secondary-color font-semibold">Search by course </Label>
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search by course name..."
//             defaultValue="Search..."
//             className="pl-10"
//           />
//         </div>
//       </div>

//       {/* Course Type */}
//       <div className="space-y-3">
//         <Label className="text-base capitalize secondary-color font-semibold">Course Type</Label>
//         <div className="space-y-2">
//             <div  className="flex items-center space-x-2">
//               <Checkbox
//               />
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                 All Courses
//               </Label>
//             </div>
//             <div  className="flex items-center space-x-2">
//               <Checkbox
//               />
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                 Regular Courses
//               </Label>
//             </div>
//             <div  className="flex items-center space-x-2">
//               <Checkbox/>
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                Free MOOC Courses
//               </Label>
//             </div>
//             <div  className="flex items-center space-x-2">
//               <Checkbox/>
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                 Live Batches
//               </Label>
//             </div>
//         </div>
//       </div>

//        {/* Course category */}
//       <div className="space-y-3">
//         <Label className="text-base capitalize secondary-color font-semibold">Course Category</Label>
//         <div className="space-y-2">
//             <div  className="flex items-center space-x-2">
//               <Checkbox
//               />
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                 Web & Software Development
//               </Label>
//             </div>
//             <div  className="flex items-center space-x-2">
//               <Checkbox
//               />
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                 Graphics & Multimedia
//               </Label>
//             </div>
//             <div  className="flex items-center space-x-2">
//               <Checkbox/>
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                 Digital Marketing
//               </Label>
//             </div>
//             <div  className="flex items-center space-x-2">
//               <Checkbox/>
//               <Label 
//                 className="text-sm font-normal cursor-pointer">
//                 Networking
//               </Label>
//             </div>
//         </div>
//       </div>


//       {/* Price Range */}
//       <div className="space-y-3">
//         <Label className="text-base capitalize secondary-color font-semibold">Price Range</Label>
//         <Slider
//           min={0}
//           max={100000}
//           step={1000}
//         //   value={priceRange}
//         //   onValueChange={setPriceRange}
//           className="py-4"
//         />
//         <div className="flex justify-between text-xs text-muted-foreground">
//           <span className="text-base secondary-color">৳ 0</span>
//           <span className="text-base secondary-color">৳ 100000</span>
//         </div>
//       </div>

//       {/* Level */}
//       <div className="space-y-3">
//         <Label className="text-base capitalize secondary-color font-semibold">Level</Label>
//         <div className="space-y-2">
//             <div className="flex items-center space-x-2">
//               <Checkbox />
//               <Label className="text-sm font-normal cursor-pointer">
//                 Beginner
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <Checkbox />
//                 <Label className="text-sm font-normal cursor-pointer">
//                     Intermediate
//                 </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <Checkbox />
//                 <Label className="text-sm font-normal cursor-pointer">
//                     Advanced
//                 </Label>
//             </div>
//         </div>
//       </div>

//       {/* Budget Scale */}
//       <div className="space-y-3">
//         <Label className="text-base capitalize secondary-color font-semibold">Budget Scale</Label>
//         <div className="space-y-2">
//             <div className="flex items-center space-x-2">
//               <Checkbox />
//               <Label className="text-sm font-normal cursor-pointer">
//                 High
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <Checkbox />
//                 <Label className="text-sm font-normal cursor-pointer">
//                     Low
//                 </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <Checkbox />
//                 <Label className="text-sm font-normal cursor-pointer">
//                     Medium
//                 </Label>
//             </div>
//         </div>
//       </div>


//       {/* Apply Button */}
//       <Button 
//         // onClick={onApplyFilters} 
//         className="w-full">
//         Apply Filters
//       </Button>
//     </div>
//   )
// }

// export default CourseFilterSection


"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from "@/components/ui/slider";
import { Search } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const CourseFilterSection = () => {
  return (
    <div className="space-y-4">

      {/* Search */}
      <Accordion 
        type="multiple"
        defaultValue={[
          "search",
          "course-type",
          "course-category",
          "price-range",
          "level",
          "budget-scale"
        ]}  >
        <AccordionItem value="search">
          <AccordionTrigger className="text-base font-semibold secondary-color">
            Search by Course
          </AccordionTrigger>
          <AccordionContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by course name..."
                className="pl-10"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Course Type */}
        <AccordionItem value="course-type">
          <AccordionTrigger className="text-base font-semibold secondary-color">
            Course Type
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["All Courses", "Regular Courses", "Free MOOC Courses", "Live Batches"].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox />
                <Label className="text-sm cursor-pointer">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Course Category */}
        <AccordionItem value="course-category">
          <AccordionTrigger className="text-base font-semibold secondary-color">
            Course Category
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {[
              "Web & Software Development",
              "Graphics & Multimedia",
              "Digital Marketing",
              "Networking",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox />
                <Label className="text-sm cursor-pointer">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price-range">
          <AccordionTrigger className="text-base font-semibold secondary-color">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <Slider
              min={0}
              max={100000}
              step={1000}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="text-base secondary-color">৳ 0</span>
              <span className="text-base secondary-color">৳ 100000</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Level */}
        <AccordionItem value="level">
          <AccordionTrigger className="text-base font-semibold secondary-color">
            Level
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["Beginner", "Intermediate", "Advanced"].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox />
                <Label className="text-sm cursor-pointer">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Budget Scale */}
        <AccordionItem value="budget-scale">
          <AccordionTrigger className="text-base font-semibold secondary-color">
            Budget Scale
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["High", "Low", "Medium"].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox />
                <Label className="text-sm cursor-pointer">{item}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Apply Button */}
      <Button className="w-full">
        Apply Filters
      </Button>
    </div>
  );
};

export default CourseFilterSection;
