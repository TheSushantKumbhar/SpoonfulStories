const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
const comments = require("../controllers/comments");

const {
  validateComment,
  isLoggedIn,
  isCommentAuthor,
} = require("../middlware");

router.post(
  "/",
  isLoggedIn,
  validateComment,
  catchAsync(comments.createComment)
);

router.delete(
  "/:commentId",
  isLoggedIn,
  isCommentAuthor,
  catchAsync(comments.deleteComment)
);

module.exports = router;
