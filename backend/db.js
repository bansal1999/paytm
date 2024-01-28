const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shikharbansal1999:shikhar1999@cluster0.2vwcfqm.mongodb.net/");

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
