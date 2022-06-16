// User model
const User = require("./../../models/user");

const user = new User();

module.exports = function ({ body }, res) {
  user.deleteToken(body.token, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    res.status(200).send("[+] User has been logged out");
  });
};
