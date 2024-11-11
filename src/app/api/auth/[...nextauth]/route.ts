import {authOptions} from '@/auth'
import NextAuth from 'next-auth'

export const {handlers: {POST,GET},signIn,signOut, auth} = NextAuth(authOptions);