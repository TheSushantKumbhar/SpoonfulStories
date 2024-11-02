const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchmea = new Schema({
  fullName: {
    type: String,
    required: [true, "name cannot be blank"],
  },
  email: {
    type: String,
    required: [true, "email cannot be blank"],
    unique: true,
  },
});

// this will add on username, password fields to our schema
UserSchmea.plugin(passportLocalMongoose); // it will also make sure usernames are unique
// also gonna give us extra methods to use

module.exports = mongoose.model("User", UserSchmea);
