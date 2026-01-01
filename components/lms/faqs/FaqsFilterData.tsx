import { getFaqs } from "@/apiServices/faqsService";
import FaqsFilter from "./FaqsFilter";

export default async function FaqsFilterData() {
  await getFaqs({
    search: "",
    sort_by: "created_at",
    sort_order: "desc",
    per_page: 15,
    page: 1,
  });

  return <FaqsFilter />;
}
