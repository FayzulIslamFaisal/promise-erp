import { getBatchById, Batch } from '@/apiServices/batchService'
import ErrorComponent from '@/components/common/ErrorComponent'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import BatchForm from '@/components/lms/batches/BatchForm'

type EditBatchPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditBatchPage({
  params,
}: EditBatchPageProps) {
  const { id: batchId } = await params

  let batch: Batch | null = null
  let message: string | undefined

  try {
    const res = await getBatchById(batchId)
    batch = res.data
    message = res.message
  } catch (error) {
    return (
      <ErrorComponent
        message={
          error instanceof Error
            ? error.message
            : 'Failed to load batch'
        }
      />
    )
  }

  if (!batch) {
    return (
      <NotFoundComponent
        title="Batch"
        message={message || 'No batches found.'}
      />
    )
  }

  return (
    <BatchForm
      title="Edit Batch"
      batch={batch}
    />
  )
}
