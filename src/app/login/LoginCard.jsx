"use client";

import { supabase } from "../lib/supabase/client";
import { createSupabaseBrowserClient } from "../lib/supabase/client";
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginCard() {
const supabase = createSupabaseBrowserClient(); 
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    // const { error } = await spbase.auth.signInWithPassword({
    //   email,
    //   password,
    //   options: { redirectTo: `${window.location.origin}/auth/callback` },
    // });
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Login error:", error);
    if (!error) {
      console.log("IN login card, before refresh and push");
      //router.refresh();
      router.back()
     // router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#f32a3b] via-red-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue to BlockArt
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <div className="text-right text-sm">
              <Link href="/forgotPassword">
              <span className="text-red-500 cursor-pointer hover:underline">
                Forgot password?
              </span>
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#f32a3b] to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        <Link href="/signup">
          <div className="text-right text-sm mt-2">
            <span className="text-red-500 cursor-pointer hover:underline">
              New user? Sign Up
            </span>
          </div>
        </Link>
        {/* Divider */}
        {/* <div className="my-6 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t"></div>
        </div> */}

        {/* Social Login */}
        {/* <button className="w-full border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition">
          Continue with Google
        </button> */}
      </div>
    </div>
  );
}
