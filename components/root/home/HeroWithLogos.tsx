'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// HeroWithLogos.jsx
// - Next.js + Tailwind + shadcn Button
// - Left side shows an image with logo cards positioned around it

const logoPositions = [
  { top: "8%", left: "10%", size: 64 },
  { top: "4%", left: "50%", size: 64 },
  { top: "28%", left: "78%", size: 64 },
  { top: "62%", left: "72%", size: 64 },
  { top: "80%", left: "36%", size: 64 },
  { top: "56%", left: "8%", size: 64 },
];



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
              {logoPositions.map((pos, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div
                    className="rounded-xl bg-white shadow-md flex items-center justify-center border"
                    style={{ width: pos.size, height: pos.size }}
                  >
                    {/* Logo image only - plus icon removed */}
                    <img
                      src="/mnt/data/9f4e2f92-86b6-4dc5-8498-d2a6592516aa.png"
                      alt={`logo-${i}`}
                      className="max-w-[85%] max-h-[85%] object-contain rounded"
                    />
                  </div>
                </div>
              ))}

              {/* decorative orbit lines (subtle SVG) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <path d="M10,50 C20,20 80,20 90,50 C80,80 20,80 10,50 Z" fill="none" stroke="#e6f2ee" strokeWidth="0.6" />
                <path d="M20,60 C30,30 70,30 80,60" fill="none" stroke="#f0faf6" strokeWidth="0.4" />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT: Textual content and CTA using shadcn Button */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            সরকারি সহযোগিতায় পরিচালিত
            <br />
            ফ্রি কোর্সসমূহ
          </h2>

          <p className="text-slate-600 leading-relaxed">
            ই-লার্নিং অ্যাক্টিভ লিমিটেড সরকারের বিভিন্ন সংস্থা ও প্রকল্পের সহযোগিতায় সম্পূর্ণ বিনামূল্যে প্রশিক্ষণ কোর্স পরিচালনা করে আসছে। সরকার কর্তৃক প্রদত্ত এই কোর্সগুলোর মাধ্যমে দক্ষতা উন্নয়ন, ক্যারিয়ার প্রস্তুতি ও কর্মসংস্থানের সুযোগ তৈরি করাই তাদের উদ্দেশ্য।
          </p>

          <div className="flex items-center space-x-4">
            <Button className="rounded-full px-6 py-3">বিস্তারিত দেখুন</Button>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              আরও তথ্য জানুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}