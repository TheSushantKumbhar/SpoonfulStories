const mongoose = require("mongoose");
const Comment = require("./Comment");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: String,
  description: String,
  ingredients: Array,
  steps: Array,
  image: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

RecipeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
