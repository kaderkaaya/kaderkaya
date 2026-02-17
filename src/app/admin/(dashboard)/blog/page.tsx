import { getBlogs } from "@/repositories/blogs";
import { BlogTable } from "@/components/admin/blog-table";

export default async function AdminBlogPage() {
  const blogs = await getBlogs();
  return <BlogTable initial={blogs} />;
}
