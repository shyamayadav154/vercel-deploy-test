import NextAuth from 'next-auth';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { toast } from 'react-toastify';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const url = process.env.BASE_URL + '/accounts/login/';
        // const url = `http://34.131.95.116:8000/accounts/login/`;

        try {
          var call = await axios.post(url, credentials);
        } catch (error) {
          if (error.response) {
            // response received from server
            console.log('error data', error.response.data);
            return false;
          } else if (error.request) {
            // no response received from server
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        }

        const user = await call.data.user;

        //  If no error and we have user data, return it
        if (call.status === 200 && user) {
          console.log(user);
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  events: {
    signOut: ({ token, session }) => {
      (token = null), (session = null);
    },
  },
  theme: {
    colorScheme: 'light', // "auto" | "dark" | "light"
    brandColor: '#7c3aed', // Hex color code
    logo: 'https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg', // Absolute URL to image
  },
});
