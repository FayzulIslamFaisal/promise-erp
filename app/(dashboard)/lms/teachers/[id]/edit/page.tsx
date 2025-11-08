'use client'

import { getTeacherById, updateTeacher, Teacher, TeacherResponseType } from '@/apiServices/teacherService'
import UserForm from '@/components/common/UserForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState, use } from 'react'

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
    try {
      const res: TeacherResponseType = await updateTeacher(resolvedParams.id, formData)

      if (res?.success) {
        toast.success(res.message || 'Teacher updated successfully!')
        router.push('/lms/teachers')
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0])
          }
        })
        toast.error('Please fix the errors below.')
      } else {
        toast.error(res?.message || 'Failed to update teacher.')
      }
    } catch {
      toast.error('Something went wrong. Try again later.')
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