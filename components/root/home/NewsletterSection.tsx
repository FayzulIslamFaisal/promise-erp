import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/common/SectionTitle";

const NewsletterSection = () => {
  return (
    <section className="relative py-8 md:py-14 w-full h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner/courselist.png"
          alt="Computer Lab Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-10 bg-secondary/60" />
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center space-y-6">
        <SectionTitle
          title="আপডেট পেতে আমাদের সাথে থাকুন"
          subtitle="নতুন কোর্স ও বিশেষ অফারের সর্বশেষ আপডেট পেতে এখনই সাবস্ক্রাইব করুন"
          iswhite={true}
        />
        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Input
            type="email"
            placeholder="Your Email"
            className="h-12 bg-white border-none text-black placeholder:text-gray-500 text-base shadow-lg rounded-md"
          />
          <Button className="cursor-pointer h-12 px-8 bg-primary hover:bg-primary-light text-white text-lg font-medium shadow-lg rounded-md transition-colors w-full sm:w-auto">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
