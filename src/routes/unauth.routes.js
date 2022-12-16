import { Router } from "express";
import { userExists } from "../middlewares/auth.js";
import { validateSignInModel, validateSignUpModel } from "../middlewares/modelValidations.js";

const unauthRouter = Router();

unauthRouter.post("/signin", validateSignInModel)
unauthRouter.post("/signup",validateSignUpModel,userExists)

export default unauthRouter;