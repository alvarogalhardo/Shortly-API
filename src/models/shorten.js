import joi from "joi";

const shortenModel = joi.object({
  url:joi.string().uri().required()
});

export default shortenModel;
  