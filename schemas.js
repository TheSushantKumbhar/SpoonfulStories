const Joi = require("joi");

module.exports.recipeSchema = Joi.object({
  recipe: Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    ingredients: Joi.array().required(),
    steps: Joi.array().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().required(),
  }).required(),
});
