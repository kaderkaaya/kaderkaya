import { getPosts } from "@/repositories/posts";
import { WritingTable } from "@/components/admin/writing-table";

export default async function AdminWritingPage() {
  const posts = await getPosts();
  return <WritingTable initial={posts} />;
}
