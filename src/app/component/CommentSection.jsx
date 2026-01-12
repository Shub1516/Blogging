"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, ChevronDown } from "lucide-react"; // Added ChevronDown
import { createSupabaseBrowserClient } from "../lib/supabase/client";
import { toast } from "sonner";

export default function CommentSection({ postId, comments }) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [user, setUser] = useState(null);
  const [commentText, setCommentText] = useState("");

  // --- Pagination State ---
  const COMMENTS_PER_PAGE = 3;
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    }
    fetchUser();
  }, [supabase]);

  const handleSubmitComment = async () => {
    if (!user) {
      toast.error("Login Required", {
              description: "You must be logged in to post a comment.",
            });
      router.push('/login')
      return;
    }
    if (!commentText?.trim()) {
      toast.error("Error", {
              description: "Comment cannot be empty!",
            });
      return;
    }

    const { error } = await supabase.from("comments").insert({
      comment: commentText,
      post_id: postId,
      created_by: user.id,
    });

    if (!error) {
      setCommentText("");
      router.refresh();
      // Reset pagination to show the new comment at the top if needed
      setVisibleCount(COMMENTS_PER_PAGE);
    } else {
      alert("Failed to post comment.");
    }
  };

  // Logic to slice the comments array
  const paginatedComments = comments?.slice(0, visibleCount) || [];
  const hasMore = comments?.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + COMMENTS_PER_PAGE);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="relative">
        <textarea
          placeholder="Add to the discussion..."
          className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          rows="3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          onClick={handleSubmitComment}
          className="absolute bottom-3 right-3 p-2 bg-[#fa2c37] text-white rounded-lg hover:bg-black transition-colors"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Comments List Section */}
      <div className="space-y-4">
        {paginatedComments.length > 0 ? (
          paginatedComments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-4 rounded-xl border border-slate-50 bg-white shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 shrink-0 flex items-center justify-center font-bold text-[#fa2c37] text-sm">
                {comment.profiles?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-slate-900 text-sm">
                    {comment.profiles?.email || "Anonymous"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {comment.created_at
                      ? new Date(comment.created_at).toLocaleDateString("en-GB")
                      : "Recent"}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400 py-8 italic">
            No comments yet. Be the first!
          </p>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <ChevronDown size={16} />
              Load {comments.length - visibleCount} more comments
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
