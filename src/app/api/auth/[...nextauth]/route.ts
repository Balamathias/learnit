import { oAuthOptions } from "@/lib/nextauth";
import NextAuth from 'next-auth'


const handler = NextAuth(oAuthOptions)

export { handler as POST, handler as GET}