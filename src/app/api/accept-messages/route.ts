import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { User } from "next-auth";
// getServerSession thru this we can get session phir user and his propertes like _id. It needs authOptions

export async function POST(request: Request) {
    await dbConnect();

    const session=await getServerSession(authOptions)

    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not Authenticated",
        },{status: 401})
    }

    const userId=user._id
    const {acceptMessages}=await request.json();

    try {
        const updatedUser=await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages},
            {new: true}
        )

        if(!updatedUser){
            return Response.json({
                success: false,
                message: "User not found",
            },{status: 401})
        }

        return Response.json({
            success: true,
            message: "Messages acceptance status updated successfully",
            updatedUser
        },{status: 200})
    } catch (error) {
        console.error("Error accepting messages", error)
        return Response.json({
            success: false,
            message: "Error accepting messages",
        },{status: 500})
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session=await getServerSession(authOptions)

    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not Authenticated",
        },{status: 401})
    }

    const userId=user._id

    try {
        const foundUser= await UserModel.findById(userId);
        
        if(!foundUser){
            return Response.json({
                success: false,
                message: "User not found",
            },{status: 404})
        }
    
        return Response.json({
            success: true,
            message: "User found",
            isAcceptingMessages: foundUser.isAcceptingMessages},
            {status: 200})
    } catch (error) {
        console.error("Error getting messages acceptance status", error)
        return Response.json({
            success: false,
            message: "Error getting messages acceptance status",
        },{status: 500})
    }

}