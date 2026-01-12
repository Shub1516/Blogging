import React from "react";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import EditPostDetails from "../../component/EditPostDetails";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function page({ params }) {
    const { postid: id } = await params;
    console.log("post Id in edit post", id);
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .eq("posted_by", user.id)
        .single();

    if (!post) {
        console.log("no post found");
    }

    return (
        <main>
            <EditPostDetails post={post} />
        </main>
    );
}
