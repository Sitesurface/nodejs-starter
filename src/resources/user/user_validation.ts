import Joi from 'joi';

const createUser = Joi.object({
  firstName: Joi.string().required().max(30).min(1),
  lastName: Joi.string().required().max(30).min(1),
  profilePic: Joi.string().required().uri(),
  fcmToken: Joi.string().required(),
});

const updateUser = Joi.object({
  firstName: Joi.string().max(30).min(1),
  lastName: Joi.string().max(30).min(1),
  profilePic: Joi.string().uri(),
  fcmToken: Joi.string(),
});

export default {
  createUser,
  updateUser,
};
