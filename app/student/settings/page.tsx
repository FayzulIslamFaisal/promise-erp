import ProfileTabs from "@/components/student-dashboard/ProfileTabs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const SettingsPage = () => {
  return (
    <section className="py-4 px-4">
      <div className="flex items-center gap-2 px-4 mb-5">
        <Link href="/" className="text-secondary">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-secondary">
          Profile Settings
        </h1>
      </div>
      <ProfileTabs />
    </section>
  );
};

export default SettingsPage;
