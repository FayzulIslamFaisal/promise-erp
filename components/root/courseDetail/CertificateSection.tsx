import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const CertificateSection = () => {
  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Certificate of Completion</h2>
        <div className="rounded-lg flex items-center justify-center">
          <Image
            src="/images/certificate.png"
            alt="Certificate of Completion"
            width={600}
            height={400}
            className="object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};
