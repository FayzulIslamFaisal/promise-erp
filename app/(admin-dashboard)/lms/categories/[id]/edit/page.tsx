
import CategoryForm from "@/components/lms/categories/CategoryForm";
import { getCategoryById } from "@/apiServices/categoryService";
import NotFoundComponent from "@/components/common/NotFoundComponent";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const {id} = await params;
  const res = await getCategoryById(Number(id));
  if (!res?.data) {
    return (<NotFoundComponent message={res?.message} />);
  }

  return (
    <CategoryForm
      title="Edit Category"
      category={res.data}
    />
  );
}
