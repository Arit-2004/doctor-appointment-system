import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      `\n MONGO DB CONNECTED !! DB NAME: ${connectionInstance.connection.name} | HOST: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("ERROR IN DB CONNECT:", error);
    process.exit(1);
  }
};

export default connectDB;
