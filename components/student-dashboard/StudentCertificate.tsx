import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import Image from "next/image";

const StudentCertificate = () => {
  return (
    <>
      <Card className="mb-4 py-0 bg-secondary/5 border border-secondary/20">
        <CardContent className="px-4 py-8">
          {/* Header - Course Name and Image */}
          <div className="flex items-center justify-between gap-4 mb-0">
            <div className="flex flex-col xl:flex-row items-center gap-4">
              <Image
                src={"/images/certificates.png"}
                alt="Course Image"
                width={250}
                height={127}
                className="rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-xl lg:text-3xl text-secondary leading-tight mb-3">
                  Professional Graphics Design
                </h3>
                <p className="text-lg font-semibold">
                  Awarded On: <span className="text-primary">10 Nov, 2025</span>
                </p>
              </div>
            </div>
            <div className="">
              <Button disabled>
                <Download className="mr-2" /> Download{" "}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-4 py-0 bg-secondary/5 border border-secondary/20">
        <CardContent className="px-4 py-8">
          {/* Header - Course Name and Image */}
          <div className="flex items-center justify-between gap-4 mb-0">
            <div className="flex flex-col xl:flex-row items-center gap-4">
              <Image
                src={"/images/certificates.png"}
                alt="Course Image"
                width={250}
                height={127}
                className="rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-xl lg:text-3xl text-secondary leading-tight mb-3">
                  Professional Graphics Design
                </h3>
                <p className="text-lg font-semibold">
                  Awarded On: <span className="text-primary">10 Nov, 2025</span>
                </p>
              </div>
            </div>
            <div className="">
              <Button disabled>
                <Download className="mr-2" /> Download{" "}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentCertificate;
