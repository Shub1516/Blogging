"use client";
import React from "react";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Button } from "@heroui/react";

export default function FeaturedArticles({ posts }) {
  return (
    <Container className="my-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Featured <span className="text-red-500">Articles</span>
        </h2>
        {/* <Link href="/blog" className="text-sm font-semibold text-red-500 hover:text-red-600 transition">
          View all →
        </Link> */}
      </div>

      <div className="space-y-8">
        {posts?.map((post) => {
          // Parse categories per post inside the loop
          const categories = typeof post.category === "string" 
            ? JSON.parse(post.category) 
            : post.category || [];

          return (
            <div
              key={post.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 bg-white p-4 rounded-3xl border border-gray-100 hover:border-red-100 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500"
            >
              {/* Article Image - Using md:col-span-5 for a wider image look */}
              <div className="md:col-span-5 relative overflow-hidden rounded-2xl aspect-[16/10]">
                <Image
                  src={post.banner_image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Article Content - Using md:col-span-7 */}
              <div className="md:col-span-7 flex flex-col justify-center py-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.slice(0, 2).map((cat, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <Link href={`/postDetail/${post.id}`}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-red-500 transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-500 mt-4 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {/* If you have a description use it here, otherwise this is the subtitle area */}
                  {post.subtitle || "Discover the latest insights and deep dives into technology trends shaping our world today."}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-gray-50 pt-6">
                  <div className="flex items-center text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <FaUserEdit size={14} className="text-red-500" />
                    </div>
                    <span className="text-sm font-medium">
                      {post.profiles?.fullname || "Author"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <SlCalender size={14} className="mr-2" />
                    <span className="text-sm">
                      {new Date(post.lastmodified_at || post.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    as={Link}
                    href={`/postDetail/${post.id}`}
                    className="bg-red-500 hover:bg-grey-900 text-white font-bold rounded-xl px-8 h-12 transition-all shadow-lg shadow-gray-200 hover:shadow-grey-500/20 p-3"
                  >
                    Read Article
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}