if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/User");
const mongoSanitize = require("express-mongo-sanitize");
const catchAsync = require("./utils/catchAsync");
const helmet = require("helmet");

const port = 8008;

const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const commentRoutes = require("./routes/comments");
const recipeController = require("./controllers/recipes");

const MongoDBStore = require("connect-mongo");

const dbUrl = process.env.DB_URL;
const localDbUrl = "mongodb://127.0.0.1:27017/SpoonfulStories";
//"mongodb://127.0.0.1:27017/SpoonfulStories"
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

const app = express();
app.set("public", path.join(__dirname, "/public"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());

const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: "thisshouldbeabettersecret",
  },
});

store.on("error", function (e) {
  console.log("session store error", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
// MAKE SURE "app.use(session(config))" is there BEFORE using passport.session()
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); // use localstrategy to authenticate USER model

passport.serializeUser(User.serializeUser()); // how do we store user into the session
passport.deserializeUser(User.deserializeUser()); // how do we get user out of the session

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);

app.get("/", catchAsync(recipeController.findTopRecipes));

app.get("/temp", (req, res) => {
  res.render("temp/showRecipe.ejs");
});

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
