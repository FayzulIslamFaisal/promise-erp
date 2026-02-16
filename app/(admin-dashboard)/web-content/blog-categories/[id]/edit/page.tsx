import BlogCategoriesForm from "@/components/web-content/blog-categories/BlogCategoriesForm";
import { getBlogCategoryById } from "@/apiServices/blogCategoryService";
import ErrorComponent from "@/components/common/ErrorComponent";

export default async function EditBlogCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let blogCategoryRes;

  try {
    blogCategoryRes = await getBlogCategoryById(id);
  } catch (error: unknown) {
    console.error("Error fetching blog category:", error);
    if (error instanceof Error) {
      return <ErrorComponent message={error.message} />;
    }
    return (
      <ErrorComponent message="An unexpected error occurred for blog category" />
    );
  }

  const blogCategory = blogCategoryRes?.data;
  return (
    <BlogCategoriesForm
      title="Edit Blog Category"
      blogCategory={blogCategory ?? undefined}
    />
  );
}
