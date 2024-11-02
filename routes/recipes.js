const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Recipe = require("../models/Recipe");
const { recipeSchema } = require("../schemas");
const { isLoggedIn } = require("../middlware");

const validateRecipe = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

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
    await recipe.save();
    req.flash("success", "successfully made a new recipe!");
    res.redirect(`/recipes/${recipe._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate("comments");
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
  catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
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
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    req.flash("success", "successfully deleted comment!");
    res.redirect("/recipes");
  })
);

module.exports = router;
