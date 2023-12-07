import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, DefaultSession, getServerSession } from "next-auth";
import { prisma } from "./db";
import GoogleProvider from 'next-auth/providers/google'


declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
    } 
}


export const oAuthOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token }) => {
            const user = await prisma.user.findFirst({
                where: {
                    email: token?.email as string
                }
            })
            if (user) {
                token.id = user.id as unknown as string;
            }
            return token;
        },

        
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET
}

export const getUserSession =  () => getServerSession(oAuthOptions)

