"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { resetPassword } from "./actions/resetPassword";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [email, setEmail] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(event.currentTarget);
    const result = await resetPassword(formData);

    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: result.success });
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-12 bg-gray-50/30">
      <Card className="w-full max-w-105 shadow-2xl shadow-gray-200/50 border-none rounded-[2.5rem] p-4 sm:p-6 bg-white">
        <CardHeader className="flex flex-col items-center gap-4 pt-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 transform -rotate-6 transition-transform hover:rotate-0">
            <KeyRound size={32} />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed px-6">
              Enter your email address and we will send you a link to reset your password.
            </p>
          </div>
        </CardHeader>

        <CardBody className="pt-8 pb-4 px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* INBUILD INPUT DESIGN */}
            <div className="group flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">
                Email Address
              </label>
              
              <div className="relative flex items-center">
                {/* Icon positioned absolutely inside the container */}
                <div className="absolute left-4 text-gray-400 group-focus-within:text-red-500 transition-colors">
                  <Mail size={20} />
                </div>
                
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e)}
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl text-base font-medium text-gray-900 placeholder:text-gray-400 outline-hidden transition-all duration-200 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                />
              </div>
            </div>

            {message.text && (
              <div className={`p-4 rounded-2xl text-sm font-semibold animate-in zoom-in-95 duration-300 ${
                message.type === "success" 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                : "bg-red-50 text-red-700 border border-red-100"
              }`}>
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              className="h-14 w-full bg-red-500 hover:bg-red-600 font-black text-white rounded-2xl shadow-lg shadow-red-500/20 text-lg transition-all active:scale-[0.97]"
              isLoading={loading}
            >
              Send Reset Link
            </Button>

            <div className="flex justify-center pt-2">
              <Link
                href="/login"
                className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Return to Login
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}