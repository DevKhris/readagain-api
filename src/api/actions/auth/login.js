const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User model
const User = require("./../../models/user");

// require config
require("dotenv").config();

module.exports = async function ({ body }, res) {
  // get token from cookies in request
  const { username, password } = body;

  try {
    const userResult = await User.findOne({ username });
    if (userResult) {
      if (bcrypt.compareSync(password, userResult.password)) {
        const token = jwt.sign(
          { email: userResult.email, id: userResult._id, username },
          process.env.API_KEY,
          {
            expiresIn: process.env.TOKEN_EXPIRE || "15d",
          }
        );
        return res.status(200).json({ token });
      }
      return res.status(401).json({
        status: 401,
        message: "Wrong username or password, please retry",
      });
    }
  } catch (error) {
    // Log error to console
    console.error(error);
    res.status(400).json({
      error: 400,
      message: error,
    });
  }
};
