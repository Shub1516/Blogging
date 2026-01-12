"use client";
import { createSupabaseBrowserClient } from "../lib/supabase/client"; // Use client-side client

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from 'next/link';

export default function SignupCard() {
const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const router = useRouter()
  const supabase = createSupabaseBrowserClient();

  async function handleSignup(e) {
    e.preventDefault()
    console.log("Signing up with:", email, password);
    console.log('supabase', supabase);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
    data: {
      full_name: fullName, // You can call this 'name', 'full_name', etc.
      display_name: fullName,
    },
  },
    })
    if(error){
        console.log("Signup error:", error.message);
      // router.push('/Login')
    }
    if (!error) router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f32a3b] via-red-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join BlockArt and start exploring
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              onChange={e => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              onChange={e=> setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              onChange={e=> setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f32a3b] to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Social Signup */}
        <button className="w-full border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition">
          Continue with Google
        </button>
        <Link href="/login">
        <button className="w-full border bg-amber-500 mt-1 border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition">
          Already a Member?
        </button>
        </Link>
      </div>
    </div>
  );
}
