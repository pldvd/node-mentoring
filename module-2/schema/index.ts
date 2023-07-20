import Joi from 'joi';
import { PermissionEnum } from '../types';

export const userSchema = Joi.object({
  id: Joi.string(),
  login: Joi.string().required(),
  password: Joi.string()
    .alphanum()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/))
    .required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.bool(),
});

export const filterIngSchema = Joi.object({
  loginSubstring: Joi.string(),
  limit: Joi.number(),
});

export const groupSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  permissions: Joi.array()
    .items(Joi.string().valid(...Object.values(PermissionEnum)))
    .required(),
});
