import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export const authOptions: NextAuthOptions ={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try {
                    const user=await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier},
                        ]
                    })
                    if(!user){
                        throw new Error("No user found")
                    }

                    if(!user.isVerified){
                        throw new Error("User is not verified")
                    }

                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password);

                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error("Password is incorrect")
                    }

                } catch (error:any) {
                    throw new Error("An error occurred while logging in")
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified=user.isVerified;
                token.isAcceptingMessages=user.isAcceptingMessages;
                token.username=user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id;
                session.user.isVerified=token.isVerified;
                session.user.isAcceptingMessages=token.isAcceptingMessages;
                session.user.username=token.username;
            }
            return session
        },
    },
    pages:{
        signIn:"/sign-in",
    },
    session:{
        strategy:"jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}