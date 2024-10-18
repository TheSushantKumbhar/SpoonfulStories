const express = require("express");
const app = express();
const path = require("path");
const port = 8008;

app.use(express.static("public"));
app.set("public", path.join(__dirname, "/public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
