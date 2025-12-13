import { Router } from "express"
import {
     registerUser,
    loginUser,
    logoutUser,
    userChangepassword,
    updateUserDetails,
    getCurrentUser,
    getAllDoctors
} from "../controllers/user.controllers.js"

import { verifyJWT } from "../middilewares/auth.middileware.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured routes

router.route("/logout").post(verifyJWT , logoutUser);
router.route("/changepassword").post(verifyJWT , userChangepassword);
router.route("/update-details").patch(verifyJWT , updateUserDetails);
router.route("/get-currentuser").get(verifyJWT , getCurrentUser);
router.route("/doctors/all").get(getAllDoctors);

export default router;