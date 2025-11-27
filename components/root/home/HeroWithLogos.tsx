
import Image from "next/image";

import { Button } from "@/components/ui/button";





export default function HeroWithLogos() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT: image with floating logo cards */}
        <div className="relative flex justify-center">
          {/* Soft rounded panel behind the artwork to match the design */}
          <div className="relative w-full max-w-[640px] bg-gradient-to-br from-green-50 to-white rounded-2xl p-8">
            {/* central background image */}
            <div className="relative w-full h-[360px] rounded-lg overflow-hidden">
              {/* Use next/image for optimisation */}
              <Image
                src={'/mnt/data/9f4e2f92-86b6-4dc5-8498-d2a6592516aa.png'}
                alt="hero-art"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>

            {/* overlay: little logo cards positioned around the image */}
            <div className="pointer-events-none absolute inset-0">
              
                  <div
                    className="rounded-xl bg-white shadow-md flex items-center justify-center border"
                   
                  >
                    {/* Logo image only - plus icon removed */}
                    <img
                      src="/mnt/data/9f4e2f92-86b6-4dc5-8498-d2a6592516aa.png"
                      alt="logo"
                      className="max-w-[85%] max-h-[85%] object-contain rounded"
                    />
                  </div>
                

              {/* decorative orbit lines (subtle SVG) */}

            </div>
          </div>
        </div>

        {/* RIGHT: Textual content and CTA using shadcn Button */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            সরকারি সহযোগিতায় পরিচালিত ফ্রি কোর্সসমূহ
          </h2>

          <p className="text-slate-600 leading-relaxed">
           ই-লার্নিং অ্যান্ড আর্নিং লিমিটেড সরকারের বিভিন্ন সংস্থা ও প্রকল্পের সহযোগিতায় সম্পূর্ণ ফ্রি প্রশিক্ষণ কোর্স পরিচালনা করে আসছে। সরকার কর্তৃক ফান্ডেড এই কোর্সগুলোর মাধ্যমে দক্ষতা উন্নয়ন, ক্যারিয়ার প্রস্তুতি ও কর্মসংস্থানের সুযোগ তৈরি করাই তাদের উদ্দেশ্য।
          </p>
          <p>এছাড়াও, প্রতিষ্ঠানটি বিভিন্ন সেক্টরের সাথে সমন্বয় করে বাস্তবমুখী দক্ষতা উন্নয়ন এবং ইন্ডাস্ট্রি এক্সপোজার ভিত্তিক প্রোগ্রাম পরিচালনা করে, যাতে প্রশিক্ষণার্থীরা ব্যবহারিক জ্ঞান ও অভিজ্ঞতা অর্জন করতে পারে।</p>
          <p>দক্ষতা বাড়াতে এবং নতুন সুযোগ তৈরি করতে — আজই অংশ নিন এই প্রশিক্ষণে।</p>

          <div className="flex items-center space-x-4">
            <Button className="rounded-full px-6 py-3">বিস্তারিত দেখুন</Button>
          </div>
        </div>
      </div>
    </section>
  );
}