import { getVideoGalleryById, VideoGallery } from '@/apiServices/homePageAdminService'
import ErrorComponent from '@/components/common/ErrorComponent'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import VideoGalleryForm from '@/components/web-content/video-galleries/VideoGalleryForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditVideoGalleryPage({ params }: PageProps) {
  const { id } = await params

  const response = await getVideoGalleryById(Number(id))

  if (!response?.data) {
    return <NotFoundComponent message={response.message || "No video galleries found."} />
  }

  if (!response.success) {
    return <ErrorComponent message={response.message || "Failed to load video gallery."} />
  }

  const videoGallery: VideoGallery = response?.data

  return (
    <VideoGalleryForm
      title="Edit Video Gallery"
      videoGallery={videoGallery}
    />
  )
}
