import BlogCategorySidebar from "@/components/root/blog/BlogCategorySidebar";
import BloggWrapperBanner from "@/components/root/blog/BloggWrapperBanner";
import BlogPostWrapper from "@/components/root/blog/BlogPostWrapper";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface BlogPageParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const BlogPage = ({ searchParams }: BlogPageParams) => {

  return (
    <>
      <BloggWrapperBanner />
      <section className="">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24">
                <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                  <BlogCategorySidebar />
                </Suspense>
              </div>
            </aside>

            {/* Main Content */}
            <Suspense fallback={<div className="lg:col-span-8 xl:col-span-9 flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
              <BlogPostWrapper searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
