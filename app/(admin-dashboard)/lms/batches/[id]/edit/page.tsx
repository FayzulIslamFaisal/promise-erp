'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UseFormSetError } from 'react-hook-form'

import { getBatchById, updateBatch, Batch, CreateBatchRequest } from '@/apiServices/batchService'
import BatchForm from '@/components/lms/batches/BatchForm'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

type EditBatchPageProps = {
  params: Promise<{
    id: string
  }>
}

export default function EditBatchPage({ params }: EditBatchPageProps) {
  const router = useRouter()
  const { id: batchId } = use(params)

  const [batch, setBatch] = useState<Batch | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadBatch() {
      try {
        const res = await getBatchById(batchId)
        setBatch(res.data)
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Failed to load batch data'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadBatch()
  }, [batchId])

  async function handleSubmit(
    formData: CreateBatchRequest,
    setFormError: (field: any, message: string) => void
  ) {
    const res = await updateBatch(batchId, formData)

    if (res.success) {
      handleFormSuccess(res.message ?? 'Batch updated successfully')
      router.push('/lms/batches')
      return
    }

    handleFormErrors(
      res as ApiErrorResponse,
      setFormError as UseFormSetError<Batch>
    )
  }

  if (isLoading) {
    return <div>Loading batch...</div>
  }

  if (errorMessage) {
    return <div className="text-red-500">{errorMessage}</div>
  }

  if (!batch) {
    return <div>Batch not found</div>
  }

  return (
    <BatchForm
      title="Edit Batch"
      batch={batch}
      onSubmit={handleSubmit}
    />
  )
}
