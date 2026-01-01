'use client'

import { getCategoryById, updateCategory, Category } from '@/apiServices/categoryService'
import CategoryForm from '@/components/lms/categories/CategoryForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [category, setCategory] = useState<Category | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(Number(resolvedParams.id))
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
    const res = await updateCategory(Number(resolvedParams.id), formData)

    if (res.success) {
      handleFormSuccess(res.message || 'Category updated successfully!')
      router.push('/lms/categories')
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>)
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
