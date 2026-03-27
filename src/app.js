
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/errorHandler.middleware.js"



const app = express();


app.use(
    cors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


//Routes import  --------------------------------------------------------------------
// import userRoutes from "./routes/user.route.js"
// import authRoutes from './routes/auth.route.js';
// import cartRoutes from "./routes/cart.route.js"
// import wishListRoute from "./routes/wishList.route.js"
// import orderProcessing from "./routes/order.route.js"
// import addressRoute from "./routes/address.route.js"


// app.use("/api/v1/user", userRoutes)
// app.use("/api/v1/auth", authRoutes)
// app.use("/api/v1/cart", cartRoutes)
// app.use("/api/v1/wishlist", wishListRoute)
// app.use("/api/v1/order", orderProcessing )
// app.use("/api/v1/address", addressRoute)



app.use(errorHandler);

export default app;