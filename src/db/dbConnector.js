import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}`,
      
    );
    console.log("databse connected");
    console.log(` Database Name: ${connectionInstance.connection.name}`)
    
  } catch (error) {
    console.log(`DATABASE CONNECTION FAILED!!:`, error);
  }
};
