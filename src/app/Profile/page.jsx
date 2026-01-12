import ProfilePage from "../component/ProfileDetails";
import React from 'react'
import {createSupabaseServerClient} from "../lib/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        redirect("/login");
      }
  return (
    <ProfilePage user={user}/>
  )
}
