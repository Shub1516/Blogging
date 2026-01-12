"use server";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export async function resetPassword(formData) {
  const supabase = await createSupabaseServerClient();
  const email = formData.get("email");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Check your email for the reset link!" };
}