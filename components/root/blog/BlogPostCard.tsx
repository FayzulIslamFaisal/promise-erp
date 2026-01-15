import BlogCardItems from "../home/BlogCardItems";

 interface BlogCategory {
  id: number;
  title: string;
  slug?: string;
}
 interface Blog {
  id: number;
  category: BlogCategory;
  title: string;
  slug: string;
  author?: string;
  short_description?: string;
  thumbnail: string;
  published_at: string;
}
const blogs: Blog[] = [
  {
    id: 1,
    category: {
      id: 1,
      title: "Technology",
      slug: "technology",
    },
    title: "AI is Transforming Web Development",
    slug: "ai-transforming-web-development",
    author: "Mfb Faisal",
    short_description:
      "How AI tools are changing the way developers build modern web apps.",
    thumbnail: "/images/placeholder_img.jpg",
    published_at: "2025-12-01",
  },
  {
    id: 2,
    category: {
      id: 2,
      title: "Backend",
      slug: "backend",
    },
    title: "Why NestJS is the Future of Backend",
    slug: "why-nestjs-future-backend",
    author: "Admin",
    short_description:
      "A deep dive into why NestJS is becoming the go-to backend framework.",
    thumbnail: "/images/placeholder_img.jpg",
    published_at: "2025-12-05",
  },
  {
    id: 3,
    category: {
      id: 3,
      title: "Frontend",
      slug: "frontend",
    },
    title: "Next.js App Router Explained",
    slug: "nextjs-app-router-explained",
    author: "Frontend Team",
    short_description:
      "Understanding App Router, Server Components, and routing patterns.",
    thumbnail: "/images/placeholder_img.jpg",
    published_at: "2025-12-10",
  },
  {
    id: 4,
    category: {
      id: 4,
      title: "Career",
      slug: "career",
    },
    title: "AI Era: Skills Developers Must Learn",
    slug: "ai-era-developer-skills",
    author: "Career Guide",
    short_description:
      "The most important skills developers need to survive and grow in the AI era.",
    thumbnail: "/images/placeholder_img.jpg",
    published_at: "2025-12-15",
  },
  {
    id: 5,
    category: {
      id: 5,
      title: "DevOps",
      slug: "devops",
    },
    title: "Deploying NestJS Apps Like a Pro",
    slug: "deploying-nestjs-like-pro",
    author: "DevOps Team",
    short_description:
      "Best practices for deploying NestJS applications in production.",
    thumbnail: "/images/placeholder_img.jpg",
    published_at: "2025-12-20",
  },
  {
    id: 6,
    category: {
      id: 6,
      title: "Security",
      slug: "security",
    },
    title: "JWT Authentication Best Practices",
    slug: "jwt-auth-best-practices",
    author: "Security Expert",
    short_description:
      "Learn how to properly implement JWT authentication securely.",
    thumbnail: "/images/placeholder_img.jpg",
    published_at: "2025-12-25",
  },
];

const BlogPostCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <BlogCardItems key={blog.id} post={blog} />
      ))}
    </div>
  );
};

export default BlogPostCard;
