'use client'

import { getDistrictById, updateDistrict, District, DistrictFormData } from '@/apiServices/districtService'
import DistrictForm from '@/components/districts/DistrictForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

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
    const res = await updateDistrict(resolvedParams.id, formData)

    if (res.success) {
      handleFormSuccess(res.message || 'District updated successfully!')
      router.push('/districts')
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>)
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
