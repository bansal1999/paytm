const mongoose = require("mongoose");

//Create a schema for USERS
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

//create a model from userschema
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
