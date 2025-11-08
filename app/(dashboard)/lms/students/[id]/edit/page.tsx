'use client'

import { getStudentById, updateStudent, Student, StudentResponseType } from '@/apiServices/studentService'
import UserForm from '@/components/common/UserForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState, use } from 'react'

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
    try {
      const res: StudentResponseType = await updateStudent(resolvedParams.id, formData)

      if (res?.success) {
        toast.success(res.message || 'Student updated successfully!')
        router.push('/lms/students')
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0])
          }
        })
        toast.error('Please fix the errors below.')
      } else {
        toast.error(res?.message || 'Failed to update student.')
      }
    } catch {
      toast.error('Something went wrong. Try again later.')
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