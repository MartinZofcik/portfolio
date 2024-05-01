import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import type { Adapter } from 'next-auth/adapters';
import db from '@/db/db';
import { getUserByEmail } from '@/db/actions/user';

export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async session({ session }) {
      session.user = await getUserByEmail(session.user.email);
      console.log(session);
      return session;
    },
  },
  timezone: 'Europe/Bratislava',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
