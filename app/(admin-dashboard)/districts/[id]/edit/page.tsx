'use client'

import { getDistrictById, updateDistrict, District, DistrictFormData } from '@/apiServices/districtService'
import DistrictForm from '@/components/districts/DistrictForm'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

export default function EditDistrictPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const districtId = Number(params.id)
  const [district, setDistrict] = useState<District | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (Number.isNaN(districtId)) return
    const fetchDistrict = async () => {
      try {
        const response = await getDistrictById(districtId)
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
  }, [districtId])

  const handleSubmit = async (
    formData: DistrictFormData,
    setFormError: (field: string, message: string) => void
  ) => {
    const res = await updateDistrict(districtId, formData)

    if (res.success) {
      handleFormSuccess(res.message || 'District updated successfully!')
      router.push('/districts')
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>)
    }
  }

  if (Number.isNaN(districtId)) {
    return <div>Invalid district id</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  if (!district) {
    return <div>Loading...</div>
  }

  return <DistrictForm title="Edit District" onSubmit={handleSubmit} district={district} />
}
