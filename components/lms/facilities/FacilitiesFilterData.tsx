import { getFacilities } from "@/apiServices/facilitiesService";
import FacilitiesFilter from "./FacilitiesFilter";

export default async function FacilitiesFilterData() {
  const res = await getFacilities(); 

  return (
    <FacilitiesFilter
      facilities={res.data?.facilities || []}      
    />
  );
}
