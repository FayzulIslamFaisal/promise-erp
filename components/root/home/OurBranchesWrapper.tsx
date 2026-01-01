import SectionTitle from "@/components/common/SectionTitle";
import OurBranches from "./OurBranches";
import { fetchAllBranches } from "@/apiServices/homePageService";

const OurBranchesWrapper = async () => {

  const branches = await fetchAllBranches();

  console.log(branches, "branches");

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
