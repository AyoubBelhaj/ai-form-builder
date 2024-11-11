import NextAuth from 'next-auth';
import { authOptions } from '@/auth'; 

const {handlers, auth, signIn, signOut} = NextAuth(authOptions);

export { handlers as GET, handlers as POST, auth, signIn, signOut };
