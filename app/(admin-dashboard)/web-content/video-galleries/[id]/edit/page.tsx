'use client'

import { getVideoGalleryById, updateVideoGallery, VideoGallery } from '@/apiServices/homePageAdminService'
import VideoGalleryForm from '@/components/web-content/video-galleries/VideoGalleryForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { handleFormErrors, handleFormSuccess } from '@/lib/formErrorHandler'
import { UseFormSetError } from 'react-hook-form'
import { ApiErrorResponse } from '@/lib/apiErrorHandler'

export default function EditVideoGalleryPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const resolvedParams = use(params)
    const [videoGallery, setVideoGallery] = useState<VideoGallery | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchVideoGallery = async () => {
            try {
                const response = await getVideoGalleryById(Number(resolvedParams.id))
                if (response?.data) {
                    setVideoGallery(response.data)
                } else {
                    setError('Video gallery not found')
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('An unexpected error occurred.')
                }
            }
        }

        fetchVideoGallery()
    }, [resolvedParams.id])

    const handleSubmit = async (
        formData: FormData,
        setFormError: (field: string, message: string) => void
    ) => {
        const res = await updateVideoGallery(Number(resolvedParams.id), formData)

        if (res.success) {
            handleFormSuccess(res.message || 'Video gallery updated successfully!')
            router.push('/web-content/video-galleries')
        } else {
            handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>)
        }
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>
    }

    if (!videoGallery) {
        return <div className="p-8 text-center">Loading...</div>
    }

    return <VideoGalleryForm title="Edit Video Gallery" onSubmit={handleSubmit} videoGallery={videoGallery} />
}
