import { Router } from "express"
import {
     registerUser,
    loginUser,
    logoutUser
} from "../controllers/user.controllers.js"

import { verifyJWT } from "../middilewares/auth.middileware.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured routes

router.route("/logout").post(logoutUser);

export default router;