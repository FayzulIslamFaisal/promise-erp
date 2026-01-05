import { getFacilityById, Facility } from '@/apiServices/facilitiesService'
import FacilitiesForm from '@/components/lms/facilities/FacilitiesForm'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    id: string
  }>
}
export default async function EditFacilityPage({ params }: PageProps) {
  const { id } = await params  

  const response = await getFacilityById(Number(id))

  if (!response?.data) {
    notFound()
  }

  const facility: Facility = response.data

  return (
    <FacilitiesForm
      title="Edit Facility"
      facility={facility}
    />
  )
}
