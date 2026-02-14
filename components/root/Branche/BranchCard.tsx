
import { MapPin, Phone, Mail } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

interface Branch {
  id: string;
  name: string;
  division: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}
interface BranchCardProps {
  branch: Branch;
}

const BranchCard = ({ branch }: BranchCardProps) => {
  return (
    <Card className="flex flex-col xl:flex-row gap-4 px-4 py-3 bg-primary/10 transition-colors border border-primary/50 rounded-lg ">
      {/* Map section */}
      <div className="relative h-[160px] w-full xl:w-[200px] shrink-0 overflow-hidden rounded-lg shadow border border-primary/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.3654!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUxLjAiTiA5MMKwMjEnNTUuNCJF!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
          className="w-full h-full border-0 grayscale-20"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
          allowFullScreen
        />
      </div>

      {/* Info section */}
      <CardContent className="flex-1 px-2 flex flex-col py-1">
        <CardHeader className="p-0 mb-1">
          <h3 className="text-lg font-bold text-black">{branch.name}</h3>
        </CardHeader>
        <div className="flex items-start gap-2 text-sm text-black mb-2">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-black" />
          <span className="leading-snug">{branch.address}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-black">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{branch.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-black">
            <Mail className="h-4 w-4 shrink-0" />
            <span>{branch.email}</span>
          </div>
        </div>
      </CardContent>

      {/* Call button */}
      <CardFooter className="flex items-end p-0">
        <Link
          href={`tel:${branch.phone}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow hover:opacity-90 transition-opacity"
        >
          <Phone className="h-5 w-5" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BranchCard;
