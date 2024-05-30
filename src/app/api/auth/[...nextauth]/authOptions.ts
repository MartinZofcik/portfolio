import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
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
    // @ts-expect-error session not typed MFcker
    jwt({ token, account, user }) {
      if (account) {
        // token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    // @ts-expect-error session not typed MFcker
    session({ session, token }) {
      // session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
};
