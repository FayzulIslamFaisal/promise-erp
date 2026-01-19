import { getPartnerById, Partner } from '@/apiServices/homePageAdminService'
import ErrorComponent from '@/components/common/ErrorComponent'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import OurPartnersForm from '@/components/web-content/our-partners/OurPartnersForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPartnerPage({ params }: PageProps) {
  const { id } = await params

  const response = await getPartnerById(Number(id))

  if (!response?.data) {
    return <NotFoundComponent message={response.message || "No partner found."} />
  }

  if (!response.success) {
    return <ErrorComponent message={response.message || "Failed to load partner."} />
  }

  const partner: Partner = response?.data

  return (
    <OurPartnersForm
      title="Edit Partner"
      partner={partner}
    />
  )
}
