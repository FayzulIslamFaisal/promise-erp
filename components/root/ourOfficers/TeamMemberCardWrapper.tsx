"use client";

import { useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import EmployeeProfileModal from "./EmployeeProfileModal";
import { TeamMember } from "@/app/(root)/our-officers/page";

const TeamMemberCardWrapper = ({ member }: { member: TeamMember }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <TeamMemberCard member={member} />
      </div>

      <EmployeeProfileModal
        member={member}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default TeamMemberCardWrapper;
