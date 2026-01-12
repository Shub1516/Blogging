"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@heroui/react";
import { Send, ChevronDown } from "lucide-react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import defaultImage from "../../../public/placeholder-image.png";
import Container from "./Container";

export default function PostCard({ post, query }) {
    const POSTS_PER_PAGE = 2;
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

    const paginatedPosts = post?.slice(0, visibleCount) || [];
    const hasMore = post?.length > visibleCount;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + POSTS_PER_PAGE);
    };

    // Handle stringified category safely
    const categories =
        typeof post.category === "string"
            ? JSON.parse(post.category)
            : post.category || [];

    return (
        <>
            <div className="max-w-7xl mx-auto py-10 p-4">
                <h1 className="text-2xl font-bold mb-6">
                    {/* FIX: Ensure you are rendering queryText (a string), not searchParams (an object) */}
                    Search results for:{" "}
                    <span className="text-red-500">{query}</span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPosts.length > 0 ? (
                        paginatedPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/postDetail/${post.id}`}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                    {/* Banner Image Container */}
                                    <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                                        <Image
                                            src={
                                                post.banner_image ||
                                                defaultImage
                                            }
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5 flex flex-col grow">
                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {categories
                                                .slice(0, 2)
                                                .map((cat, index) => (
                                                    <Chip
                                                        key={index}
                                                        size="sm"
                                                        classNames={{
                                                            base: "bg-red-50 border-red-100",
                                                            content:
                                                                "text-red-600 font-bold text-[10px] uppercase",
                                                        }}
                                                        variant="bordered"
                                                    >
                                                        {cat}
                                                    </Chip>
                                                ))}
                                            {categories.length > 2 && (
                                                <span className="text-[10px] text-gray-400 mt-1">
                                                    +{categories.length - 2}{" "}
                                                    more
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                                            {post.title}
                                        </h2>

                                        {/* Meta Info */}
                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                <FaCalendarAlt className="text-red-400" />
                                                <span>
                                                    {new Date(
                                                        post.created_at
                                                    ).toLocaleDateString(
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
                                                    {post.profiles?.email?.split(
                                                        "@"
                                                    )[0] || "Author"}
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
                                No articles found matching {queryText}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {hasMore && (
                <div className="flex justify-end w-full m-5">
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 bg-white/10 backdrop-blur-md border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-red-400 hover:text-red-500 transition-all duration-300 cursor-pointer"
                    >
                        Load More
                    </button>
                </div>
            )}
        </>
    );
}
