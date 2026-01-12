"use client";

import { FaUserAlt } from "react-icons/fa";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { TfiWrite } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import Link from "next/link";
//import { supabase } from '../../lib/supabase/client'
import { createSupabaseBrowserClient } from "../../lib/supabase/client";
import { FaFileSignature } from "react-icons/fa";

import { useRouter } from "next/navigation";

export default function UserPopover({ user }) {
  const supabase = createSupabaseBrowserClient();
  const route = useRouter();
  return (
    <Popover placement="bottom-end" showArrow>
      <PopoverTrigger>
        <div className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 cursor-pointer transition">
          <FaUserAlt className="text-lg sm:text-xl text-[#fb0519]" />
          <span className="hidden sm:block text-sm sm:text-base font-medium truncate max-w-30">
            {user.user_metadata.full_name}
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <div className="w-56 sm:w-64 bg-white rounded-xl shadow-lg p-3 flex flex-col gap-1">
          <Link href="/ProfileDetail">
            <MenuItem icon={<CgProfile />} label="Profile" />
          </Link>
          <Link href={"/writePost"}>
            <MenuItem icon={<TfiWrite />} label="Write" />
          </Link>
          <Link href={"/myPosts"}>
            <MenuItem icon={<FaFileSignature />} label="My Blogs" />
          </Link>
          {/* <MenuItem icon={<IoMdSettings />} label="Settings" /> */}

          <div className="my-1 border-t" />
          <div
            onClick={async () => {
              await supabase.auth.signOut();
              route.push("/");
            }}
          >
            <MenuItem icon={<TbLogout2 />} label="Logout" danger />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* Reusable menu item */
function MenuItem({ icon, label, danger }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm sm:text-base
        cursor-pointer transition
        ${
          danger
            ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
            : "hover:bg-gray-100"
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
