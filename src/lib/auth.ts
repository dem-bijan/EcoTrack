import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import {User as NextAuthUser} from "next-auth"
import  CredentialsProvider from "next-auth/providers/credentials"
import {db} from "./db"
import Email from "next-auth/providers/email"

export const authOptions : NextAuthOptions = {
    adapter :PrismaAdapter(db),
    secret: process.env.NextAUTH_SECRET,
    session : {
        strategy:'jwt'
    },
    pages : {
        signIn: "./sign-in"
    },
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email: {label:"Email", type:"email", placeholder:"Please Enter your Email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials,req){
                if(!credentials?.email || !credentials?.password) {
                    return null;}
                const ExistingUser = await db.user.findUnique({
                    where : {email:credentials.email},
                });
                if (!ExistingUser) {
                    return null
                }

                const passwordMatch = await compare(credentials.password, ExistingUser. || '');
                if (!passwordMatch) {
                    return null
                }
                return{
                    id: ExistingUser.id.toString(),
                    email : ExistingUser.email || null,
                    Name : ExistingUser.name || null
                } as NextAuthUser

            }
        })
    ],
    callbacks: {
        async jwt({token, user, account}) {
            if(user) {
                token.id = user.id;
                token.name = user.name
            }
            return token
        },
        async session({session,token}) {
            if(token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session
        },
    },
    debug: process.env.NODE_ENV === 'development'
}