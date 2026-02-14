"use client";
import { useState, useMemo } from "react";
import BranchCard from "@/components/root/Branche/BranchCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BannerWrapper from "@/components/root/Branche/BannerWrapper";
import BranchState from "@/components/root/Branche/BranchState";
interface Branch {
  id: string;
  name: string;
  division: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

const divisions = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Rangpur",
  "Barishal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

const branches: Branch[] = [
  {
    id: "1",
    name: "Dhaka",
    division: "Dhaka",
    address:
      "খাজা আইটি পার্ক (২য়-৬ষ্ঠ তলা), ০৭ দক্ষিণ কল্যাণপুর, কল্যাণপুর বাস স্ট্যান্ড, মিরপুর রোড, ঢাকা-১২০৭",
    phone: "০১৫৫০-৬৬৬৮০০",
    email: "dhaka@koredao.com",
    mapUrl: "",
  },
  {
    id: "2",
    name: "Gazipur",
    division: "Dhaka",
    address:
      "হাবিবা শরকার কমপ্লেক্স (৪র্থ তলা), টঙ্গী কলেজ গেট, ঢাকা ময়মনসিংহ রোড, টাঙ্গী, গাজীপুর",
    phone: "০১৯১৬৯২৩৩৫৪",
    email: "gazipur@koredao.com",
    mapUrl: "",
  },
  {
    id: "3",
    name: "Gopalganj",
    division: "Dhaka",
    address:
      "লাইক উদ্দিন সুপার মার্কেট (গ্রাউন্ড ফ্লোর), নাটুন বাজার, গোপালগঞ্জ",
    phone: "০১৭৭৩১১৬২৪০",
    email: "gopalganj@koredao.com",
    mapUrl: "",
  },
  {
    id: "4",
    name: "Shariatpur",
    division: "Dhaka",
    address: "হাজী সুপার মার্কেট (২য় তলা), গোসাইরহাট, শরীয়তপুর",
    phone: "০১৭২৫২৫২৪২৪",
    email: "shariatpur@koredao.com",
    mapUrl: "",
  },
  {
    id: "5",
    name: "Madaripur",
    division: "Dhaka",
    address:
      "হাবিব প্লাজা (৩য় তলা), মাস্টার কলোনী, তরমুগুরিয়া, মাদারীপুর সদর, মাদারীপুর",
    phone: "০১৭৩৪৮৪৩৮৮৬",
    email: "madaripur@koredao.com",
    mapUrl: "",
  },
  {
    id: "6",
    name: "Rajbari",
    division: "Dhaka",
    address:
      "আতিয়ার টাওয়ার (২য় তলা), রাজবাড়ী মেইন রোড, সজ্জনকান্দা, বারাপুল, রাজবাড়ী",
    phone: "০১৭২৬৪০৫২১৪",
    email: "rajbari@koredao.com",
    mapUrl: "",
  },
  {
    id: "7",
    name: "Chittagong",
    division: "Chittagong",
    address: "আগ্রাবাদ বাণিজ্যিক এলাকা (৩য় তলা), চট্টগ্রাম",
    phone: "০১৮১২৩৪৫৬৭৮",
    email: "chittagong@koredao.com",
    mapUrl: "",
  },
  {
    id: "8",
    name: "Cox's Bazar",
    division: "Chittagong",
    address: "হোটেল রোড (২য় তলা), কক্সবাজার সদর",
    phone: "০১৯১২৩৪৫৬৭৮",
    email: "coxsbazar@koredao.com",
    mapUrl: "",
  },
  {
    id: "9",
    name: "Rajshahi",
    division: "Rajshahi",
    address: "সাহেব বাজার (৪র্থ তলা), রাজশাহী সিটি",
    phone: "০১৭১২৩৪৫৬৭৮",
    email: "rajshahi@koredao.com",
    mapUrl: "",
  },
  {
    id: "10",
    name: "Rangpur",
    division: "Rangpur",
    address: "জাহাজ কোম্পানি মোড় (৩য় তলা), রংপুর",
    phone: "০১৬১২৩৪৫৬৭৮",
    email: "rangpur@koredao.com",
    mapUrl: "",
  },
  {
    id: "11",
    name: "Barishal",
    division: "Barishal",
    address: "সদর রোড (২য় তলা), বরিশাল সিটি",
    phone: "০১৫১২৩৪৫৬৭৮",
    email: "barishal@koredao.com",
    mapUrl: "",
  },
  {
    id: "12",
    name: "Khulna",
    division: "Khulna",
    address: "খান-এ-সবুর রোড (৫ম তলা), খুলনা",
    phone: "০১৪১২৩৪৫৬৭৮",
    email: "khulna@koredao.com",
    mapUrl: "",
  },
  {
    id: "13",
    name: "Mymensingh",
    division: "Mymensingh",
    address: "চরপাড়া মার্কেট (৩য় তলা), ময়মনসিংহ",
    phone: "০১৩১২৩৪৫৬৭৮",
    email: "mymensingh@koredao.com",
    mapUrl: "",
  },
  {
    id: "14",
    name: "Sylhet",
    division: "Sylhet",
    address: "জিন্দাবাজার (৪র্থ তলা), সিলেট সিটি",
    phone: "০১২১২৩৪৫৬৭৮",
    email: "sylhet@koredao.com",
    mapUrl: "",
  },
];

const BranchesPage = () => {
  const [activeDivision, setActiveDivision] = useState(divisions[0]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return branches.filter((b) => {
      const matchDiv = b.division === activeDivision;
      const matchSearch =
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.address.toLowerCase().includes(search.toLowerCase());
      return matchDiv && matchSearch;
    });
  }, [activeDivision, search]);

  return (
    <>
      <BannerWrapper />
      <BranchState />
      <section className="py-8 md:py-12">
        <div className="mx-auto container px-4">
          <div className="flex flex-col lg:flex-row md:items-center gap-4 mb-6 w-full bg-primary/10 rounded-xl p-2">
            <Tabs
              value={activeDivision}
              onValueChange={(value) => setActiveDivision(value)}
              className="flex-1 w-full lg:w-auto "
            >
              <TabsList className="flex flex-col w-full lg:flex-row lg:space-x-2 lg:w-auto bg-primary/20 p-1 rounded-xl h-auto">
                {divisions.map((divisionItem) => (
                  <TabsTrigger
                    key={divisionItem}
                    value={divisionItem}
                    className="w-full lg:w-auto rounded-full cursor-pointer px-4 py-1 capitalize text-black font-semibold whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-primary/80 transition-all duration-200"
                  >
                    {divisionItem}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative w-full lg:w-48 bg-white rounded-full border border-primary/80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                placeholder="Search branches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 h-10 text-sm rounded-full"
              />
            </div>
          </div>

          {/* Branch grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              কোনো শাখা পাওয়া যায়নি
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BranchesPage;
