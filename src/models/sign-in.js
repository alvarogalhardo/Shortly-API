import joi from "joi";

const signInModel = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default signInModel;
