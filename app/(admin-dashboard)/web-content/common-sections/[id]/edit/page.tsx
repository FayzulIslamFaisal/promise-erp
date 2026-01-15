import { getCommonSectionById, CommonSection } from '@/apiServices/homePageAdminService'
import ErrorComponent from '@/components/common/ErrorComponent'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import CommonSectionForm from '@/components/web-content/common-sections/CommonSectionsForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditCommonSectionPage({ params }: PageProps) {
  const { id } = await params

  const response = await getCommonSectionById(Number(id))

  if (!response?.data) {
    return <NotFoundComponent message={response.message || "No common section found."} />
  }

  if (!response.success) {
    return <ErrorComponent message={response.message || "Failed to load common section."} />
  }

  const commonSection: CommonSection = response?.data

  return (
    <CommonSectionForm
      title="Edit Common Section"
      commonSection={commonSection}
    />
  )
}
