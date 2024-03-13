const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:Qwerty321@backend.6tevvp6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Backend"
  )
  .then(() => {
    console.log("Connected!");
  })
  .catch((e) => {
    console.log("Failed to Connect" + e);
  });

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requireds: [true, "Please enter user First Name"],
    },

    lastName: {
      type: String,
      requires: [true, "Please enter user First Name"],
    },

    phone: {
      type: Number,
      unique: [true, "User already exists"],
      requires: [true, "Please enter user Phone Number"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
