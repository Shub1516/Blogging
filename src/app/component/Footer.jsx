"use client";
import React, { useState } from "react";
import { createSupabaseBrowserClient } from "../lib/supabase/client"; // Use client-side client
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Footer() {
  const [email, setEmail] = useState(null);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("subscribers").insert([{ email }]);

    if (!error) {
      toast.success("Thanks for subscribing!!", {
        description: "You will get updated to recent launched post",
      });
      router.refresh();
    }
    if (error) {
      // Fallback check for Database Unique Constraint (Postgres Error 23505)
      if (error.code === "23505") {
        toast.error("Error", {
          description: "Already Subscribed!",
        });
      } else {
        toast.error("Error", {
          description: "Something went wrong!",
        });
      }
    }
  };

  return (
    <footer className="bg-linear-to-r from-[#f32a3b] via-red-500 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3">BlockArt</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Exploring technology, development, and innovation through
              insightful articles and practical knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Articles</li>
              <li className="hover:text-white cursor-pointer">Categories</li>
              <li className="hover:text-white cursor-pointer">About</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Topics</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>AI & Machine Learning</li>
              <li>Web Development</li>
              <li>Cloud Computing</li>
              <li>DevOps & Security</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Stay Updated</h4>
            <p className="text-sm text-white/80 mb-3">
              Get the latest articles delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-full text-black text-sm focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="bg-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-900 transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/80">
          <p>© {new Date().getFullYear()} BlockArt. All rights reserved.</p>

          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
