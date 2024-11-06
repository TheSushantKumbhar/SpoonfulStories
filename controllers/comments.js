const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");

module.exports.createComment = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const comment = new Comment(req.body.comment);
  comment.author = req.user._id;
  recipe.comments.push(comment);
  await comment.save();
  await recipe.save();
  req.flash("success", "created new comment!");
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.deleteComment = async (req, res) => {
  const { id, commentId } = req.params;
  await Recipe.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  req.flash("success", "successfully deleted comment!");
  res.redirect(`/recipes/${id}`);
};
