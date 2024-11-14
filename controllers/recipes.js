const Recipe = require("../models/Recipe");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const { category } = req.query;
  if (!category) {
    const recipes = await Recipe.find({});
    res.render("recipes/index", { recipes, category: "All" });
  } else {
    const recipes = await Recipe.find({ category });
    res.render("recipes/index", { recipes, category });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("recipes/new");
};

module.exports.createRecipe = async (req, res, next) => {
  const recipe = new Recipe(req.body.recipe);
  recipe.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  recipe.author = req.user._id;
  recipe.category = "Other"; //REMOVE LATER
  await recipe.save();
  console.log(recipe);
  req.flash("success", "successfully made a new recipe!");
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.showRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  //   console.log("hello world");
  //   console.log(recipe);
  if (!recipe) {
    req.flash("error", "cannot find recipe...");
    return res.redirect("/recipes");
  }
  res.render("recipes/show", { recipe });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    req.flash("error", "cannot find recipe...");
    return res.redirect("/recipes");
  }
  res.render("recipes/edit", { recipe });
};

module.exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
  const images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  recipe.images.push(...images);
  await recipe.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await recipe.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
    console.log(recipe);
  }
  req.flash("success", "successfully updated recipe!");
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndDelete(id);
  req.flash("success", "successfully deleted comment!");
  res.redirect("/recipes");
};

module.exports.likeRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  const dislikeIndex = recipe.likes.indexOf(req.user._id);
  if (!recipe.likes.includes(req.user._id)) {
    recipe.likes.push(req.user._id);
    recipe.dislikes.splice(dislikeIndex, 1);
    await recipe.save();
    req.flash("success", "recipe liked!");
  } else {
    req.flash("error", "recipe already liked");
  }
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.dislikeRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  const likeIndex = recipe.likes.indexOf(req.user._id);
  if (!recipe.dislikes.includes(req.user._id)) {
    recipe.dislikes.push(req.user._id);
    recipe.likes.splice(likeIndex, 1);
    await recipe.save();
    req.flash("success", "recipe disliked!");
  } else {
    req.flash("error", "recipe already disliked");
  }
  res.redirect(`/recipes/${recipe._id}`);
};
