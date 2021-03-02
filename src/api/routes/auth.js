const express = require("express");
const router = express.Router();

const { auth } = require("./../middlewares/auth");

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/:user", auth, authController.getUser);

module.exports = router;
