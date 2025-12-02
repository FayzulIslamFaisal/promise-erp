import SectionTitle from "@/components/common/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RatingStars from "@/components/common/RatingStars";
const instructors = [
  {
    id: 1,
    name: "ইকবাল হোসেন",
    role: "ডিজিটাল মার্কেটার",
    isCertified: true,
    description:
      "আমি যখন ডিজিটাল মার্কেটিং কোর্স শুরু করি, তখন শুধু একটা জিনিস চাচ্ছিলাম—নিজের একটা স্কিল গড়ে তুলতে, যেটা দিয়ে আমি ফ্রিল্যান্সিং বা নিজের ব্যবসায় কিছু করতে পারি। e-Learning & Earning Ltd.-এর কোর্সটি সেই চাহিদাটাই পূরণ করেছে। এখানে হাতে-কলমে কাজ শেখানো হয়েছে—ফেসবুক মার্কেটিং, ইউটিউব, গুগল অ্যাডস, এসইও—সবকিছু এত সহজভাবে বুঝিয়েছে যে নবীনদের বুঝতে সমস্যা হয় না। আমি এখন নিজের একটা ফেসবুক পেজ পরিচালনা করি এবং প্রোডাক্ট মার্কেটিং করি। কোর্স না করলে এটা কখনোই সম্ভব হতো না। সবচেয়ে ভালো লেগেছে—লাইফটাইম সাপোর্ট সিস্টেম। যেকোনো প্রশ্নে ইন্সট্রাক্টর পাশে থেকেছেন। আমি বিশ্বাস করি, এই কোর্স আমার ক্যারিয়ারের জন্য টার্নিং পয়েন্টটা।",
    image: "/images/home/studen1.png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "মোহাম্মদ আজিজুল হক",
    role: "ডিজিটাল মার্কেটার",
    isCertified: true,
    description:
      "আমি যখন ডিজিটাল মার্কেটিং কোর্স শুরু করি, তখন শুধু একটা জিনিস চাচ্ছিলাম—নিজের একটা স্কিল গড়ে তুলতে, যেটা দিয়ে আমি ফ্রিল্যান্সিং বা নিজের ব্যবসায় কিছু করতে পারি। e-Learning & Earning Ltd.-এর কোর্সটি সেই চাহিদাটাই পূরণ করেছে। এখানে হাতে-কলমে কাজ শেখানো হয়েছে—ফেসবুক মার্কেটিং, ইউটিউব, গুগল অ্যাডস, এসইও—সবকিছু এত সহজভাবে বুঝিয়েছে যে নবীনদের বুঝতে সমস্যা হয় না। আমি এখন নিজের একটা ফেসবুক পেজ পরিচালনা করি এবং প্রোডাক্ট মার্কেটিং করি। কোর্স না করলে এটা কখনোই সম্ভব হতো না। সবচেয়ে ভালো লেগেছে—লাইফটাইম সাপোর্ট সিস্টেম। যেকোনো প্রশ্নে ইন্সট্রাক্টর পাশে থেকেছেন। আমি বিশ্বাস করি, এই কোর্স আমার ক্যারিয়ারের জন্য টার্নিং পয়েন্টটা।",
    image: "/images/home/student2.png",
    rating: 4.7,
  },
  {
    id: 3,
    name: "নাদিয়া তাবাসসুম",
    role: "প্রশিক্ষক - গ্রাফিক্স ডিজাইন",
    isCertified: true,
    description:
      "আমি যখন ডিজিটাল মার্কেটিং কোর্স শুরু করি, তখন শুধু একটা জিনিস চাচ্ছিলাম—নিজের একটা স্কিল গড়ে তুলতে, যেটা দিয়ে আমি ফ্রিল্যান্সিং বা নিজের ব্যবসায় কিছু করতে পারি। e-Learning & Earning Ltd.-এর কোর্সটি সেই চাহিদাটাই পূরণ করেছে। এখানে হাতে-কলমে কাজ শেখানো হয়েছে—ফেসবুক মার্কেটিং, ইউটিউব, গুগল অ্যাডস, এসইও—সবকিছু এত সহজভাবে বুঝিয়েছে যে নবীনদের বুঝতে সমস্যা হয় না। আমি এখন নিজের একটা ফেসবুক পেজ পরিচালনা করি এবং প্রোডাক্ট মার্কেটিং করি। কোর্স না করলে এটা কখনোই সম্ভব হতো না। সবচেয়ে ভালো লেগেছে—লাইফটাইম সাপোর্ট সিস্টেম। যেকোনো প্রশ্নে ইন্সট্রাক্টর পাশে থেকেছেন। আমি বিশ্বাস করি, এই কোর্স আমার ক্যারিয়ারের জন্য টার্নিং পয়েন্টটা।",
    image: "/images/home/studen1.png",
    rating: 4.6,
  },
  {
    id: 4,
    name: "মোহাম্মদ আজিজুল হক",
    role: "ডিজিটাল মার্কেটার",
    isCertified: true,
    description:
      "আমি যখন ডিজিটাল মার্কেটিং কোর্স শুরু করি, তখন শুধু একটা জিনিস চাচ্ছিলাম—নিজের একটা স্কিল গড়ে তুলতে, যেটা দিয়ে আমি ফ্রিল্যান্সিং বা নিজের ব্যবসায় কিছু করতে পারি। e-Learning & Earning Ltd.-এর কোর্সটি সেই চাহিদাটাই পূরণ করেছে। এখানে হাতে-কলমে কাজ শেখানো হয়েছে—ফেসবুক মার্কেটিং, ইউটিউব, গুগল অ্যাডস, এসইও—সবকিছু এত সহজভাবে বুঝিয়েছে যে নবীনদের বুঝতে সমস্যা হয় না। আমি এখন নিজের একটা ফেসবুক পেজ পরিচালনা করি এবং প্রোডাক্ট মার্কেটিং করি। কোর্স না করলে এটা কখনোই সম্ভব হতো না। সবচেয়ে ভালো লেগেছে—লাইফটাইম সাপোর্ট সিস্টেম। যেকোনো প্রশ্নে ইন্সট্রাক্টর পাশে থেকেছেন। আমি বিশ্বাস করি, এই কোর্স আমার ক্যারিয়ারের জন্য টার্নিং পয়েন্টটা।",
    image: "/images/home/student2.png",
    rating: 4.8,
  },
  {
    id: 5,
    name: "ইকবাল হোসেন",
    role: "ডিজিটাল মার্কেটার",
    isCertified: true,
    description:
      "আমি যখন ডিজিটাল মার্কেটিং কোর্স শুরু করি, তখন শুধু একটা জিনিস চাচ্ছিলাম—নিজের একটা স্কিল গড়ে তুলতে, যেটা দিয়ে আমি ফ্রিল্যান্সিং বা নিজের ব্যবসায় কিছু করতে পারি। e-Learning & Earning Ltd.-এর কোর্সটি সেই চাহিদাটাই পূরণ করেছে। এখানে হাতে-কলমে কাজ শেখানো হয়েছে—ফেসবুক মার্কেটিং, ইউটিউব, গুগল অ্যাডস, এসইও—সবকিছু এত সহজভাবে বুঝিয়েছে যে নবীনদের বুঝতে সমস্যা হয় না। আমি এখন নিজের একটা ফেসবুক পেজ পরিচালনা করি এবং প্রোডাক্ট মার্কেটিং করি। কোর্স না করলে এটা কখনোই সম্ভব হতো না। সবচেয়ে ভালো লেগেছে—লাইফটাইম সাপোর্ট সিস্টেম। যেকোনো প্রশ্নে ইন্সট্রাক্টর পাশে থেকেছেন। আমি বিশ্বাস করি, এই কোর্স আমার ক্যারিয়ারের জন্য টার্নিং পয়েন্টটা।",
    image: "/images/home/student2.png",
    rating: 4.9,
  },
];
const StudentSuccessStories = () => {
  return (
    <section className="py-8 md:py-14  bg-cover bg-no-repeat bg-center min-h-[600px] relative"
      style={{ backgroundImage: "url('/images/home/success-story-bg.png')" }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="আমাদের শিক্ষার্থীদের সাফল্যের গল্প শুনুন"
          subtitle="দেখুন কীভাবে আমাদের কোর্সগুলো তাদের জীবন ও ক্যারিয়ারে নতুন সুযোগ তৈরি করেছে!"
          iswhite={false}
        />

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
                key={instructor.id}
                className="basis-full md:basis-1/2"
              >
                <div className="flex flex-col items-center group">
                  {/* Image Wrapper */}
                  <div className="z-20 relative">
                    <div className="rounded-full overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-102">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        width={150}
                        height={150}
                        className=" object-cover rounded-full transition-transform duration-700 group-hover:scale-102"
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <Card className="text-center w-full rounded-2xl shadow-md transition-all duration-500 -mt-20 pt-28 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <CardContent>
                      <h3 className="text-base md:text-xl capitalize font-bold text-secondary mb-1">
                        {instructor.name}
                      </h3>

                      <p className="text-black/75 text-base font-medium mb-2">
                        {instructor.role}
                      </p>
                      <div className="flex justify-center pb-4">
                        <RatingStars rating={instructor.rating} />
                      </div>

                      <p className="text-black/75 text-lg">
                        {instructor.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="cursor-pointer absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none shadow-md" />
          <CarouselNext className="cursor-pointer absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none shadow-md" />
        </Carousel>

        <div className="flex justify-center mt-8">
          <Button asChild className="cursor-pointer flex items-center gap-2">
            <Link href="#">
              আরও পড়ুন
              <MoveRight className="w-5 h-5 animate-bounce" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StudentSuccessStories;
