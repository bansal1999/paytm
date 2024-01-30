const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shikharbansal1999:shikhar1999@cluster0.2vwcfqm.mongodb.net/"
);

//Create a schema for USERS
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

// create a account schema
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

//create a model from userschema
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
