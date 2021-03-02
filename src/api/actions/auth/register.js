const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 16;

// User model
const User = require("./../../models/user");

// require config
require("dotenv").config();

module.exports = async function ({ body }, res) {
  // define new user from request body
  const { password, confirm, email, username } = body;

  // verify if passwords are not equal
  if (password !== confirm) {
    // send json with error message and code 400
    return res.status(400).json({
      status: 400,
      message: "Passwords don't match, please retry.",
    });
  }

  // Create instance for user
  const user = User({
    password: bcrypt.hashSync(password, salt),
    email,
    username,
  });

  try {
    const registerUser = await user.save();
    const token = jwt.sign(
      {
        email,
        id: registerUser,
        username,
      },
      process.env.API_KEY,
      { expiresIn: process.env.TOKEN_EXPIRES || "15d" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};
