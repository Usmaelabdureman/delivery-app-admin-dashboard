// import NextAuth, {getServerSession} from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
// import clientPromise from "@/lib/mongodb";

// const adminEmails = ['uabdureman@gmail.com','gaaddisotoo@gmail.com','felmetamuktar23@gmail.com','felmeta.muktar@aait.edu.et','aman.getnet2@gmail.com','dagimfikru@gmail.com'];

// export const authOptions = {
//   secret: process.env.SECRET,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   callbacks: {
//     session: ({session,token,user}) => {
//       if (adminEmails.includes(session?.user?.email)) {
//         return session;
//       } else {
//         return false;
//       }
//     },
//   },
// };

// export default NextAuth(authOptions);



// import NextAuth from 'next-auth';
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { compare } from 'bcryptjs';
// import { mongooseConnect } from '@/lib/mongoose';
// import Users from '@/models/User';

// export default NextAuth({
//     providers : [
//         // Google Provider
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET
//         }),
//         GithubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET
//         }),
//         CredentialsProvider({
//             name : "Credentials",
//             async authorize(credentials, req){
//               mongooseConnect().catch(error => { error: "Connection Failed...!"})

//                 // check user existance
//                 const result = await Users.findOne( { email : credentials.email})
//                 if(!result){
//                     throw new Error("No user Found with Email Please Sign Up...!")
//                 }

//                 // compare()
//                 const checkPassword = await compare(credentials.password, result.password);
                
//                 // incorrect password
//                 if(!checkPassword || result.email !== credentials.email){
//                     throw new Error("Username or Password doesn't match");
//                 }

//                 return result;

//             }
//         }),
       
//     ],
//     secret: process.env.SECRET,
//     session: {
//         strategy: 'jwt',
//     }
// })
import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';
import Users from '@/models/User';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['uabdureman@gmail.com', 'gaaddisotoo@gmail.com', 'felmetamuktar23@gmail.com', 'felmeta.muktar@aait.edu.et', 'aman.getnet2@gmail.com', 'dagimfikru@gmail.com'];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await mongooseConnect().catch(error => { error: "Connection Failed...!" });

        // Check user existence
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user found with this email. Please sign up.");
        }

        // Compare passwords
        const checkPassword = await compare(credentials.password, result.password);

        // Incorrect password or email
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or password doesn't match.");
        }

        // Admin authorization check
        if (!adminEmails.includes(result.email)) {
          throw new Error("You are not authorized as an admin.");
        }

        return result;
      }
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);


export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.send('You are not authorized as an admin');
    return;
  }
  // Continue with the authorized admin logic
}

