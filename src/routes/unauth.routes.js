import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";
import { getUrlById, redirectToUrl } from "../controllers/urls.js";
import { encryptPassword, userExistsSignIn,userExistsSignUp } from "../middlewares/auth.js";
import { validateSignInModel, validateSignUpModel } from "../middlewares/modelValidations.js";
import { addVisit, checkShortUrl } from "../middlewares/url.js";

const unauthRouter = Router();

unauthRouter.post("/signin", validateSignInModel,userExistsSignIn,signIn);
unauthRouter.post("/signup",validateSignUpModel,userExistsSignUp,encryptPassword,signUp);
unauthRouter.get("/urls/:id",getUrlById);
unauthRouter.get("/urls/open/:shortUrl",checkShortUrl,addVisit,redirectToUrl)

export default unauthRouter;