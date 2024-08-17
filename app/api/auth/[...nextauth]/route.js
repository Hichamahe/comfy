import { connectMongoDB } from "@/backend/lib/mongodb";
import User from "@/backend/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.log("Error when connecting:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token._id = user.id;
      }
      if (account && account.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          let dbUser = await User.findOne({ email });
          if (!dbUser) {
            const res = await fetch("http://localhost:3000/api/userGoogle", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });
            if (res.ok) {
              dbUser = await User.findOne({ email });
            }
          }
          if (dbUser) {
            token._id = dbUser._id.toString();
          }
        } catch (error) {
          console.log(error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token._id) {
        session.user._id = token._id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
