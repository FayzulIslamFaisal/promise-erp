import { PartnerItem } from "@/apiServices/homePageService";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
interface PartnerItemProps {
  items: PartnerItem[];
}
const AffiliatesClientsTab = ({ items }: PartnerItemProps) => {
  console.log("client===>",items);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item) => (
        <Card
          key={item?.id}
          className="rounded-2xl flex flex-col items-center justify-center hover:shadow-md transition"
        >
          <CardContent className="flex flex-col items-center px-4">
            <div className="relative w-40 h-20 mb-3 shadow-none">
              <Image
                src={item?.image || "/images/placeholder_img.jpg"}
                alt={item?.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <p className="text-base font-semibold text-center text-secondary">
              {item?.title}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AffiliatesClientsTab;
