import { getFaqs } from "@/apiServices/faqsService";
import FaqsFilter from "./FaqsFilter";

export default async function FaqsFilterData() {
  await getFaqs(1, {
    search: "",
    sort_by: "created_at",
    sort_order: "desc",
    per_page: 15,
  });

  return <FaqsFilter />;
}
