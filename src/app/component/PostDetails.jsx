"use client";
import React from "react";
import { MessageSquare, Calendar, User } from "lucide-react";
import InteractionBar from "./InteractionBar";
import CommentSection from "./CommentSection";
import Editor from "./Editor";
import Image from "next/image";
import { Chip } from "@heroui/chip";

export default function pageDetails({ post }) {
  console.log("Post in PostDetails:", post);
  // Parse the string '["technology","science"]' into a real array
  const categoryArray =
    typeof post.category === "string"
      ? JSON.parse(post.category)
      : post.category;
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
          {/* {post.title} */}
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-1">
            <User size={16} />
            {/* <span>{post.profiles?.username}</span> */}
            <span>{post.profiles?.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {/* <span>{new Date(post.created_at).toLocaleDateString()}</span> */}
            <span>
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
        {categoryArray.slice(0, 2).map((cat, index) => (
          <span
                      key={index}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100"
                    >
                      {cat}
                    </span>
        ))}
      </div>
      <div className="w-full h-64 bg-slate-100 rounded-2xl mb-8 overflow-hidden mt-3">
        <Image
          src={post.banner_image}
          width={900}
          height={400}
          alt={post.title}
          className="w-full h-full object-contain"
        />
      </div>

      <article className="prose prose-slate lg:prose-lg max-w-none mb-12">
        {/* {post.content} */}
        <Editor content={post.content} isReadOnly={true} />
      </article>

      <div className="border-y border-slate-100 py-4 mb-12">
        <InteractionBar postId={post.id} likes={post.likes} />
      </div>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare size={20} className="text-[#fa2c37]" />
          <h2 className="text-xl font-bold text-slate-900">
            Comments ({post.comments?.length || 0})
          </h2>
        </div>
        <CommentSection postId={post.id} comments={post.comments} />
      </section>
    </div>
  );
}
