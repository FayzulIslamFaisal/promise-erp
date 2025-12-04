import SectionTitle from "@/components/common/SectionTitle";
import OurBranches from "./OurBranches";
import { fetchAllBranches } from "@/apiServices/homePageService";
import { HomesearchParamsProps } from "@/app/(root)/page";

const OurBranchesWrapper = async ({searchParams}:HomesearchParamsProps) => {
  const queryParams = await searchParams;
  const page = queryParams.page ? Number(queryParams.page) : 1;

  const params = {per_page: queryParams.per_page ? queryParams.per_page : "100"};
  const branches = await fetchAllBranches({page,params});

  return (
    <section className="py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Branches"
          subtitle="Find our learning centers near you."
          iswhite={false}
        />
          <OurBranches branchesData={branches} />
      </div>
    </section>
  );
};

export default OurBranchesWrapper;
