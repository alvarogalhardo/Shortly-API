import signInModel from "../models/sign-in.js";
import signUpModel from "../models/sign-up.js";

export function validateSignInModel(req, res, next) {
  const { error } = signInModel.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
  }
  res.locals.user = req.body;
  next();
}

export function validateSignUpModel(req, res, next) {
  const { error } = signUpModel.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.sendStatus(422);
  }
  res.locals.user = req.body;
  next();
}
