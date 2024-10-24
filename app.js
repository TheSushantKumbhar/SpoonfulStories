const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find({});
  res.render("recipes/index", { recipes });
});

app.get("/recipes/new", (req, res) => {
  res.render("recipes/new");
});

app.post("/recipes", async (req, res) => {
  const recipe = new Recipe(req.body.recipe);
  await recipe.save();
  res.redirect(`/recipes`);
});

app.get("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("recipes/show", { recipe });
});

app.get("/recipes/:id/edit", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("recipes/edit", { recipe });
});

app.put("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
  res.redirect(`/recipes/${recipe._id}`);
});

app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndDelete(id);
  res.redirect("/recipes");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
