'use client'

import { getDistrictById, updateDistrict, District, AddDistrictApiResponse, DistrictFormData } from '@/apiServices/districtService'
import DistrictForm from '@/components/districts/DistrictForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState, use } from 'react'

export default function EditDistrictPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [district, setDistrict] = useState<District | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const response = await getDistrictById(resolvedParams.id)
        setDistrict(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      }
    }

    fetchDistrict()
  }, [resolvedParams.id])

  const handleSubmit = async (
    formData: DistrictFormData,
    setFormError: (field: string, message: string) => void
  ) => {
    try {
      const res: AddDistrictApiResponse = await updateDistrict(resolvedParams.id, formData)

      if (res?.success) {
        toast.success(res.message || 'District updated successfully!')
        router.push('/districts')
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0])
          }
        })
        toast.error('Please fix the errors below.')
      } else {
        toast.error(res?.message || 'Failed to update district.')
      }
    } catch {
      toast.error('Something went wrong. Try again later.')
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!district) {
    return <div>Loading...</div>
  }

  return <DistrictForm title="Edit District" onSubmit={handleSubmit} district={district} />
}
