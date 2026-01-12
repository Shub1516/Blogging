"use client";
import React, { useState } from "react";
import css from "../../styles/header.module.css";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation"; // Correct import for App Router

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    console.log("query ", query);
    // Trigger if it's a click or if the 'Enter' key is pressed
    if (e.key === "Enter" || e.type === "click") {
      if (!query.trim()) return;

      // Redirect to /search?q=your-query
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-lg sm:max-w-md md:max-w-lg mx-auto">
        <input
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch} // Trigger on Enter
          className="
      w-full h-10 sm:h-11
      rounded-full
      border border-gray-300
      bg-white
      pl-4 pr-12
      text-sm sm:text-base
      placeholder-gray-400
      focus:outline-none
      focus:ring-2 focus:ring-red-400
      focus:border-red-400
      transition
    "
        />

        <IoSearchCircleSharp
          size={36}
          className="
      absolute
      right-2
      top-1/2
      -translate-y-1/2
      text-red-500
      cursor-pointer
      hover:scale-110
      transition
    "
        />
      </div>
    </>
  );
}
