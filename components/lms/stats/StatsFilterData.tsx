import { getBranches } from "@/apiServices/branchService";
import StatsFilter from "./StatsFilter";

export default async function StatsFilterData() {
  const branchesRes = await getBranches({ per_page: 100 });
  const branches = branchesRes?.data?.branches ?? [];

  return <StatsFilter branches={branches} />;
}
