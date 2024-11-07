const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const recipes = require("./recipes");

mongoose.connect("mongodb://127.0.0.1:27017/SpoonfulStories");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

const seedDB = async () => {
  await Recipe.deleteMany({});
  for (let recipe of recipes) {
    recipe.author = "67271aefc3f5d2b42e9383c7";
  }
  await Recipe.insertMany(recipes);
  console.log("10 recipes inserted...");
};

seedDB().then(() => {
  mongoose.connection.close();
});
