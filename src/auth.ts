import { type Session, type User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db/index";


export const authOptions = {
    
    adapter: DrizzleAdapter(db),
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })],

    callbacks: {
        async session({ session, user }: { session: Session; user?: User }) {
            if (user && session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
}

