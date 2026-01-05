import { getJoinById } from "@/apiServices/joinService";
import JoinForm from "@/components/lms/who-can-join/JoinForm";

export default async function EditJoinPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const joinId = Number(id);

  try {
    const joinRes = await getJoinById(joinId);
    const join = joinRes?.data ?? null;

    if (!join) return <div>No join item found.</div>;

    return (
      <JoinForm
        title="Edit Join Option"
        join={join}
      />
    );
  } catch (error: unknown) {
    return <div>Error: {error instanceof Error ? error.message : "Something went wrong."}</div>;
  }
}
