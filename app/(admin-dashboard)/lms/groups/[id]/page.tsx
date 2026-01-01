'use client'

import { getGroupById, Group } from '@/apiServices/groupService'
import { useEffect, useState, use } from 'react'

export default function GroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
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

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!group) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">Group Details</h2>
      <div>
        <p><strong>Name:</strong> {group.group_name}</p>
        <p><strong>Branch:</strong> {group.branch?.name}</p>
        <p><strong>Course:</strong> {group.course?.name}</p>
        <p><strong>Batch:</strong> {group.batch?.name}</p>
        <p><strong>Total Students:</strong> {group.total_students}</p>
        <p><strong>Status:</strong> {group.is_active ? 'Active' : 'Inactive'}</p>
      </div>
    </div>
  )
}
