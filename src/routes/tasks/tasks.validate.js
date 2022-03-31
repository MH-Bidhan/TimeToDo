const Joi = require("joi");

const tasksSchema = Joi.object({
  userId: Joi.string(),
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).max(255).required(),
  timeOfTask: Joi.date().required(),
  upcoming: Joi.boolean().required().default(true),
  marked: Joi.boolean().required().default(false),
  completed: Joi.boolean().required().default(true),
  archived: Joi.boolean().required().default(false),
  isImportant: Joi.boolean().required().default(false),
});

function validateTask(event) {
  return tasksSchema.validate(event);
}

module.exports = validateTask;
