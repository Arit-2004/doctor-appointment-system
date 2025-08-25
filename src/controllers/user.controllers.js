import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const createAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found while creating tokens");
    }

    // Generate tokens using instance methods
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refreshToken in DB (without triggering validations again)
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Error in createAccessTokenAndRefreshToken:", error);
    throw new ApiError(
      500,
      error?.message || "Something went wrong while creating tokens"
    );
  }
};


const registerUser = asyncHandler(async (req , res)=>{
    const {username , fullname , email , role , password} = req.body;
    if(!username || !fullname || !email || !role || !password){
        throw new ApiError(409 , "Credentails are required");
    }

    const existedUser = await User.findOne({
        $or : [{email} , {username}]
    })

    if(existedUser){
        throw new ApiError(400 , "User with email and username already exists");
    }

    const newuser = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        password,
        role
    })

    const createdUser = await User.findById(newuser._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(400 , "User is not created");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200 , 
            createdUser,
            "User created Sucessfully"
        )
    )
}
)

const loginUser = asyncHandler(async(req , res)=>{
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        throw new ApiError(403 , "Credentials are required");
    }

    const user = await User.findOne({
        $or : [{email} , {username}]
    })

    if(!user){
        throw new ApiError(404 , "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400 , "Wrong Password");
    }

    const {accessToken , refreshToken} = await createAccessTokenAndRefreshToken(
        user._id
    )

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken" , options , accessToken)
    .cookie("refreshToken" , options, refreshToken)
    .json(
        new ApiResponse(
            200 ,
            loggedInUser,
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req , res)=>{
  await User.findByIdAndUpdate(
    req.user._id,{
      $unset : {
        refreshToken : 1, 
      }
    },{
      new : true
    }
  )
 const options = {
    httpOnly: true,
    secure: true,
  };

return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged out successfully"));

})






export {
    registerUser,
    loginUser,
    logoutUser
}
