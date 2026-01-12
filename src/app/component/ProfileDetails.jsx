"use client";

import { useState } from "react";
import { FaUserAlt, FaEnvelope, FaEdit, FaSave } from "react-icons/fa";

export default function ProfilePage({user}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-linear-to-r from-[#f32a3b] to-pink-500
                            flex items-center justify-center text-white text-2xl sm:text-3xl font-bold"
            >
              S
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{user.user_metadata.full_name}</h1>
              <p className="text-gray-500 text-sm sm:text-base">
                
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={true}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-not-allowed
                       border border-gray-300 text-sm sm:text-base hover:bg-gray-100 transition"
          >
            {isEditing ? <FaSave /> : <FaEdit />}
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <ProfileField
            label="Full Name"
            value={user.user_metadata.full_name}
            icon={<FaUserAlt />}
            isEditing={isEditing}
          />

          {/* Email */}
          <ProfileField
            label="Email Address"
            value={user.email}
            icon={<FaEnvelope />}
            isEditing={false}
          />

          {/* Bio */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Bio</label>
            {isEditing ? (
              <textarea
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder="Tell us about yourself"
              />
            ) : (
              <p className="text-gray-700 bg-gray-100 rounded-lg p-4">
                Passionate developer who loves building scalable web apps.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable field */
function ProfileField({ label, value, icon, isEditing }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          type="text"
          disabled={!isEditing}
          defaultValue={value}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm sm:text-base
            ${
              isEditing
                ? "border-gray-300 focus:ring-2 focus:ring-red-400"
                : "border-gray-200 bg-gray-100"
            }`}
        />
      </div>
    </div>
  );
}
