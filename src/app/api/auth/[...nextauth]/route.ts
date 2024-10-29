import NextAuth from "next-auth";
import { authOptions } from "@/auth";

export const {handlers : {GET, POST}, auth, signIn, signOut} = NextAuth(authOptions);