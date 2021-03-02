const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
    validate: (value) => {
      const regexp = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
      return regexp.test(value);
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: (value) => validator.isEmail(value),
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// Method to delete session token (logout, de-authing)
userSchema.methods.deleteToken = function (token, callback) {
  // declaring this as instance for user
  const user = this;

  // unset token for user
  user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return callback(err);
    // return callback
    callback("Token successfully deleted");
  });
};

module.exports = mongoose.model("User", userSchema);
