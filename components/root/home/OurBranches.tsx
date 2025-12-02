"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";

export const branches = [
  {
    id: 1,
    name: "Dhaka",
    icon: "/images/home/branch-icon.png",
    address:
      "Khaja IT Park (2nd - 6th Floor), 07 South Kallyanpur, Kallyanpur Bus Stand, Mirpur Road, Dhaka-1207",
    phone: ["01550-666800", "01550-666900"],
    email: "dhaka.elel@gmail.com",
  },
  {
    id: 2,
    name: "Gazipur",
    icon: "/images/home/branch-icon.png",
    address:
      "Habibah Shorkar Complex (4th Floor), Tongi College Gate, Dhaka Mymensingh Road, Tangi, Gazipur",
    phone: ["015151611602"],
    email: "gazipur.elel@gmail.com",
  },
  {
    id: 3,
    name: "Chattogram",
    icon: "/images/home/branch-icon.png",
    address:
      "Johor Tower (5th Floor), Sheikh Mujib Road, Double Mooring, Agrabad, Chattogram",
    phone: ["01332852610", "01332852611"],
    email: "chattogram.elel@gmail.com",
  },
  {
    id: 4,
    name: "Rajshahi",
    icon: "/images/home/branch-icon.png",
    address:
      "Sonadighi Mor (3rd Floor), Shaheb Bazar, Rajshahi City Corporation Market, Rajshahi",
    phone: ["01711223344", "01755667788"],
    email: "rajshahi.elel@gmail.com",
  },
  {
    id: 5,
    name: "Sylhet",
    icon: "/images/home/branch-icon.png",
    address:
      "Zindabazar Point (4th Floor), Modhubon Tower, Sylhet Sadar, Sylhet",
    phone: ["01999887744"],
    email: "sylhet.elel@gmail.com",
  },
  {
    id: 6,
    name: "Khulna",
    icon: "/images/home/branch-icon.png",
    address:
      "Royal Mor (2nd Floor), Khan Jahan Ali Road, Shibbari More, Khulna",
    phone: ["01811224455", "01833224411"],
    email: "khulna.elel@gmail.com",
  },
];

const OurBranches = () => {
  return (
    <section className="py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Branches"
          subtitle="Find our learning centers near you."
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
            {branches.map((branche) => (
              <CarouselItem
                key={branche.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="group h-full shadow-lg border border-secondary/30 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                    <div className="bg-secondary/10 border border-secondary/40 p-4 mt-4 mx-auto rounded-full shadow-md w-[100px] h-[100px] flex items-center justify-center">
                      <Image
                        src={branche.icon}
                        alt={branche.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-secondary">
                      {branche.name}
                    </h3>

                    {/* Address */}
                    <p className="text-secondary/80 text-sm flex items-start gap-2 text-left">
                      <MapPin className="w-10 h-10 mt-1" />
                      {branche.address}
                    </p>

                    {/* Phone */}
                    <div className="text-secondary/80 text-sm flex items-start gap-2 text-left">
                      <Phone className="w-4 h-4 mt-1" />
                      <div className="flex flex-col">
                        {branche.phone.map((p, i) => (
                          <span key={i}>{p}</span>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <p className="text-secondary/80 text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {branche.email}
                    </p>
                    
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="absolute cursor-pointer left-0 md:-left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none shadow-md" />
          <CarouselNext className="absolute cursor-pointer right-0 md:-right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white hover:text-white rounded-full border-none shadow-md" />
        </Carousel>
      </div>
    </section>
  );
};

export default OurBranches;
