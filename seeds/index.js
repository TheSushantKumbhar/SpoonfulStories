// const mongoose = require("mongoose");
// const Recipe = require("../models/Recipe");
// const recipes = require("./recipes");

// mongoose.connect("mongodb://127.0.0.1:27017/SpoonfulStories");

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", () => {
//   console.log("database connected");
// });

// const seedDB = async () => {
//   await Recipe.deleteMany({});
//   for (let recipe of recipes) {
//     recipe.author = "67271aefc3f5d2b42e9383c7";
//     recipe.images = [
//       {
//         url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525477/SpoonfulStories/otmnnhkifaukcwfmly84.jpg",
//         filename: "SpoonfulStories/otmnnhkifaukcwfmly84",
//       },
//       {
//         url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525482/SpoonfulStories/bjpsqbepn08jdlvxj6yg.jpg",
//         filename: "SpoonfulStories/bjpsqbepn08jdlvxj6yg",
//       },
//       {
//         url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525482/SpoonfulStories/aoopbnekc5mqif9s9a6n.jpg",
//         filename: "SpoonfulStories/aoopbnekc5mqif9s9a6n",
//       },
//       {
//         url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525484/SpoonfulStories/ogh1wq6o3ubhgvmpvtwu.jpg",
//         filename: "SpoonfulStories/ogh1wq6o3ubhgvmpvtwu",
//       },
//       {
//         url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525485/SpoonfulStories/cvbmn4wdzqaeidotsson.jpg",
//         filename: "SpoonfulStories/cvbmn4wdzqaeidotsson",
//         url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525485/SpoonfulStories/cvbmn4wdzqaeidotsson.jpg",
//         url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525485/SpoonfulStories/cvbmn4wdzqaeidotsson.jpg",
//         filename: "SpoonfulStories/cvbmn4wdzqaeidotsson",
//       },
//     ];
//   }
//   await Recipe.insertMany(recipes);
//   console.log("10 recipes inserted...");
// };

// seedDB().then(() => {
//   mongoose.connection.close();
// });



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
    recipe.author = "672779116d8c91d956029c3b";
    recipe.images = [
      {
        url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525477/SpoonfulStories/otmnnhkifaukcwfmly84.jpg",
        filename: "SpoonfulStories/otmnnhkifaukcwfmly84",
      },
      {
        url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525482/SpoonfulStories/bjpsqbepn08jdlvxj6yg.jpg",
        filename: "SpoonfulStories/bjpsqbepn08jdlvxj6yg",
      },
      {
        url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525482/SpoonfulStories/aoopbnekc5mqif9s9a6n.jpg",
        filename: "SpoonfulStories/aoopbnekc5mqif9s9a6n",
      },
      {
        url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525484/SpoonfulStories/ogh1wq6o3ubhgvmpvtwu.jpg",
        filename: "SpoonfulStories/ogh1wq6o3ubhgvmpvtwu",
      },
      {
        url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525485/SpoonfulStories/cvbmn4wdzqaeidotsson.jpg",
        filename: "SpoonfulStories/cvbmn4wdzqaeidotsson",
        url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525485/SpoonfulStories/cvbmn4wdzqaeidotsson.jpg",
        url: "https://res.cloudinary.com/drofmckjj/image/upload/v1731525485/SpoonfulStories/cvbmn4wdzqaeidotsson.jpg",
        filename: "SpoonfulStories/cvbmn4wdzqaeidotsson",
      },
    ];
  }
  await Recipe.insertMany(recipes);
  console.log("10 recipes inserted...");
};

seedDB().then(() => {
  mongoose.connection.close();
});
