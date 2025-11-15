'use client'

import { getGroupById, updateGroup, Group, AddGroupApiResponse, GroupFormData } from '@/apiServices/groupService'
import GroupForm from '@/components/lms/groups/GroupForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState, use } from 'react'

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
    try {
      const res: AddGroupApiResponse = await updateGroup(resolvedParams.id, formData)

      if (res?.success) {
        toast.success(res.message || 'Group updated successfully!')
        router.push('/lms/groups')
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0])
          }
        })
        toast.error('Please fix the errors below.')
      } else {
        toast.error(res?.message || 'Failed to update group.')
      }
    } catch(error: unknown) {
      console.error("Something went wrong. Try again later.", error);
      toast.error("Something went wrong. Try again later.");
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
