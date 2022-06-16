const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const catalogController = require("../controllers/catalogController");

router.get("/catalog", auth, catalogController.index);

module.exports = router;
