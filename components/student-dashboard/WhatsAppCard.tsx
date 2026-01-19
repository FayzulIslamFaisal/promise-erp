
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface WhatsAppCardProps {
  groupLink?: string;
}

export const WhatsAppCard = ({ groupLink = "#" }: WhatsAppCardProps) => {
  return (
    <div className="whatsapp-card mt-4">
      <div className="flex items-center gap-4">
        <div className="rounded-full flex items-center justify-center shrink-0">
          <Image
            src="/images/whatsupp.png"
            alt="Whatsapp Logo"
            width={105}
            height={105}
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h3 className="font-semibold text-secondary">Join Our</h3>
          <p className="text-secondary font-semibold">Group Chat on Whatsapp</p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <Button asChild>
          <Link
            href={groupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center"
          >
            Click Here to Join
          </Link>
        </Button>
      </div>
    </div>
  );
};
