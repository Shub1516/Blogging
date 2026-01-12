// app/search/page.jsx
import { createSupabaseServerClient } from "../lib/supabase/server"; // Your server client
import PostCard from "../component/PostCard";
import Container from "../component/Container";

export default async function SearchPage(props) {
  // In Next.js 14/15, searchParams is a Promise or a plain object.
  // We must extract the specific 'q' string.
  const searchParams = await props.searchParams;
  const queryText = searchParams?.q || "";

  const supabase = await createSupabaseServerClient();

  const searchWords = queryText.split(" ").filter(word => word.length > 0);

let query = supabase
  .from("posts")
  .select("*, profiles(email)")
  .eq("published", true);

// Chain an .ilike for every word entered
searchWords.forEach(word => {
  query = query.ilike("title", `%${word}%`);
});

const { data: posts, error } = await query;

  return (
    <>
    <div className="m-40">
      {posts?.length > 0 ? (
        <PostCard post={posts} query={queryText}/>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">
            No articles found matching {queryText}
          </p>
        </div>
      )}
     </div>
    </>
  );
}
