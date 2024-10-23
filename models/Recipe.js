const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: String,
  description: String,
  ingredients: Array,
  steps: Array,
  image: String,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
