import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number
}

const connection: ConnectionObject = {};


async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to DB");
        return;
    }

    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || "",{});

        connection.isConnected=db.connections[0].readyState
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB",error);
        

        throw new Error("Failed to connect to database");
    }
}

export default dbConnect;