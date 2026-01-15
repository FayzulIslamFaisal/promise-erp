import { getOpportunityById, Opportunity } from '@/apiServices/homePageAdminService'
import ErrorComponent from '@/components/common/ErrorComponent'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import OpportunitiesForm from '@/components/web-content/opportunities/OpportunitiesForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditOpportunityPage({ params }: PageProps) {
  const { id } = await params

  const response = await getOpportunityById(Number(id))

  if (!response?.data) {
    return <NotFoundComponent message={response.message || "No opportunity found."} />
  }

  if (!response.success) {
    return <ErrorComponent message={response.message || "Failed to load opportunity."} />
  }

  const opportunity: Opportunity = response?.data

  return (
    <OpportunitiesForm
      title="Edit Opportunity"
      opportunity={opportunity}
    />
  )
}
