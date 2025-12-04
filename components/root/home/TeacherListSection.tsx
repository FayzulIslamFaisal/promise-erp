// import SectionTitle from "@/components/common/SectionTitle";
// import { Card, CardContent } from "@/components/ui/card";
// import { Award } from "lucide-react";
// import Image from "next/image";
// const instructors = [
//   {
//     id: 1,
//     name: "ইকবাল হোসেন",
//     role: "প্রশিক্ষক - ডিজিটাল মার্কেটিং",
//     isCertified: true,
//     experience: "৩+ বছরের অভিজ্ঞতা",
//     image: "/images/home/teacher1.png",
//   },
//   {
//     id: 2,
//     name: "মোহাম্মদ আজিজুল হক",
//     role: "প্রশিক্ষক - ডেটা অ্যানালাইসিস",
//     isCertified: true,
//     experience: "৩+ বছরের অভিজ্ঞতা",
//     image: "/images/home/teacher2.png",
//   },
//   {
//     id: 3,
//     name: "নাদিয়া তাবাসসুম",
//     role: "প্রশিক্ষক - গ্রাফিক্স ডিজাইন",
//     isCertified: true,
//     experience: "৩+ বছরের অভিজ্ঞতা",
//     image: "/images/home/teacher3.png",
//   },
//   {
//     id: 4,
//     name: "মোহাম্মদ আজিজুল হক",
//     role: "প্রশিক্ষক - ডেটা অ্যানালাইসিস",
//     isCertified: true,
//     experience: "৩+ বছরের অভিজ্ঞতা",
//     image: "/images/home/teacher2.png",
//   },
// ];

// const TeacherListSection = () => {
//   return (
//     <section className="py-8 md:py-14 bg-secondary/5">
//       <div className="container mx-auto px-4 ">
//         <SectionTitle
//           title=" Our Expert Teachers"
//           subtitle="Learn real-world skills from experienced trainers."
//           iswhite={false}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-24 gap-x-8">
//           {instructors.map((instructor) => (
//             <div
//               key={instructor.id}
//               className="flex flex-col items-center group"
//             >
//               {/* Image Wrapper */}
//               <div className="z-20 relative">
//                 <div className="h-48 w-fit rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-102">
//                   <Image
//                     src={instructor.image}
//                     alt={instructor.name}
//                     width={300}
//                     height={300}
//                     className="h-full w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-102"
//                   />
//                 </div>
//               </div>

//               {/* Card */}
//               <Card
//                 className="text-center w-full rounded-2xl shadow-md transition-all duration-500 -mt-20 pt-28 group-hover:-translate-y-2 group-hover:shadow-2xl"
//               >
//                 <CardContent>
//                   <h3 className="text-base md:text-xl capitalize font-bold text-secondary mb-1">
//                     {instructor.name}
//                   </h3>

//                   <p className="text-black/75 text-base font-medium mb-2">
//                     {instructor.role}
//                   </p>

//                   {instructor.isCertified && (
//                     <div className="flex items-center justify-center gap-2 text-primary mb-2 animate-fade-in">
//                       <Award />
//                       <span className="text-base font-medium">
//                         সার্টিফাইড ট্রেইনার
//                       </span>
//                     </div>
//                   )}

//                   <p className="text-black/75 text-base">
//                     {instructor.experience}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeacherListSection;

"use client";

import SectionTitle from "@/components/common/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Award, MoveRight } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // shadcn/ui Carousel
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TeacherApiResponse } from "@/apiServices/homePageService";

interface TeacherListSectionProps {
  teacherData: TeacherApiResponse | null;
}
const TeacherListSection = ({teacherData}:TeacherListSectionProps) => {
  const instructors = teacherData?.data?.teachers || [];
  return (
    <>
      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-full relative"
      >
        <CarouselContent className="py-4">
          {instructors.map((instructor) => (
            <CarouselItem
              key={instructor?.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="flex flex-col items-center group">
                {/* Image Wrapper */}
                <div className="z-20 relative">
                  <div className="h-48 w-fit rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-102">
                    <Image
                      src={instructor?.profile_image || "/images/placeholder_img.jpg"}
                      alt={instructor?.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-102"
                    />
                  </div>
                </div>

                {/* Card */}
                <Card className="text-center w-full rounded-2xl shadow-md transition-all duration-500 -mt-20 pt-28 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <CardContent>
                    <h3 className="text-base md:text-xl capitalize font-bold text-secondary mb-1">
                      {instructor?.name}
                    </h3>

                    <p className="text-black/75 text-base font-medium mb-2">
                      {instructor?.designation}
                    </p>

                      <div className="flex items-center justify-center gap-2 text-primary mb-2 animate-fade-in">
                        <Award />
                        <span className="text-base font-medium">
                          সার্টিফাইড ট্রেইনার
                        </span>
                      </div>

                    <p className="text-black/75 text-base">
                      {instructor.experience}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" absolute cursor-pointer left-0 md:-left-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none " />
        <CarouselNext className="absolute cursor-pointer right-0 md:right-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none" />
      </Carousel>
      <div className="flex justify-center mt-8">
        <Button asChild className="cursor-pointer flex items-center gap-2">
          <Link href="#">
            সকল প্রশিক্ষক দেখুন
            <MoveRight className="w-5 h-5 animate-bounce" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default TeacherListSection;
