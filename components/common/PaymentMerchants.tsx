import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const PaymentMerchants = () => {
  const merchants = [
    {
      name: "bKash",
      img :"/images/bkash.png",
      number: "01550-666800",
    },
    {
      name: "Nagad",
      img :"/images/nagad.png",
      number: "01550-666800",
    },
    {
      name: "Rocket",
      img :"/images/roket.png",
      number: "01550-666800",
    },
  ];

  return (
    <section className="md:pb-8 pb-6 pt-0 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center white-color md:mb-10 mb-4">
          Our Payment Merchants
        </h2>
        <div className="max-w-full md:max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2">
          {merchants.map((merchant) => (
            <div
              key={merchant.name}
              className="bg-card border border-border rounded-lg px-4 py-2 text-center hover:shadow-lg transition-shadow"
            >
            <AspectRatio ratio={3/1} className="flex justify-center items-center">
                <Image
                src={merchant.img}
                alt={merchant.name}
                width={153}
                height={80}
                className="object-cover rounded-md"
                />
            </AspectRatio>
              
              {/* <p className="text-xl font-semibold text-foreground">{merchant.number}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentMerchants;