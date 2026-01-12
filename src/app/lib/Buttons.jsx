"use client";
import React from "react";

const PrimaryIconButton = ({
  text,
  Icon,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-md bg-[#fb0519] text-white font-medium
                 hover:bg-[#e03947]  transition disabled:opacity-50 disabled:cursor-not-allowed` }
    >
      <Icon size={20} />
      <span>{text}</span>
    </button>
  );
};

const SecondaryIconButton = ({
  text,
  Icon,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium
                 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon size={20} />
      <span>{text}</span>
    </button>
  );
};

export { PrimaryIconButton, SecondaryIconButton };
