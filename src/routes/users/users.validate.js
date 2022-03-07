const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().min(6).max(255).required(),
  password: Joi.string().min(8).max(4096),
  isGold: Joi.boolean().required().default(false),
  remainingQuota: Joi.number().min(0).max(100),
  createdAt: Joi.date().required(),
  resetQuotaTime: Joi.date().required(),
});

function validateUser(user) {
  return userSchema.validate(user);
}

module.exports = validateUser;
