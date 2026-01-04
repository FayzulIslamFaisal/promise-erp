import SectionTitle from "@/components/common/SectionTitle";
import OurBranches from "./OurBranches";
import { getHomePageAllBranches } from "@/apiServices/homePageService";
import { cacheTag } from "next/cache";

const OurBranchesWrapper = async () => {
  "use cache";
  cacheTag("public-branches");
  const branches = await getHomePageAllBranches();

  return (
    <section className="py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={branches?.data?.section_title}
          subtitle={branches?.data?.section_subtitle}
          iswhite={false}
        />
          <OurBranches branchesData={branches} />
      </div>
    </section>
  );
};

export default OurBranchesWrapper;
