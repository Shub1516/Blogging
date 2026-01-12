"use client";

import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";
import { PrimaryIconButton } from "../../lib/Buttons";
import UserDropdown from "./Userdropdown";
import { useEffect,useState } from "react";
//import { supabase } from '../../lib/supabase/client'
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

export default function Navbar() {
  const [isLoggedInState, setIsLoggedInState] = useState(null);
 
useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Navbar - auth state changed:", session?.user);
        setIsLoggedInState(session?.user || null);
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  

  return (
    <nav className="flex items-center gap-4">
      {!isLoggedInState ? (
        <Link href="/login">
          <PrimaryIconButton
            text="Login"
            Icon={() => <IoIosLogIn size={25} />}
          />
        </Link>
      ) : (
        <UserDropdown user={isLoggedInState} />
      )}
    </nav>
  );
}
