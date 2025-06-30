import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Crear o actualizar usuario en nuestro backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api/V1'}/users/find-or-create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              picture: user.image,
              googleId: account.providerAccountId,
            }),
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('User data from backend:', userData);
            user.id = userData._id;
            console.log('Set user.id to:', user.id);
            return true;
          } else {
            console.error('Backend response not ok:', response.status, await response.text());
          }
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };