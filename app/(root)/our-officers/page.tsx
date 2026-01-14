"use client";
import EmployeeCategory from "@/components/root/ourOfficers/EmployeeCategory";
import TeamMemberCardWrapper from "@/components/root/ourOfficers/TeamMemberCardWrapper";
import WrapperHeroBanner from "@/components/root/ourOfficers/WrapperHeroBanner";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  level: "executive" | "management" | "lead" | "team";
  image?: string;
}

const executiveTeam: TeamMember[] = [
  {
    id: 1,
    name: "Ayesha Habiba",
    role: "Director",
    email: "ayesha@company.com",
    level: "executive",
    image: "/images/placeholder_img.jpg",
  },
];

const secondLevel: TeamMember[] = [
  {
    id: 2,
    name: "Maliazam",
    role: "Manager",
    email: "maliazam@company.com",
    level: "management",
    image: "/images/placeholder_img.jpg",
  },
];

const thirdLevel: TeamMember[] = [
  {
    id: 3,
    name: "Mr. Umarakhmed",
    role: "Team Lead",
    email: "umarakhmed@company.com",
    level: "lead",
    image: "/images/placeholder_img.jpg",
  },
  {
    id: 4,
    name: "Colonel Amir Mir",
    role: "Team Lead",
    email: "colonel.amir@company.com",
    level: "lead",
    image: "/images/placeholder_img.jpg",
  },
  {
    id: 7,
    name: "Ahsan Hasib",
    role: "Developer",
    email: "ahsan.hasib@company.com",
    level: "team",
    image: "/images/placeholder_img.jpg",
  },
  {
    id: 8,
    name: "Ahsan Hasib",
    role: "Developer",
    email: "ahsan.hasib@company.com",
    level: "team",
    image: "/images/placeholder_img.jpg",
  },
];

const developers: TeamMember[] = [
  {
    id: 6,
    name: "Ahsan Hasib",
    role: "Developer",
    email: "ahsan.hasib@company.com",
    level: "team",
    image: "/images/placeholder_img.jpg",
  },
  {
    id: 9,
    name: "Mr. Umarakhmed",
    role: "Team Lead",
    email: "umarakhmed@company.com",
    level: "lead",
    image: "/images/placeholder_img.jpg",
  },
  {
    id: 10,
    name: "Ahsan Hasib",
    role: "Developer",
    email: "ahsan.hasib@company.com",
    level: "team",
    image: "/images/placeholder_img.jpg",
  },
  {
    id: 11,
    name: "Ahsan Hasib",
    role: "Developer",
    email: "ahsan.hasib@company.com",
    level: "team",
    image: "/images/placeholder_img.jpg",
  },
];

const OurOfficersPage = () => {
  return (
    <section className="w-full">
        <WrapperHeroBanner />
      <div className="container mx-auto px-4">
        <EmployeeCategory />
        <div className="">
          <h2 className="text-center text-2xl font-semibold mb-8 max-w-fit mx-auto border-b-2 border-primary pb-2">
            Executive Management
          </h2>

          <div className="flex justify-center mb-10">
            <div className="max-w-sm w-full">
              {executiveTeam.map((member) => (
                <TeamMemberCardWrapper key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="max-w-sm w-full">
            {secondLevel.map((member) => (
              <TeamMemberCardWrapper key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {thirdLevel.map((member) => (
            <TeamMemberCardWrapper key={member.id} member={member} />
          ))}
        </div>

        <div className="">
          <h2 className="text-center text-2xl font-semibold mb-8 max-w-fit mx-auto border-b-2 border-primary pb-2">
            Executive Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {developers.map((member) => (
              <TeamMemberCardWrapper key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurOfficersPage;
