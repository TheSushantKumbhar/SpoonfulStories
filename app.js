const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const Comment = require("./models/Comment");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { recipeSchema, commentSchema } = require("./schemas");

const port = 8008;

mongoose.connect("mongodb://127.0.0.1:27017/SpoonfulStories");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

const app = express();
app.use(express.static("public"));
app.set("public", path.join(__dirname, "/public"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const validateRecipe = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get(
  "/recipes",
  catchAsync(async (req, res) => {
    const recipes = await Recipe.find({});
    res.render("recipes/index", { recipes });
  })
);

app.get("/recipes/new", (req, res) => {
  res.render("recipes/new");
});

app.post(
  "/recipes",
  validateRecipe,
  catchAsync(async (req, res, next) => {
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  })
);

app.get(
  "/recipes/:id",
  catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate("comments");
    res.render("recipes/show", { recipe });
  })
);

app.get(
  "/recipes/:id/edit",
  catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render("recipes/edit", { recipe });
  })
);

app.put(
  "/recipes/:id",
  validateRecipe,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    res.redirect(`/recipes/${recipe._id}`);
  })
);

app.delete(
  "/recipes/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    res.redirect("/recipes");
  })
);

app.post(
  "/recipes/:id/comments",
  validateComment,
  catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    recipe.comments.push(comment);
    await comment.save();
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  })
);

app.delete(
  "/recipes/:id/comments/:commentId",
  catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/recipes/${id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "oh no! something went wrong!!!";
  res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
