import { getFacilityById } from "@/apiServices/facilitiesService";
import FacilitiesForm from "@/components/lms/facilities/FacilitiesForm";

export default async function EditFacilityPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const facilityId = Number(id);

  try {
    const facilityRes = await getFacilityById(facilityId);

    const facility = facilityRes?.facility ?? null;

    if (!facility) return <div>No Facility found.</div>;

    return <FacilitiesForm title="Edit Facility" facility={facility} />;
  } catch (error: any) {
    return <div>Error: {error?.message || "Something went wrong."}</div>;
  }
}
