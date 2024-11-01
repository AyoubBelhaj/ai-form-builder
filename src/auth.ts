import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db/index";

export const {handlers : {GET, POST}, auth, signIn, signOut} = NextAuth({
    adapter: DrizzleAdapter(db),
    providers:[GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })]
})

