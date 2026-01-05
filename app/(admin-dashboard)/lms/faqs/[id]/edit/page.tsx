import { getFaqById } from "@/apiServices/faqsService";
import FaqsForm from "@/components/lms/faqs/FaqsForm";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faqId = Number(id);

  try {
    const faqRes = await getFaqById(faqId);

    // Extract FAQ data safely
    const faq = faqRes?.data ?? null;

    if (!faq) return <div>No FAQ found.</div>;

    return (
      <FaqsForm
        title="Edit FAQ"
        faq={faq}
      />
    );
  } catch (error: unknown) {
    return <div>Error: {error instanceof Error ? error.message : "Something went wrong."}</div>;
  }
}
