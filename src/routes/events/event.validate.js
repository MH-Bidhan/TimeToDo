const Joi = require("joi");

const eventSchema = Joi.object({
  userId: Joi.string(),
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).max(255).required(),
  timeOfEvent: Joi.date().required(),
  upcoming: Joi.boolean().required().default(true),
  marked: Joi.boolean().required().default(false),
  completed: Joi.boolean().required().default(true),
  archived: Joi.boolean().required().default(false),
  isImportant: Joi.boolean().required().default(false),
});

function validateEvent(event) {
  return eventSchema.validate(event);
}

module.exports = validateEvent;
