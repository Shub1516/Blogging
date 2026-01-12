import React from "react";
import { createSupabaseServerClient } from "../lib/supabase/server";
import PostCard from "../component/WritePostCard";
import { redirect } from "next/navigation";

export default async function Page() {
  // 1. Initialize the server client (this reads the cookies automatically)
  const supabase = await createSupabaseServerClient();

  // 2. Ask Supabase who the user is based on those cookies
  // Always use getUser() for security on the server
  const { data: { user }, error } = await supabase.auth.getUser();

  // DEBUGGING: Check your terminal (not browser console)
  if (user) {
    console.log("✅ User is logged in:", user.email);
  } else {
    console.log("❌ No user found in cookies");
  }

  // 3. If no user, send them back to login
  if (!user || error) {
    redirect("/login");
  }

  // 4. If we reach here, the user is authenticated
  return (
    <main className="container mx-auto py-10">
       {/* Pass the user ID to your card so the post can be linked to them */}
       <PostCard />
    </main>
  );
}