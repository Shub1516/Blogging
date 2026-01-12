// import { createSupabaseServerClient } from '@/lib/supabase/server'
// import { NextResponse } from 'next/server'

// // GET all posts
// export async function GET() {
//   const supabase = await createSupabaseServerClient();
//   const { data, error } = await supabase
//     .from('posts')
//     .select('*')
//     .order('created_at', { ascending: false })

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json(data)
// }

// // CREATE new post
// export async function POST(req) {
//   const body = await req.json()

//   const { data, error } = await supabaseServer
//     .from('posts')
//     .insert([body])
//     .select()
//     .single()

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 })
//   }

//   return NextResponse.json(data, { status: 201 })
// }
