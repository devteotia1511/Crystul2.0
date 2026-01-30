// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getOptionalEnvVar } from "@/lib/env-validation";
// import dbConnect from "@/lib/mongodb";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// Keep 'export' here for authOptions
export const authOptions: NextAuthOptions = { // 'authOptions' is now exported again
  providers: [
    ...(getOptionalEnvVar("GOOGLE_CLIENT_ID", "") && getOptionalEnvVar("GOOGLE_CLIENT_SECRET", "") ? [
      GoogleProvider({
        clientId: getOptionalEnvVar("GOOGLE_CLIENT_ID", ""),
        clientSecret: getOptionalEnvVar("GOOGLE_CLIENT_SECRET", ""),
      })
    ] : []),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For now, allow demo login without database to isolate the issue
        console.log('Demo login attempt:', credentials.email);
        return {
          id: 'demo-user',
          email: credentials.email,
          name: 'Demo User',
          image: null
        };

        // Original database code (commented out for testing)
        /*
        try {
          const dbConnection = await dbConnect();
          
          // If no database connection (development with placeholder), allow demo login
          if (!dbConnection) {
            console.warn('⚠️  No database connection in development, allowing demo login');
            // For development, allow any email/password combination
            return {
              id: 'demo-user',
              email: credentials.email,
              name: 'Demo User',
              image: null
            };
          }
          
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.avatar
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
        */
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Sign in attempt:', { provider: account?.provider, email: user.email });
      
      // Simplified Google sign-in without database for testing
      if (account?.provider === 'google') {
        console.log('Google sign-in successful for:', user.email);
        return true;
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};

const handler = NextAuth(authOptions);

// Export GET and POST for the route handler
export { handler as GET, handler as POST };

// No need to explicitly export authOptions again if it's already declared with 'export const'