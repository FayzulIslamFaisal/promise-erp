
'use client'

import { getBatchById, updateBatch, Batch } from '@/apiServices/batchService'
import BatchForm from '@/components/lms/batches/BatchForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState, use } from 'react'

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
    formData: any,
    setFormError: (field: string, message: string) => void
  ) => {
    try {
      const res: any = await updateBatch(resolvedParams.id, formData)

      if (res?.success) {
        toast.success(res.message || 'Batch updated successfully!')
        router.push('/lms/batches')
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0])
          }
        })
        toast.error('Please fix the errors below.')
      } else {
        toast.error(res?.message || 'Failed to update batch.')
      }
    } catch(error: unknown) {
      console.error("Something went wrong. Try again later.", error);
      toast.error("Something went wrong. Try again later.");
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
