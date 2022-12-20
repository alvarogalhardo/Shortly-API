import { Router } from "express";
import { signUp } from "../controllers/auth.js";
import { encryptPassword, userExistsSignIn,userExistsSignUp } from "../middlewares/auth.js";
import { validateSignInModel, validateSignUpModel } from "../middlewares/modelValidations.js";

const unauthRouter = Router();

unauthRouter.post("/signin", validateSignInModel,userExistsSignIn);
unauthRouter.post("/signup",validateSignUpModel,userExistsSignUp,encryptPassword,signUp);

export default unauthRouter;