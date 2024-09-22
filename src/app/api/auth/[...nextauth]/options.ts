import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions={
  providers:[
    //id,name,credentials,authorize method
     CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials:any):Promise<any>{
       await dbConnect();
       //in this method basically apply all the validations and return the user

       //access email and username: .credential.identifier 
       //password have a different method
       try{
       const user = await User.findOne({
        $or:[
          {email:credentials.identifier},
          {username: credentials.identifier}
        ]
       })

       if(!user){
        throw new Error("No user found with this email or username")
       }

       if(!user.isVerified){
        throw new Error("Please verify your email")
       }
       //check password

       const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
      
       if(isPasswordCorrect){
        return user
       }else{
        throw new Error("Incorrect password")
       }
      }catch(err:any){
       throw new Error(err)
      }
      }
     })
  ],
  callbacks:{
    //total 4--> signin redirect jwt session
    //mainly 2 used -->jwt and session
    //add more of the data to token and same for sessions
    async jwt({ token, user}) {
      if(user){
        token._id = user._id?.toString();
        token.isVerified = user.isVerified
        token.isAcceptingMessages = user.isAcceptingMessages
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
     if(token){
      session.user._id = token._id;
      session.user.isVerified = token.isVerified
      session.user.isAcceptingMessages = token.isAcceptingMessages
      session.user.username = token.username
     }
     return session
    },
    //impp*** 
    //in declaration file where the interface is declar3eed 
    //best practice --> Interface with capital letter Session
    // variable name small letter session
   
  },
  //basicallly the pages where u want this to run
  pages:{
    signIn:"/sign-in"
  },
  //databases or jwt
  session:{ 
    strategy:"jwt"
  },
  //the scret tken stored on server side
  secret:process.env.NEXTAUTH_SECRET
  
}