import { getJoinById, JoinType } from '@/apiServices/joinService'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import JoinForm from '@/components/lms/who-can-join/JoinForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditJoinPage({ params }: PageProps) {
  const { id } = await params

  const response = await getJoinById(Number(id))

  if (!response?.data) {
    return <NotFoundComponent message={response.message || "No join item found."} />;
  }
  const join: JoinType = response?.data

  return (
    <JoinForm
      title="Edit Join"
      join={join}
    />
  )
}
