import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobInfoRoleOverview = () => {
  return (
    <Card className="gap-2 shadow-sm py-0">
      <div className="h-2 bg-linear-to-r from-secondary via-primary to-secondary rounded-tl-xl rounded-tr-xl "></div>
      <CardHeader className="pb-0 pt-4">
        <CardTitle className="text-2xl font-bold text-secondary flex items-center gap-2 mb-0">
          Role Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-black/60 leading-relaxed">
          We are seeking a highly skilled Content Writer & Digital Content
          Strategist who can take full ownership of our content
          ecosystem—covering website content, branding content, SEO,
          analytics-driven optimization, and cross-platform communication. This
          role requires someone who can think strategically, write with
          authority, and craft compelling stories aligned with business
          objectives.
        </p>
      </CardContent>
    </Card>
  );
};

export default JobInfoRoleOverview;
