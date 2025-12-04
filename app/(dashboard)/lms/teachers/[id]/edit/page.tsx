'use client'

import { getTeacherById, updateTeacher, Teacher } from '@/apiServices/teacherService'
import UserForm from '@/components/common/UserForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

export default function EditTeacherPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await getTeacherById(resolvedParams.id)
        setTeacher(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      }
    }

    fetchTeacher()
  }, [resolvedParams.id])

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void
  ) => {
    const res = await updateTeacher(resolvedParams.id, formData)

    if (res.success) {
      handleFormSuccess(res.message || 'Teacher updated successfully!')
      router.push('/lms/teachers')
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!teacher) {
    return <div>Loading...</div>
  }

  return <UserForm title="Edit Teacher" onSubmit={handleSubmit} user={teacher} />
}