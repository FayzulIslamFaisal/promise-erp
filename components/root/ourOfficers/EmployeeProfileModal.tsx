"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { TeamMember } from "@/app/(root)/our-officers/page";

interface Props {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeeProfileModal = ({ member, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="h-24 bg-linear-to-r from-secondary via-primary to-secondary" />

        <div className="-mt-16 px-6 pb-6 text-center">
          <DialogHeader className="mt-4">
            <div className="flex items-center justify-start gap-4">
              <div className="rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={member.image || "/images/placeholder_img.jpg"}
                  alt={member.name}
                  width={144}
                  height={144}
                />
              </div>
              <div className="">
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="text-primary">{member.role}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            <div className="bg-muted p-4 rounded-lg flex justify-center gap-2">
              <Mail /> {member.email}
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm">
              A visionary leader with strong experience in building
              high-performing teams and driving innovation.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeProfileModal;
