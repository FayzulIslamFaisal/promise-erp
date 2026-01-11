import { MessageCircle } from "lucide-react";

interface WhatsAppCardProps {
  groupLink?: string;
}

export const WhatsAppCard = ({ groupLink = "#" }: WhatsAppCardProps) => {
  return (
    <div className="whatsapp-card mt-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shrink-0">
          <MessageCircle className="w-7 h-7 text-white" fill="currentColor" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Join Our</h3>
          <p className="text-foreground font-semibold">
            Group Chat on
            <br />
            Whatsapp
          </p>
        </div>
      </div>
      <a
        href={groupLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button mt-4 block text-center"
      >
        Click Here to Join
      </a>
    </div>
  );
};
