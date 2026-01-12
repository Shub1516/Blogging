import PostDetails from "../../component/PostDetails";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { notFound } from "next/navigation";

export default async function page({ params }) {
  const { post: id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Fetched  Id:", id);
  console.log("Current User: in postDetail", user);
  // Fetch Post with related Profiles and Comments

  const { data: post } = await supabase
    .from("posts")
    .select(
      "*, profiles(email),comments(*, profiles(email)),likes(*,profiles(email))"
    )
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <main className="container mx-auto py-10">
      <PostDetails post={post} />
    </main>
  );
}
