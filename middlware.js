const { recipeSchema, commentSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const Recipe = require("./models/Recipe");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // store the URL they are requesting
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be signed first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.validateRecipe = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe.author.equals(req.user._id)) {
    req.flash("error", "you donot have permission to do that!");
    return res.redirect(`/recipes/${id}`);
  }
  next();
};

module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};
