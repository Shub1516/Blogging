import React from "react";
import Container from "../Container";
import HeroSection from "./HeroSection";
import FeaturedArticles from "./FeaturedArticles";
import LatestArticle from "./LatestArticle";
import { createSupabaseServerClient } from "../../lib/supabase/server"; // Your server client

export default async function page() {
    const supabase = await createSupabaseServerClient();

    const { data: latestPosts, latesterror } = await supabase
        .from("posts")
        .select("*, profiles(fullname,email)")
        .eq("published", true)
        // 1. Sort by created_at in descending order (newest first)
        .order("created_at", { ascending: false })
        // 2. Limit the result set to exactly 6 records
        .limit(6);
    console.log("latestPosts ", latestPosts);
    const { data: featuredPosts, featurederror } = await supabase
        .from("posts")
        .select("*, profiles(fullname,email)")
        .eq("published", true)
        // 1. Sort by created_at in descending order (newest first)
        .order("created_at", { ascending: false })
        // 2. Limit the result set to exactly 6 records
        .limit(1);
    console.log("featuredPosts ", featuredPosts);
    return (
        <Container>
            <HeroSection />
            <FeaturedArticles posts={featuredPosts} />
            <LatestArticle posts={latestPosts} />
        </Container>
    );
}
