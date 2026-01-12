"use client";
import React from "react";
import Container from "../Container";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaUser } from "react-icons/fa";


export default function LatestArticle({ posts }) {
  return (
    <Container className="my-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">
          Latest Articles
        </h2>

        {/* 1. Ensure grid-cols use the '1fr' (fractional) unit correctly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/postDetail/${post.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  {/* Banner Image Container */}
                  <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                    <Image
                      src={post.banner_image || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col grow">
                    {/* Categories */}
                    
 {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                      {post.title}
                    </h2>

                    {/* Meta Info */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FaCalendarAlt className="text-red-400" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FaUser className="text-red-400" />
                        <span className="truncate max-w-20">
                          {post.profiles?.fullname || "Author"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">
                No articles found matching
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
