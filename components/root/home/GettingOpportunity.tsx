import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const GettingOpportunity = () => {
  return (
    <section className="py-8 md:py-14">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-8 ">
          <div className="">
            <AspectRatio ratio={11 / 9} className="w-full relative">
              <Image
                src={"/images/oppurtunities.png"}
                alt="hero-art"
                width={600}
                height={450}
                className="object-contain rounded-lg"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </AspectRatio>
          </div>

          <div className="space-y-5 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold capitalize text-secondary leading-normal">
              Getting You Connected to Opportunities
            </h2>
            <p className="text-base md:text-lg text-black/75">
              We support you with job placement guidance and help you build real
              industry connections, so your learning can confidently turn into a
              career.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <Card className="p-2 border border-secondary/20 shadow-sm bg-secondary/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in ">
                <CardContent className="flex items-center gap-3 px-0 py-1">
                  <div className="shrink-0">
                    <Image
                      src="/images/home/job-placement-icon.png"
                      alt="job-placement-icon"
                      width={50}
                      height={50}
                    />
                  </div>

                  <div>
                    <h3 className="text-base text-secondary font-semibold">
                      Job Placement Support
                    </h3>
                    <p className="text-base text-black/75 font-medium">
                      Skill-to-career
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-2 border border-secondary/20 shadow-sm bg-secondary/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in">
                <CardContent className="flex items-center gap-3 px-0 py-1">
                  <div className="shrink-0">
                    <Image
                      src="/images/home/industry.png"
                      alt="job-placement-icon"
                      width={50}
                      height={50}
                    />
                  </div>

                  <div>
                    <h3 className="text-base text-secondary font-semibold">
                      Job Placement Support
                    </h3>
                    <p className="text-base text-black/75 font-medium">
                      Skill-to-career
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-2 border border-secondary/20 shadow-sm bg-secondary/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in">
                <CardContent className="flex items-center gap-3 px-0 py-1">
                  <div className="shrink-0">
                    <Image
                      src="/images/home/supportforweek.png"
                      alt="job-placement-icon"
                      width={50}
                      height={50}
                    />
                  </div>

                  <div>
                    <h3 className="text-base text-secondary font-semibold">
                      Job Placement Support
                    </h3>
                    <p className="text-base text-black/75 font-medium">
                      Skill-to-career
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-2 border border-secondary/20 shadow-sm bg-secondary/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in">
                <CardContent className="flex items-center gap-3 px-0 py-1">
                  <div className="shrink-0">
                    <Image
                      src="/images/home/mentorships.png"
                      alt="job-placement-icon"
                      width={50}
                      height={50}
                    />
                  </div>

                  <div>
                    <h3 className="text-base text-secondary font-semibold">
                      Job Placement Support
                    </h3>
                    <p className="text-base text-black/75 font-medium">
                      Skill-to-career
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingOpportunity;
