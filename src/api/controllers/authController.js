const login = require("./../actions/auth/login");
const register = require("./../actions/auth/register");
const logout = require("../actions/auth/logout");

exports.register = register;

exports.login = login;

exports.logout = logout;

exports.getUser = function (req, res) {
  res.status(200).json({
    isAuth: true,
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
};
