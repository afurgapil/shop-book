const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  notes: String,
  store: String,
  isBought: {
    type: Boolean,
    default: false,
  },
  lastBuy: {
    type: Date,
  },
});
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ingredients: [ingredientSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
