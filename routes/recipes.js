const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Recipe = require("../models/Recipe");
const { isLoggedIn, isAuthor, validateRecipe } = require("../middlware");
const recipes = require("../controllers/recipes");

router
  .route("/")
  .get(catchAsync(recipes.index))
  .post(isLoggedIn, validateRecipe, catchAsync(recipes.createRecipe));

router.get("/new", isLoggedIn, recipes.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(recipes.showRecipe))
  .put(isLoggedIn, isAuthor, validateRecipe, catchAsync(recipes.updateRecipe))
  .delete(isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(recipes.renderEditForm)
);

router.get("/:id/like", isLoggedIn, recipes.likeRecipe);
router.get("/:id/dislike", isLoggedIn, recipes.dislikeRecipe);

module.exports = router;
