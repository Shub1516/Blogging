"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ThumbsUp, ThumbsDown, Share2, Check } from "lucide-react";
import { createSupabaseBrowserClient } from "../lib/supabase/client";
import { toast } from "sonner";
 // Use client-side client

export default function InteractionBar({ postId, likes }) {
  const supabase = createSupabaseBrowserClient();
  //const { data: { user } } = supabase.auth.getUser();
  const [user, setUser] = useState(null);
  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const liked =
          likes?.some((like) => {
            console.log(
              "current liked user",
              like.profiles?.email,
              " current user id ",
              user.email
            );
            like.profiles?.email === user.email;
            setIsCurrentUserLiked(true);
          }) || false;

        console.log("Current User Liked:", liked);
        setUser(user);
      } else {
        console.log("No user logged in / not Liked");
      }
    }
    fetchUser();
  }, [supabase, likes]);

  const handleLike = () => {
    if (!user) {
      toast.error("Login Required", {
        description: "You need to login first",
      });
      return;
    }

    supabase
      .from("likes")
      .insert({ post_id: postId, liked_by: user.id })
      .then(({ error }) => {
        if (!error) {
          setLikeCount((prev) => prev + 1);
          setIsCurrentUserLiked(true);
        }
      });
  };

  const handleRemoveLike = () => {
    if (!user) {
      alert("You must be logged in to remove a like.");
      return;
    }

    supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("liked_by", user.id)
      .then(({ error }) => {
        if (!error) {
          setLikeCount((prev) => Math.max(prev - 1, 0));
          setIsCurrentUserLiked(false);
        }
      });
  };

  const handleShare = async () => {
    try {
      // 1. Get current URL
      const url = window.location.href;

      // 2. Use the Clipboard API
      await navigator.clipboard.writeText(url);

      // 3. Provide visual feedback
      setCopied(true);

      // 4. Reset icon after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* liked or not liked */}
      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full">
        {isCurrentUserLiked ? (
          <button
            onClick={handleRemoveLike}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-[#fa2c37] hover:text-[#fa2c37]"
          >
            <ThumbsUp size={18} />
            <span className="font-medium">{likeCount}</span>
          </button>
        ) : (
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-[#fa2c37]"
          >
            <ThumbsUp size={18} />
            <span className="font-medium">{likeCount}</span>
          </button>
        )}

        {/* liked or not liked closed */}
        <div className="w-px h-4 bg-slate-200" />

        {/* <button className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-red-600">
          <ThumbsDown size={18} />
        </button> */}
      </div>

      <button
        onClick={handleShare}
        className={`flex items-center gap-2 transition-colors ${
          copied ? "text-[#fa2d37]" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        {copied ? <Check size={18} /> : <Share2 size={18} />}
        <span className="text-sm font-medium">
          {copied ? "Copied!" : "Share"}
        </span>
      </button>
    </div>
  );
}
