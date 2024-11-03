const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Recipe = require("../models/Recipe");
const { isLoggedIn, isAuthor, validateRecipe } = require("../middlware");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const recipes = await Recipe.find({});
    res.render("recipes/index", { recipes });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("recipes/new");
});

router.post(
  "/",
  isLoggedIn,
  validateRecipe,
  catchAsync(async (req, res, next) => {
    const recipe = new Recipe(req.body.recipe);
    recipe.author = req.user._id;
    await recipe.save();
    req.flash("success", "successfully made a new recipe!");
    res.redirect(`/recipes/${recipe._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    console.log(recipe);
    if (!recipe) {
      req.flash("error", "cannot find recipe...");
      return res.redirect("/recipes");
    }
    res.render("recipes/show", { recipe });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      req.flash("error", "cannot find recipe...");
      return res.redirect("/recipes");
    }
    res.render("recipes/edit", { recipe });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateRecipe,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    req.flash("success", "successfully updated recipe!");
    res.redirect(`/recipes/${recipe._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    req.flash("success", "successfully deleted comment!");
    res.redirect("/recipes");
  })
);

module.exports = router;
