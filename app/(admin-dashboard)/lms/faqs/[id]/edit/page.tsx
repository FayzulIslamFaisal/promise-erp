import { getFaqById, Faq } from '@/apiServices/faqsService'
import NotFoundComponent from '@/components/common/NotFoundComponent'
import FaqsForm from '@/components/lms/faqs/FaqsForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}
export default async function EditFaqPage({ params }: PageProps) {
  const { id } = await params  

  const response = await getFaqById(Number(id))

  if (!response?.data) {
    return <NotFoundComponent message={response.message || "No faqs found."} />;
  }
  const faq: Faq = response?.data

  return (
    <FaqsForm
      title="Edit FAQ"
      faq={faq}
    />
  )
}
