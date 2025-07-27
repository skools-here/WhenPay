import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import { AuthOptions } from "next-auth";

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        await resend.emails.send({
          from: "noreply@yourdomain.com",
          to: identifier,
          subject: "Login to Payment Reminder",
          html: `<p>Click to login: <a href="${url}">Login</a></p>`,
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler=NextAuth(authOptions)
