import Image from "next/image";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function HeroWithLogos() {
  return (
    <section className="py-8 md:py-14 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <AspectRatio ratio={20 / 13} className="w-full relative">
            <Image
              src={"/images/home/govment-course.png"}
              alt="hero-art"
              width={700}
              height={455}
              className="object-contain rounded-lg"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </AspectRatio>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl capitalize font-normal text-secondary leading-normal">
              সরকারি সহযোগিতায় পরিচালিত ফ্রি কোর্সসমূহ
            </h2>

            <p className="text-base md:text-lg text-black/75">
              ই-লার্নিং অ্যান্ড আর্নিং লিমিটেড সরকারের বিভিন্ন সংস্থা ও
              প্রকল্পের সহযোগিতায় সম্পূর্ণ ফ্রি প্রশিক্ষণ কোর্স পরিচালনা করে
              আসছে। সরকার কর্তৃক ফান্ডেড এই কোর্সগুলোর মাধ্যমে দক্ষতা উন্নয়ন,
              ক্যারিয়ার প্রস্তুতি ও কর্মসংস্থানের সুযোগ তৈরি করাই তাদের
              উদ্দেশ্য।
            </p>
            <p className="text-base md:text-lg text-black/75">
              এছাড়াও, প্রতিষ্ঠানটি বিভিন্ন সেক্টরের সাথে সমন্বয় করে বাস্তবমুখী
              দক্ষতা উন্নয়ন এবং ইন্ডাস্ট্রি এক্সপোজার ভিত্তিক প্রোগ্রাম
              পরিচালনা করে, যাতে প্রশিক্ষণার্থীরা ব্যবহারিক জ্ঞান ও অভিজ্ঞতা
              অর্জন করতে পারে।
            </p>
            <p className="text-base md:text-lg text-black/75">
              দক্ষতা বাড়াতে এবং নতুন সুযোগ তৈরি করতে — আজই অংশ নিন এই
              প্রশিক্ষণে।
            </p>

            <div className="flex items-center pt-4">
              <Button
                asChild
                className="cursor-pointer flex items-center gap-2"
              >
                <Link href="#">
                  বিস্তারিত দেখুন
                  <MoveRight className="w-5 h-5 animate-bounce" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
