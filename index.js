
import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { dbConnect } from "./src/db/dbConnector.js";

const PORT = process.env.PORT || 8000;



dbConnect()
  .then(() => {
    app.on("error", () => {
      console.log("ERROR: ", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
