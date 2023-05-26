import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.string(),
  login: Joi.string().required(),
  password: Joi.string()
    .alphanum()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/)),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.bool(),
});

export const filterIngSchema = Joi.object({
  loginSubstring: Joi.string(),
  limit: Joi.number(),
});
