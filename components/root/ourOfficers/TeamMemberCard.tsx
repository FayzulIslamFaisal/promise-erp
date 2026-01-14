import { TeamMember } from "@/app/(root)/our-officers/page";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const getBorderColor = (level: TeamMember["level"]) => {
    switch (level) {
      case "executive":
        return "bg-secondary text-white hover:border-t-0 hover:border-primary";
      default:
        return "bg-white text-secondary hover:border-t-0 hover:border-primary";
    }
  };

  return (
    <Card className={`${getBorderColor(member.level)} relative cursor-pointer py-0`}>
      <div className="h-2 bg-linear-to-r from-secondary via-primary to-secondary rounded-t-lg" />

      <CardContent className="flex flex-col items-center text-center pb-6">
        <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden shadow-xl border-4 border-white ">
          <Image
            src={member.image || "/images/placeholder_img.jpg"}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-semibold mt-3">{member.name}</h3>
        <p className="text-primary font-medium">{member.role}</p>

        <Link
          href={`mailto:${member.email}`}
          className="flex items-center gap-2 text-secondary mt-2"
        >
          <Mail size={16} /> {member.email}
        </Link>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
