'use client'

import { getStudentById, updateStudent, Student } from '@/apiServices/studentService'
import UserForm from '@/components/common/UserForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

export default function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params) // ✅ unwrap the params promise
  const [student, setStudent] = useState<Student | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(resolvedParams.id)
        setStudent(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      }
    }

    fetchStudent()
  }, [resolvedParams.id])

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void
  ) => {
    const res = await updateStudent(resolvedParams.id, formData)

    if (res.success) {
      handleFormSuccess(res.message || 'Student updated successfully!')
      router.push('/lms/students')
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!student) {
    return <div>Loading...</div>
  }

  return <UserForm title="Edit Student" onSubmit={handleSubmit} user={student} />
}