import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controllers.js" ;

import {validate} from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator} from "../validators/index.js";


import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(),validate,loginUser);

//secured route

router.route("/logout").post(verifyJWT, logoutUser);

export default router;