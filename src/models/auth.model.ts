import Joi from 'joi';
import { regex } from '../utils/constants.util';

const register = Joi.object({
  username: Joi.string().pattern(regex.USERNAME).required(),
  email: Joi.string().email().pattern(regex.EMAIL).required(),
  password: Joi.string().min(8).required(),
});

const signIn = Joi.object({
  email: Joi.string().email().pattern(regex.EMAIL).required(),
  password: Joi.string().min(8).required(),
});

export { register, signIn };
