import { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	verifyEmail,
	resendEmailVerification,
	refreshAccessToken,
	forgotPasswordRequest,
	resetForgotPassword
} from "../controllers/auth.controllers.js";

import {validate} from "../middlewares/validator.middleware.js";
import {
	userLoginValidator,
	userRegisterValidator,
	userforgotPasswordValidator,
	userResetForgotPasswordValidator,
	userChangeCurrentPasswordValidator
} from "../validators/index.js";


import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecure routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(),validate,loginUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userforgotPasswordValidator(),validate, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(),validate, resetForgotPassword);


//secure routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
// router.route("/change-password").post(verifyJWT, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword); // Uncomment when changeCurrentPassword is implemented
router.route("/resend-verification-email").post(verifyJWT, resendEmailVerification);
export default router;