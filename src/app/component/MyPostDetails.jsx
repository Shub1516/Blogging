"use client";

import React, { useState } from "react";
import { FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export default function PostToggleContainer({ posts }) {
  console.log("post in myBlogs ", posts);
  // 1. State to track which tab is active
  const [isPublished, setIsPublished] = useState(false);

  // 2. Filter the posts based on the state
  const filteredPosts = posts.filter((post) => post.published === isPublished);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tab Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-xl w-fit mb-8 shadow-inner">
        <button
          onClick={() => setIsPublished(true)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isPublished == true
              ? "bg-white text-green-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <CheckCircle size={18} />
          Published
          <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs">
            {posts.filter((p) => p.published == true).length}
          </span>
        </button>

        <button
          onClick={() => setIsPublished(false)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isPublished == false
              ? "bg-white text-[#fa2c37] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Clock size={18} />
          Drafts
          <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs">
            {posts.filter((p) => p.published == false).length}
          </span>
        </button>
      </div>

      {/* Posts Display */}
      <div className="grid gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) =>
            post.published ? (
              <div
                key={post.id}
                className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm flex justify-between items-center hover:shadow-md transition-shadow mb-4"
              >
                <div>
                  <Link key={post.id} href={`/postDetail/${post.id}`}>
                    <h3 className="text-lg font-bold text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last updated:{" "}
                      {new Date(post.lastmodified_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </Link>
                </div>

                <Link key={post.id} href={`/editPost/${post.id}`}>
                  <FaEdit
                    className="text-grey-100 hover:text-grey-300"
                    size={30}
                  />
                </Link>
              </div>
            ) : (
              <Link key={post.id} href={`/editPost/${post.id}`}>
                <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm flex justify-between items-center hover:shadow-md transition-shadow mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last updated:{" "}
                      {new Date(post.lastmodified_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <FaEdit
                    className="text-grey-100 hover:text-grey-300"
                    size={30}
                  />
                </div>
              </Link>
            )
          )
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 italic">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
