import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";
import { encryptPassword, userExistsSignIn,userExistsSignUp } from "../middlewares/auth.js";
import { validateSignInModel, validateSignUpModel } from "../middlewares/modelValidations.js";

const unauthRouter = Router();

unauthRouter.post("/signin", validateSignInModel,userExistsSignIn,signIn);
unauthRouter.post("/signup",validateSignUpModel,userExistsSignUp,encryptPassword,signUp);

export default unauthRouter;