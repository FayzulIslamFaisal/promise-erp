import { getNewsFeedById, NewsFeed } from '@/apiServices/homePageAdminService'
import ErrorComponent from '@/components/common/ErrorComponent'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import NewsFeedForm from '@/components/web-content/news-feeds/NewsFeedsForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditNewsFeedPage({ params }: PageProps) {
  const { id } = await params

  const response = await getNewsFeedById(Number(id))

  if (!response?.data) {
    return <NotFoundComponent message={response.message || "No news feed found."} />
  }

  if (!response.success) {
    return <ErrorComponent message={response.message || "Failed to load news feed."} />
  }

  const newsFeed: NewsFeed = response?.data

  return (
    <NewsFeedForm
      title="Edit News Feed"
      newsFeed={newsFeed}
    />
  )
}
