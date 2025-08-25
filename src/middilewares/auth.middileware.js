import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Access token missing");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-refreshToken -password"
        );

        if (!user) {
            throw new ApiError(401, "Unauthorized request");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Access token expired");
        }
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
