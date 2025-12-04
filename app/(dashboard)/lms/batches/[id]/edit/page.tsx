
'use client'

import { getBatchById, updateBatch, Batch } from '@/apiServices/batchService'
import BatchForm from '@/components/lms/batches/BatchForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

export default function EditBatchPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [batch, setBatch] = useState<Batch | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await getBatchById(resolvedParams.id)
        setBatch(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      }
    }

    fetchBatch()
  }, [resolvedParams.id])

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void
  ) => {
    const res = await updateBatch(resolvedParams.id, formData)

    if (res.success) {
      handleFormSuccess(res.message || 'Batch updated successfully!')
      router.push('/lms/batches')
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<Batch>)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!batch) {
    return <div>Loading...</div>
  }

  return <BatchForm title="Edit Batch" onSubmit={handleSubmit} batch={batch} />
}
