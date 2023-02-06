const Joi = require('joi');

const register = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().allow('').required(),
});

const login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const forgotPassword = Joi.object().keys({
  email: Joi.string().required(),
});

const changePassword = Joi.object().keys({
  old_password: Joi.string().required(),
  new_password: Joi.string().required(),
});

const defaultSchema = Joi.object().keys({
  name: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  confirm_password: Joi.string(),
  role: Joi.string(),
  avatar_image: Joi.string(),
  cart: Joi.array(),
});

module.exports = {
  login,
  register,
  forgotPassword,
  changePassword,
  defaultSchema,
};
