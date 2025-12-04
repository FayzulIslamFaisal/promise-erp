'use client'

import { getGroupById, updateGroup, Group, GroupFormData } from '@/apiServices/groupService'
import GroupForm from '@/components/lms/groups/GroupForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

export default function EditGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [group, setGroup] = useState<Group | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await getGroupById(resolvedParams.id)
        setGroup(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      }
    }

    fetchGroup()
  }, [resolvedParams.id])

  const handleSubmit = async (
    formData: GroupFormData,
    setFormError: (field: string, message: string) => void
  ) => {
    const res = await updateGroup(resolvedParams.id, formData)

    if (res.success) {
      handleFormSuccess(res.message || 'Group updated successfully!')
      router.push('/lms/groups')
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!group) {
    return <div>Loading...</div>
  }

  return <GroupForm title="Edit Group" onSubmit={handleSubmit} group={group} />
}
