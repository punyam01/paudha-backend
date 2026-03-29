import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { errorResponse } from "../utils/errorResponse.js";
import { cookieOptions } from "../utils/cookie.utils.js";

// export const checkEmail = asyncHandler(async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         throw new errorResponse(400, "Email is required");
//     }

//     const user = await User.findOne({ email });

//     if (user) {
//         // If an account exists, instruct the client to ask for the password.
//         return res.status(200).json(
//             new apiResponse(
//                 200,
//                 { accountExists: true },
//                 "Account exists. Please proceed to login with your password."
//             )
//         );
//     } else {
//         // If no account exists, instruct the client to redirect to the signup page.
//         return res.status(200).json(
//             new apiResponse(
//                 200,
//                 { accountExists: false, redirectUrl: "/signup" },
//                 "No account found. Please sign up."
//             )
//         );
//     }
// });

export const createUser= asyncHandler(async (req, res) => {
    const { name, email, password ,role} = req.body;

    // Only email and password are required; name is optional.
    if (!email || !password) {
        throw new errorResponse(400, "Email and password are required");
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new errorResponse(400, "User with this email already exists. Please login.");
    }

    // If name is not provided, default to using the email (or leave it as an empty string)
    const userName = name ? name : email;

    // Create a new user. The password will be hashed via the pre-save hook in your model.
    const newUser = await User.create({
        name: userName,
        email,
        password,
        role
        
    });

    // Generate an access token using your model's method
    const accessToken = newUser.generateAccessToken();

    // Retrieve the new user data without sensitive fields (like password)
    const userResponse = await User.findById(newUser._id).select("-password");

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new apiResponse(201, { user: userResponse, token: accessToken }, "User registered successfully"));
});

export const deleteUser = asyncHandler(async(req,res)=>{

});