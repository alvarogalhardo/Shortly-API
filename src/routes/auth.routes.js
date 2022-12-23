import { Router } from "express";
import { deleteUrl, getUser, postUrl } from "../controllers/urls.js";
import { authValidation } from "../middlewares/auth.js";
import { validatePostModel } from "../middlewares/modelValidations.js";
import { verifyDelete } from "../middlewares/url.js";

const authRouter = Router();

authRouter.use(authValidation);
authRouter.post("/urls/shorten", validatePostModel, postUrl);
authRouter.delete("/urls/:id", verifyDelete, deleteUrl);
authRouter.get("/users/me", getUser);

export default authRouter;
