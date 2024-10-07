import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { User } from "next-auth";

export async function DELETE(request:Request, {params}:{params:{messageid:string}}){
    await dbConnect();
    
    const messageid = params.messageid

    const session=await getServerSession(authOptions)

    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not Authenticated",
        },{status: 401})
    }

    try {
        const updateResult=await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages: {_id: messageid}}}
        )

        if(updateResult.modifiedCount == 0){
            return Response.json({
                success: false,
                message: "Message Not Found or Already Deleted",
            },{status: 404})
        }

        return Response.json({
            success: true,
            message: "Message Deleted Succesfully",
        },{status: 200})
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error Deleting Message",
        },{status: 500})
    }
}