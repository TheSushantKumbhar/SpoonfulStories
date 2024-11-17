const mongoose = require("mongoose");
const Comment = require("./Comment");
const Schema = mongoose.Schema;

// https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto/woman-blackdress-stairs.png

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const RecipeSchema = new Schema({
  title: String,
  description: String,
  ingredients: Array,
  steps: Array,
  images: [ImageSchema],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category: {
    type: String,
    enum: [
      "Appetizers",
      "Main Course",
      "Desserts",
      "Snacks",
      "Drinks",
      "Other",
    ],
    required: true,
  },
});

// RecipeSchema.virtual("likeCount").get(function () {
//   return this.likes.length;
// });

// RecipeSchema.virtual("dislikeCount").get(function () {
//   return this.dislikes.length;
// });

// RecipeSchema.set("toJSON", { virtuals: true });
// RecipeSchema.set("toObject", { virtuals: true });

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
