const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const { validateComment } = require("../middlware");

router.post(
  "/",
  validateComment,
  catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    recipe.comments.push(comment);
    await comment.save();
    await recipe.save();
    req.flash("success", "created new comment!");
    res.redirect(`/recipes/${recipe._id}`);
  })
);

router.delete(
  "/:commentId",
  catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "successfully deleted comment!");
    res.redirect(`/recipes/${id}`);
  })
);

module.exports = router;
