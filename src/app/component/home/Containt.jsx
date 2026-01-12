"use client";
import React from "react";
import css from "../../styles/heroSection.module.css";
import { ImBlogger } from "react-icons/im";

export default function Containt() {
  return (
    <div className="w-full min-h-screen bg-linear-to-r from-[#f32a3b] via-red-500 to-pink-500 flex items-center justify-center px-4">
  <div className="flex flex-col items-center justify-center gap-4 text-center max-w-3xl">

    <ImBlogger className="text-white text-3xl sm:text-4xl md:text-5xl" />

    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
      Welcome to BlockArt
    </h3>

    <h4 className="text-white text-base sm:text-lg md:text-2xl leading-relaxed">
      Explore the latest insights in technology, development, and innovation
    </h4>

    <div className="flex flex-wrap justify-center gap-3 mt-4">
      <button className="bg-gray-200 text-red-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition">
        AI & Machine Learning
      </button>

      <button className="bg-gray-200 text-red-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition">
        Web Development
      </button>

      <button className="bg-gray-200 text-red-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition">
        Cloud Computing
      </button>

      <button className="bg-gray-200 text-red-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition">
        DevOps
      </button>

      <button className="bg-gray-200 text-red-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition">
        Cybersecurity
      </button>
    </div>

  </div>
</div>

  );
}
