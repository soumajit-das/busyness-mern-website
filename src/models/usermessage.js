// Packages ----------------------------
const mongoose = require("mongoose");
const validator = require("validator");
// -------------------------------------

// Creating the Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email id!");
      }
    },
  },

  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10,
  },

  message: {
    type: String,
    minLength: 2,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating a collection
const User = mongoose.model("User", userSchema);

module.exports = User;
