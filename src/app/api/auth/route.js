// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import User from '@/lib/models/User'
// import { connectDB } from '@/lib/db'
// import { NextResponse } from 'next/server'

// export async function POST(req) {
//   await connectDB()
//   const { email, password } = await req.json()

//   const user = await User.findOne({ email })
//   if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 })

//   const match = await bcrypt.compare(password, user.password)
//   if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
//   return NextResponse.json({ token })
// }
