
import {
  Code,
  Laptop,
  Shield,
  ShoppingCart,
  Sparkles,
  LineChart,
  Server,
  Palette,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";

const servicesItem = {
  services1: {
    icon: Code,
    title: "Web Development",
    description:
      "Modern, responsive websites built to enhance user experience and drive digital growth.",
    color: "primary",
  },
  services2: {
    icon: Shield,
    title: "Cyber Security Solutions",
    description: "Multi-layered protection to secure your systems and data.",
    color: "secondary",
  },
  services3: {
    icon: Sparkles,
    title: "Digital Transformation",
    description:
      "Smart, seamless upgrades that enhance workflows and boost operational speed.",
    color: "primary",
  },
  services4: {
    icon: Server,
    title: "IT Infrastructure Solutions",
    description:
      "Scalable, reliable infrastructure ensuring smooth and secure operations.",
    color: "secondary",
  },
  services5: {
    icon: Laptop,
    title: "Software Development",
    description: "Integrated, tailored software service solutions.",
    color: "primary",
  },
  services6: {
    icon: ShoppingCart,
    title: "E-Commerce Solution",
    description: "Seamless, high-performing e-commerce solutions.",
    color: "secondary",
  },
  services7: {
    icon: LineChart,
    title: "Digital Marketing",
    description: "Data-backed, performance-focused marketing services.",
    color: "primary",
  },
  services8: {
    icon: Palette,
    title: "Graphics design and Branding Services",
    description: "Creative, brand-focused design services.",
    color: "secondary",
  },
};

const HomeServiceList = () => {
  return (
    <section className="py-8 md:py-14 ">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle={"Comprehensive support from idea to execution."}
          title={"Services We Provide"}
          iswhite={false}
        />
        {/* first row */}
        <div className="md:mb-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-20  mx-auto items-center">
          <Card
            className={` bg-primary hover:bg-primary/80 group p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 p-2 rounded-lg `}>
                <Image
                  src="/images/home/service1.png"
                  alt="Services Illustration"
                  width={53}
                  height={53}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-1 text-white `}>
                  Hello World !!
                </h3>
                <p className={`text-sm text-white `}>
                  lorte ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`group bg-primary hover:bg-primary/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 p-2 rounded-lg `}>
                <Image
                  src="/images/home/service2.png"
                  alt="Services Illustration"
                  width={53}
                  height={53}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-1 text-white `}>
                  Hello World !!
                </h3>
                <p className={`text-sm text-white `}>
                  lorte ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* second row */}
        <div className="md:mb-6 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto items-center">
          <div className="flex w-full flex-col gap-4 md:gap-6 items-center">
            <Card
              className={`group w-full bg-secondary hover:bg-secondary/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
            >
              <div className="flex lg:flex-row md:flex-col items-start gap-2 lg:gap-4">
                <div className={`shrink-0 p-2 rounded-lg `}>
                  <Image
                    src="/images/home/service3.png"
                    alt="Services Illustration"
                    width={53}
                    height={53}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-1 text-white `}>
                    Hello World !!
                  </h3>
                  <p className={`text-sm text-white `}>
                    lorte ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </Card>
            <Card
              className={`group w-full bg-primary hover:bg-primary/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
            >
              <div className="flex lg:flex-row md:flex-col items-start gap-2 lg:gap-4">
                <div className={`shrink-0 p-2 rounded-lg `}>
                  <Image
                    src="/images/home/service4.png"
                    alt="Services Illustration"
                    width={53}
                    height={53}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-1 text-white `}>
                    Hello World !!
                  </h3>
                  <p className={`text-sm text-white `}>
                    lorte ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="hidden md:flex flex-col gap-6 items-center">
            <Card
              className={`group p-0 transition-all bg-transparent shadow-none hover:shadow-none duration-300 hover:-translate-y-1 border-0 animate-scale-in `}
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 p-0 rounded-lg `}>
                  <Image
                    src="/images/home/service6.png"
                    alt="Services Illustration"
                    width={228}
                    height={228}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className=" flex flex-col gap-4 md:gap-6 items-center">
            <Card
              className={`group w-full bg-secondary  hover:bg-secondary/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
            >
              <div className="flex lg:flex-row md:flex-col items-start gap-4">
                <div className={`shrink-0 p-2 rounded-lg `}>
                  <Image
                    src="/images/home/service5.png"
                    alt="Services Illustration"
                    width={53}
                    height={53}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-1 text-white `}>
                    Hello World !!
                  </h3>
                  <p className={`text-sm text-white `}>
                    lorte ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </Card>
            <Card
              className={`group w-full bg-primary hover:bg-primary/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
            >
              <div className="flex lg:flex-row md:flex-col items-start gap-4">
                <div className={`shrink-0 p-2 rounded-lg `}>
                  <Image
                    src="/images/home/service7.png"
                    alt="Services Illustration"
                    width={53}
                    height={53}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-1 text-white `}>
                    Hello World !!
                  </h3>
                  <p className={`text-sm text-white `}>
                    lorte ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* third row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-20  mx-auto items-center">
          <Card
            className={`group bg-secondary hover:bg-secondary/80 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 p-2 rounded-lg `}>
                <Image
                  src="/images/home/service8.png"
                  alt="Services Illustration"
                  width={53}
                  height={53}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-1 text-white `}>
                  Hello World !!
                </h3>
                <p className={`text-sm text-white `}>
                  lorte ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`group p-6 bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 animate-scale-in `}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 p-2 rounded-lg `}>
                <Image
                  src="/images/home/service9.png"
                  alt="Services Illustration"
                  width={53}
                  height={53}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-1 text-white `}>
                  Hello World !!
                </h3>
                <p className={`text-sm text-white `}>
                  lorte ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeServiceList;
