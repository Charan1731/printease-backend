import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

if(!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const connectToDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to DB");

    } catch (error) {
        console.log("Error connecting to DB", error);
        process.exit(1);
    }
}

export default connectToDB;