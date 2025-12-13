import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// 🔑 Create Access + Refresh Tokens
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

// 🔹 Register User
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, role, password, doctorId } = req.body;

  if (!username || !fullname || !email || !role || !password) {
    throw new ApiError(409, "All credentials are required");
  }

  if (role === "doctor" && !doctorId) {
    throw new ApiError(400, "Doctor ID is required for doctors");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(400, "User with email or username already exists");
  }

  const newuser = await User.create({
    username: username.toLowerCase(),
    email,
    fullname,
    password,
    role,
    doctorId: role === "doctor" ? doctorId : null,
  });

  const createdUser = await User.findById(newuser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

// 🔹 Login User
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password, doctorId } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(403, "Credentials are required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if (user.role === "doctor" && !doctorId) {
    throw new ApiError(400, "Doctor ID is required for doctors to log in");
  }

  if (user.role === "doctor" && user.doctorId !== doctorId) {
    throw new ApiError(401, "Invalid Doctor ID");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Wrong password");
  }

  const { accessToken, refreshToken } =
    await createAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

// 🔹 Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// 🔹 Change Password
const userChangepassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(403, "Invalid password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// 🔹 Update User Details
const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  if (!fullname || !email) {
    throw new ApiError(403, "Fullname and email required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser && existedUser._id.toString() !== req.user?._id.toString()) {
    throw new ApiError(400, "Email is already in use by another account");
  }

  const updateUser = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { fullname, email } },
    { new: true, runValidators: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, "User details updated successfully"));
});

// 🔹 Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

// 🔹 Get All Doctors
const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: "doctor" });

  if (!doctors || doctors.length === 0) {
    throw new ApiError(404, "No doctors found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  userChangepassword,
  updateUserDetails,
  getCurrentUser,
  getAllDoctors,
};
