import { notFound, redirect } from "next/navigation";
import PostToggleContainer from "../component/MyPostDetails";
import { createSupabaseServerClient } from "../lib/supabase/server";

export default async function page() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch both drafts and published posts
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("posted_by", user.id)
    .order("created_at", { ascending: false });

  if (!posts) {
    notFound();
  }

  console.log("posts in my Blog Sever", posts);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="py-10">
        <h1 className="text-center text-3xl font-bold mb-10">Your Blogs</h1>
        <PostToggleContainer posts={posts || []} />
      </div>
    </main>
  );
}
