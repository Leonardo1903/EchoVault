import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated",
            },
            { status: 401 }
        );
    }

    const email = session.user.email;
    if (!email) {
        return Response.json(
            {
                success: false,
                message: "No email present in session",
            },
            { status: 400 }
        );
    }

    try {
        const user = await UserModel.findOne({ email }).select("messages").lean();

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const messages = (user.messages || []).slice().sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        return Response.json(
            {
                success: true,
                messages,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error getting messages", error);
        return Response.json(
            {
                success: false,
                message: "Error getting messages",
            },
            { status: 500 }
        );
    }
}