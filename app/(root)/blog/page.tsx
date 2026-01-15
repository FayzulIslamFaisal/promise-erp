import BlogCategorySidebar from "@/components/root/blog/BlogCategorySidebar";
import BlogFeaturedPost from "@/components/root/blog/BlogFeaturedPost";
import BloggWrapperBanner from "@/components/root/blog/BloggWrapperBanner";
import BlogPostCard from "@/components/root/blog/BlogPostCard";

const BlogPage = () => {
  return (
    <>
      <BloggWrapperBanner />
      <section className="">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24">
                <BlogCategorySidebar />
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-8">
              {/* Featured Posts Section */}
              <BlogFeaturedPost />
              {/* Recent Posts Section */}
              <BlogPostCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
