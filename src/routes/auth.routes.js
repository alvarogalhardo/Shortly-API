import { Router } from "express";
import { postUrl } from "../controllers/urls.js";
import { authValidation } from "../middlewares/auth.js";
import { validatePostModel } from "../middlewares/modelValidations.js";

const authRouter = Router();

authRouter.use(authValidation);
authRouter.post("/urls/shorten",validatePostModel,postUrl)

export default authRouter;