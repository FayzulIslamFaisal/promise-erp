'use client'

import { getCategoryById, updateCategory, Category, SingleCategoryResponse, UpdateCategoryRequest } from '@/apiServices/categoryService'
import CategoryForm from '@/components/lms/categories/CategoryForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState, use } from 'react'

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [category, setCategory] = useState<Category | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response: SingleCategoryResponse = await getCategoryById(Number(resolvedParams.id))
        if (response?.data) {
          setCategory(response.data)
        } else {
          setError('Category not found')
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      }
    }

    fetchCategory()
  }, [resolvedParams.id])

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void
  ) => {
    try {
      const res: SingleCategoryResponse = await updateCategory(Number(resolvedParams.id), formData)

      if (res?.success) {
        toast.success(res.message || 'Category updated successfully!')
        router.push('/lms/categories')
      }else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0])
          }
        })
        toast.error('Please fix the errors below.')
      }else {
        toast.error(res?.message || 'Failed to update category.')
      }
    } catch(error: unknown) {
      console.error("Something went wrong. Try again later.", error);
      toast.error("Something went wrong. Try again later.");
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!category) {
    return <div>Loading...</div>
  }

  return <CategoryForm title="Edit Category" onSubmit={handleSubmit} category={category} />
}
